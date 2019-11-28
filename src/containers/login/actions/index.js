import { makeActionCreator } from "../../../utils/helpers/redux";

export const USER_LOGIN_REQUEST = "login/USER_LOGIN_REQUEST";
export const USER_LOGIN_RESPONSE = "login/USER_LOGIN_RESPONSE";
export const CLEAR_STATE = "login/CLEAR_STATE";

export const userLoginRequest = makeActionCreator(
  USER_LOGIN_REQUEST,
  "request"
);
export const userLoginResponse = makeActionCreator(
  USER_LOGIN_RESPONSE,
  "request"
);
export const clearState = makeActionCreator(CLEAR_STATE, "request");

export const ActionsTypes = {
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESPONSE,
  CLEAR_STATE
};

export const Actions = {
  userLoginRequest,
  userLoginResponse,
  clearState
};
