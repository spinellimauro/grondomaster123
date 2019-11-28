import { ActionsTypes } from "../actions";

const initialState = {
  user: {},
  auth_listener: null
};

export default function globalReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.SET_USER:
      return {
        ...state,
        user: action.request
      };
    case ActionsTypes.SET_VERIFY_AUTH_LISTENER:
      return {
        ...state,
        auth_listener: action.request
      };
    case ActionsTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
