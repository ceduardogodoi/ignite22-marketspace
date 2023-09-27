import { AuthenticationModel } from './Authentication.model';
import { Action, ActionTypes } from './authentication.actions';

export const initialState = {} as AuthenticationModel;

export function reducer(state: AuthenticationModel, action: Action): AuthenticationModel {
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
