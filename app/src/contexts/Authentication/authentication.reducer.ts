import { AuthenticationContextModel } from './AuthenticationContext.model';
import { Action, ActionTypes } from './authentication.actions';

export const initialState = {} as AuthenticationContextModel;

export function reducer(state: AuthenticationContextModel, action: Action): AuthenticationContextModel {
  switch (action.type) {
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
