import { PropsWithChildren, createContext, useContext, useState } from 'react';

import { userService } from '../services/UserService';
import { sessionService } from '../services/SessionService';

import { SignUpFormData } from '../screens/SignUp';

interface AppContextType {
  user?: {
    id: string;
  };
  signUp(data: SignUpFormData): Promise<void>;
}

const AppContext = createContext({} as AppContextType);

export function AppContextProvider({ children }: PropsWithChildren) {
  const [state] = useState<AppContextType>({
    user: undefined,
    signUp,
  });

  async function signUp(data: SignUpFormData) {
    await userService.create(data);

    const session = await sessionService.create({
      email: data.email,
      password: data.password,
    });

    console.log(JSON.stringify(session, null, 2));
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
