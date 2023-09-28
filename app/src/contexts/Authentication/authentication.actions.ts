import { Session } from './AuthenticationContext.model';

// Action Types
export enum ActionTypes {
  CREATE_SESSION = 'session/create',
  LOGOUT_SESSION = 'session/logout',
}

// Actions
export type Action =
  | { type: ActionTypes.CREATE_SESSION, payload: Session }
  | { type: ActionTypes.LOGOUT_SESSION };

// Action Creators
export function createSession(payload: Session): Action {
  return {
    type: ActionTypes.CREATE_SESSION,
    payload,
  }
}

export function logout(): Action {
  return {
    type: ActionTypes.LOGOUT_SESSION,
  }
}
