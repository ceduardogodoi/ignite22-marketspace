import { StoreData } from '..';

import { Session } from '../../services/SessionService';

// Action Types
enum ActionTypes {
  CREATE_SESSION = 'session/create',
  LOGOUT_SESSION = 'session/logOut',
}

type Action =
  | {
    type: ActionTypes.CREATE_SESSION,
    payload: Session,
  }
  | {
    type: ActionTypes.LOGOUT_SESSION,
  }

// Action Creators
export function createSession(session: Session): Action {
  return {
    type: ActionTypes.CREATE_SESSION,
    payload: session,
  }
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

    case ActionTypes.LOGOUT_SESSION: {
      return state;
    }

    default: {
      return state;
    }
  }
}
