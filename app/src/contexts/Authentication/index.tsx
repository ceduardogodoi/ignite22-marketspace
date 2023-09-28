import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { sessionService } from '../../services/SessionService';
import * as authenticationStorage from '../../storage/authentication';
import * as userStorage from '../../storage/user';

import { SignInDTO } from '../../dtos/SignIn';
import { AuthenticationContextModel, Session } from './AuthenticationContext.model';

import { createSession, endloadingSession, logout, startloadingSession } from './authentication.actions';
import { initialState, reducer } from './authentication.reducer';

export const AuthenticationContext = createContext(initialState);

export function AuthenticationContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function loadSession() {
    dispatch(startloadingSession());

    const storageTokens = await authenticationStorage.getAuthenticationTokens();
    const storageUser = await userStorage.getUser();
    if (storageTokens && storageUser) {
      const session: Session = {
        token: storageTokens.token,
        user: storageUser,
        refresh_token: storageTokens.refresh_token,
      };
      dispatch(createSession(session));
    }

    dispatch(endloadingSession());
  }

  useEffect(() => {
    loadSession();
  }, []);

  const signIn = useCallback(async (payload: SignInDTO) => {
    const session = await sessionService.create(payload);

    dispatch(createSession(session));

    await authenticationStorage.saveAuthenticationTokens({
      token: session.token,
      refresh_token: session.refresh_token,
    });

    await userStorage.saveUser(session.user);
  }, []);

  const signOut = useCallback(async () => {
    dispatch(logout());

    await authenticationStorage.clearAuthentication();
  }, []);

  const context = useMemo(() => {
    return {
      session: state.session,
      isLoading: state.isLoading,
      signIn,
      signOut,
    } satisfies AuthenticationContextModel;
  }, [state, signIn, signOut]);

  return (
    <AuthenticationContext.Provider value={context}>
      {children}
    </AuthenticationContext.Provider>
  );
}
