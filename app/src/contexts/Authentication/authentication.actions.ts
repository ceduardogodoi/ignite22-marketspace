import { Session } from './AuthenticationContext.model';

// Action Types
export enum ActionTypes {
  CREATE_SESSION = 'session/create',
  LOGOUT_SESSION = 'session/logout',
  START_LOADING_SESSION = 'session/start_loading',
  END_LOADING_SESSION = 'session/end_loading',
}

// Actions
export type Action =
  | { type: ActionTypes.CREATE_SESSION, payload: Session }
  | { type: ActionTypes.LOGOUT_SESSION }
  | { type: ActionTypes.START_LOADING_SESSION }
  | { type: ActionTypes.END_LOADING_SESSION };

// Action Creators
export function startloadingSession(): Action {
  return {
    type: ActionTypes.START_LOADING_SESSION,
  }
}

export function endloadingSession(): Action {
  return {
    type: ActionTypes.END_LOADING_SESSION,
  }
}

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
