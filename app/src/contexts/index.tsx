import { PropsWithChildren, createContext, useContext, useState } from 'react';

import { userService } from '../services/UserService';
import { Session, sessionService } from '../services/SessionService';

import { SignUpFormData } from '../screens/SignUp';

interface AppContextType {
  session?: Session | null;
  signUp(data: SignUpFormData): Promise<void>;
}

const AppContext = createContext({} as AppContextType);

export function AppContextProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AppContextType>({
    session: null,
    signUp,
  });

  async function signUp(data: SignUpFormData) {
    await userService.create(data);

    const newSession = await sessionService.create({
      email: data.email,
      password: data.password,
    });

    setState(state => {
      return {
        ...state,
        session: newSession,
      };
    })
  }

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}
