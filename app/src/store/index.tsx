import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { useToast } from 'native-base';

import { userService } from '../services/UserService';
import { Session, sessionService } from '../services/SessionService';

import { createSession, reducer } from './reducer';

import { SignUpFormData } from '../screens/SignUp';

import { AppError } from '../utils/AppError';

export type StoreData = {
  session?: Session | null;
}

type StoreFunctions = {
  signUp(data: SignUpFormData): Promise<void>;
}

type Store = StoreData & StoreFunctions;

const initialState: StoreData = {};
const AppStoreContext = createContext({} as Store);

export function AppContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toast = useToast();

  async function signUp(data: SignUpFormData) {
    try {
      await userService.create(data);
  
      const session = await sessionService.create({
        email: data.email,
        password: data.password,
      });

      toast.show({
        title: 'Usuário criado com sucesso',
        placement: 'top',
        backgroundColor: 'green.500',
      })
  
      dispatch(createSession(session));
    } catch (error) {
      let title = 'Não foi possível criar a conta. Tente novamente mais tarde.';

      if (error instanceof AppError) {
        title = error.message;
      }

      toast.show({
        title,
        placement: 'top',
        backgroundColor: 'custom.red-light',
      });
    }
  }

  const store = useMemo<Store>(() => {
    return {
      session: state.session,
      signUp,
    };
  }, [state.session]);

  return (
    <AppStoreContext.Provider value={store}>
      {children}
    </AppStoreContext.Provider>
  )
}

export function useStore() {
  return useContext(AppStoreContext);
}
