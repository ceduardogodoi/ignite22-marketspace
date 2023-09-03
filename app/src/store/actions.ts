import { Session } from '../services/SessionService';

// Action Types
export enum ActionTypes {
  CREATE_SESSION = 'session/create',
  LOGOUT_SESSION = 'session/logOut',
  LOAD_SESSION = 'session/load',
  START_SESSION_LOADING = 'session/startSessionLoading',
  END_SESSION_LOADING = 'session/endSessionLoading',
  CREATE_PRODUCT = 'product/create',
}

export type Action =
  | {
    type: ActionTypes.CREATE_SESSION,
    payload: Session,
  }
  | {
    type: ActionTypes.LOAD_SESSION,
    payload: Session,
  }
  | {
    type: ActionTypes.LOGOUT_SESSION,
  }
  | {
    type: ActionTypes.START_SESSION_LOADING,
  }
  | {
    type: ActionTypes.END_SESSION_LOADING,
  }
  | {
    type: ActionTypes.CREATE_PRODUCT,
  }

// Action Creators
export function createSessionAction(session: Session): Action {
  return {
    type: ActionTypes.CREATE_SESSION,
    payload: session,
  };
}

export function loadSessionAction(session: Session): Action {
  return {
    type: ActionTypes.LOAD_SESSION,
    payload: session,
  };
}

export function signOutAction(): Action {
  return {
    type: ActionTypes.LOGOUT_SESSION,
  };
}

export function startSessionLoadingAction(): Action {
  return {
    type: ActionTypes.START_SESSION_LOADING,
  };
}

export function endSessionLoadingAction(): Action {
  return {
    type: ActionTypes.END_SESSION_LOADING,
  };
}
