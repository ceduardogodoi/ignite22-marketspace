import { StoreData } from '..';

import { Session } from '../../services/SessionService';

// Action Types
enum ActionTypes {
  CREATE_SESSION = 'session/create',
  LOGOUT_SESSION = 'session/logOut',
  LOAD_SESSION = 'session/load',
  START_SESSION_LOADING = 'session/startSessionLoading',
  END_SESSION_LOADING = 'session/endSessionLoading',
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
  | {
    type: ActionTypes.START_SESSION_LOADING,
  }
  | {
    type: ActionTypes.END_SESSION_LOADING,
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

export function startSessionLoading(): Action {
  return {
    type: ActionTypes.START_SESSION_LOADING,
  };
}

export function endSessionLoading(): Action {
  return {
    type: ActionTypes.END_SESSION_LOADING,
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

    case ActionTypes.START_SESSION_LOADING: {
      return {
        ...state,
        isSessionLoading: true,
      }
    }

    case ActionTypes.END_SESSION_LOADING: {
      return {
        ...state,
        isSessionLoading: false,
      }
    }

    default: {
      return state;
    }
  }
}
