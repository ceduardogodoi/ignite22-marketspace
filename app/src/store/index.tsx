import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { userService } from '../services/UserService';
import { Session, sessionService } from '../services/SessionService';

import { createSession, reducer } from './reducer';

import { SignUpFormData } from '../screens/SignUp';

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

  async function signUp(data: SignUpFormData) {
    await userService.create(data);

    const session = await sessionService.create({
      email: data.email,
      password: data.password,
    });

    dispatch(createSession(session));
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
