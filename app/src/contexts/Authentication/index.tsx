import { PropsWithChildren, createContext, useCallback, useMemo, useReducer } from 'react';

import { sessionService } from '../../services/SessionService';

import { SignInDTO } from '../../dtos/SignIn';
import { AuthenticationModel } from './Authentication.model';

import { createSession } from './authentication.actions';
import { initialState, reducer } from './authentication.reducer';

export const AuthenticationContext = createContext({} as AuthenticationModel);

export function AuthenticationContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const signIn = useCallback(async (payload: SignInDTO) => {
    const session = await sessionService.create(payload);

    dispatch(createSession(session));
  }, []);

  const context = useMemo(() => {
    return {
      session: state.session,
      signIn,
    };
  }, [signIn, state]);

  return (
    <AuthenticationContext.Provider value={context}>
      {children}
    </AuthenticationContext.Provider>
  );
}
