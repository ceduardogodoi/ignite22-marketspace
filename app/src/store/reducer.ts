import { StoreData } from './';

import { Action, ActionTypes } from './actions';

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
