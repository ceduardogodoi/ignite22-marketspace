import { AuthenticationContextModel } from './AuthenticationContext.model';
import { Action, ActionTypes } from './authentication.actions';

export const initialState = {
  session: null,
  isLoading: false,
} as AuthenticationContextModel;

export function reducer(state: AuthenticationContextModel, action: Action): AuthenticationContextModel {
  switch (action.type) {
    case ActionTypes.START_LOADING_SESSION:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.END_LOADING_SESSION:
      return {
        ...state,
        isLoading: false,
      };

    case ActionTypes.CREATE_SESSION: {
      const session = action.payload;

      return {
        ...state,
        session,
      };
    };

    case ActionTypes.LOGOUT_SESSION:
      return initialState;

    default:
      return state;
  }
}
