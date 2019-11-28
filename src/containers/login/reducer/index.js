import { ActionsTypes } from "../actions";

const initialState = {
  loading: false,
  loginSuccess: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case ActionsTypes.USER_LOGIN_RESPONSE:
      return { ...state, loading: false, loginSuccess: true };
    case ActionsTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
