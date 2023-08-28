import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { useToast } from 'native-base';

import { userService } from '../services/UserService';
import { Session, sessionService } from '../services/SessionService';
import { productService } from '../services/ProductService';

import { reducer } from './reducer';
import {
  createSessionAction,
  endSessionLoading,
  loadSessionAction,
  signOutAction,
  startSessionLoading,
} from './actions';

import * as storage from '../storage'

import { SignInFormData } from '../screens/SignIn';
import { SignUpFormData } from '../screens/SignUp';
import { CreateAdvertisementFormData } from '../screens/CreateAdvertisement';

import { http } from '../libs/axios';
import { AppError } from '../utils/AppError';
import { TOAST_DURATION } from '../utils/toastConfigs';

export type StoreData = {
  session?: Session | null;
  isSessionLoading?: boolean;
}

type StoreFunctions = {
  signIn(data: SignInFormData): Promise<void>;
  signUp(data: SignUpFormData): Promise<void>;
  signOut(): Promise<void>;
  createAdvertisement(data: CreateAdvertisementFormData): Promise<void>;
}

type Store = StoreData & StoreFunctions;

const initialState: StoreData = {
  isSessionLoading: false,
};
const AppStoreContext = createContext({} as Store);

export function AppContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toast = useToast();

  async function signIn(data: SignInFormData) {
    try {
      const session = await sessionService.create({
        email: data.email,
        password: data.password,
      });

      dispatch(createSessionAction(session));

      await storage.saveAuthTokens({
        token: session.token,
        refresh_token: session['refresh_token']
      });

      await storage.saveUser(session.user);

      http.defaults.headers.common.Authorization = `Bearer ${session.token}`;

      toast.show({
        title: 'Usuário logado com sucesso',
        placement: 'top',
        backgroundColor: 'green.500',
        duration: TOAST_DURATION,
      });
    } catch (error) {
      let title = 'Não foi possível logar. Tente novamente mais tarde.';

      if (error instanceof AppError) {
        title = error.message;
      }

      toast.show({
        title,
        placement: 'top',
        backgroundColor: 'custom.red-light',
        duration: TOAST_DURATION,
      });
    }
  }

  async function signUp(data: SignUpFormData) {
    try {
      await userService.create(data);

      await signIn({
        email: data.email,
        password: data.password,
      });

      toast.show({
        title: 'Usuário criado com sucesso',
        placement: 'top',
        backgroundColor: 'green.500',
        duration: TOAST_DURATION,
      });
    } catch (error) {
      let title = 'Não foi possível criar a conta. Tente novamente mais tarde.';

      if (error instanceof AppError) {
        title = error.message;
      }

      toast.show({
        title,
        placement: 'top',
        backgroundColor: 'custom.red-light',
        duration: TOAST_DURATION,
      });
    }
  }

  async function loadSignedInUser() {
    dispatch(startSessionLoading());

    const authTokens = await storage.getAuthTokens();
    const user = await storage.getUser();

    if (authTokens && user) {
      const { token, refresh_token } = authTokens;

      dispatch(loadSessionAction({
        token,
        user,
        refresh_token,
      }));
    }

    dispatch(endSessionLoading());
  }

  async function signOut() {
    dispatch(signOutAction());

    await storage.signOut();
  }

  async function createAdvertisement(data: CreateAdvertisementFormData) {
    await productService.create(data);
  }

  const store = useMemo<Store>(() => {
    return {
      session: state.session,
      isSessionLoading: state.isSessionLoading,
      signIn,
      signUp,
      signOut,
      createAdvertisement,
    };
  }, [state.session, state.isSessionLoading]);

  useEffect(() => {
    loadSignedInUser();
  }, []);

  return (
    <AppStoreContext.Provider value={store}>
      {children}
    </AppStoreContext.Provider>
  )
}

export function useStore() {
  return useContext(AppStoreContext);
}
