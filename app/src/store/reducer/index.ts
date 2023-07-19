import { StoreData } from '..';

import { Session } from '../../services/SessionService';

// Action Types
enum ActionTypes {
  CREATE_SESSION = 'session/create',
  LOGOUT_SESSION = 'session/logOut',
  LOAD_SESSION = 'session/load',
}

type Action =
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

// Reducer
export function reducer(state: StoreData, action: Action): StoreData {
  switch (action.type) {
    case ActionTypes.CREATE_SESSION: {
      const session = action.payload;

      return {
        ...state,
        session,
      };
    }

    case ActionTypes.LOAD_SESSION: {
      const session = action.payload;

      return {
        ...state,
        session,
      }
    }

    case ActionTypes.LOGOUT_SESSION: {
      return {};
    }

    default: {
      return state;
    }
  }
}
