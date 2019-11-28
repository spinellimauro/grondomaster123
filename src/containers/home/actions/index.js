import { makeActionCreator } from "../../../utils/helpers/redux";

export const BUSCADOR_SOFIFA = "home/BUSCADOR_SOFIFA";
export const SAVE_PLAYER = "home/SAVE_PLAYER";
export const BUSCADOR_SOFIFA_RESULTADOS = "home/BUSCADOR_SOFIFA_RESULTADOS";
export const USER_SIGN_OUT_REQUEST = "home/USER_SIGN_OUT_REQUEST";
export const USER_SIGN_OUT_SUCCESS = "home/USER_SIGN_OUT_SUCCESS";
export const CLEAR_STATE = "login/CLEAR_STATE";

export const signOutRequest = makeActionCreator(
  USER_SIGN_OUT_REQUEST,
  "request"
);
export const signOutSuccess = makeActionCreator(
  USER_SIGN_OUT_SUCCESS,
  "response"
);
export const savePlayer = makeActionCreator(SAVE_PLAYER, "request");
export const buscadorSofifa = makeActionCreator(BUSCADOR_SOFIFA, "request");
export const buscadorSofifaResultados = makeActionCreator(
  BUSCADOR_SOFIFA_RESULTADOS,
  "response"
);
export const clearState = makeActionCreator(CLEAR_STATE, "request");

export const ActionsTypes = {
  BUSCADOR_SOFIFA,
  BUSCADOR_SOFIFA_RESULTADOS,
  SAVE_PLAYER,
  USER_SIGN_OUT_REQUEST,
  USER_SIGN_OUT_SUCCESS,
  CLEAR_STATE
};

export const Actions = {
  savePlayer,
  buscadorSofifa,
  buscadorSofifaResultados,
  signOutRequest,
  signOutSuccess,
  clearState
};
