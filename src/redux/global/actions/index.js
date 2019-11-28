import { makeActionCreator } from "../../../utils/helpers/redux";

export const SET_USER = "global/SET_USER";
export const SET_VERIFY_AUTH_LISTENER = "global/SET_VERIFY_AUTH_LISTENER";
export const CLEAR_STATE = "global/CLEAR_STATE";

export const setUser = makeActionCreator(SET_USER, "request");
export const setVerifyAuthListener = makeActionCreator(
  SET_VERIFY_AUTH_LISTENER,
  "request"
);
export const clearState = makeActionCreator(CLEAR_STATE, "response");

export const ActionsTypes = {
  SET_USER,
  SET_VERIFY_AUTH_LISTENER
};

export const Actions = {
  setUser,
  setVerifyAuthListener
};
