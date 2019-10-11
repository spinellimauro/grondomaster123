import { makeActionCreator } from "../../../utils/helpers/redux";

export const GET_RANDOM_NAME = "home/GET_RANDOM_NAME";
export const RANDOM_NAME_RECEIVED = "home/RANDOM_NAME_RECEIVED";
export const BUSCADOR_SOFIFA = "home/BUSCADOR_SOFIFA";
export const BUSCADOR_SOFIFA_RESULTADOS = "home/BUSCADOR_SOFIFA_RESULTADOS";

export const getRandomName = makeActionCreator(GET_RANDOM_NAME, "request");
export const buscadorSofifa = makeActionCreator(BUSCADOR_SOFIFA, "request");
export const randomNameReceived = makeActionCreator(
  RANDOM_NAME_RECEIVED,
  "response"
);
export const buscadorSofifaResultados = makeActionCreator(
  BUSCADOR_SOFIFA_RESULTADOS,
  "response"
);

export const ActionsTypes = {
  GET_RANDOM_NAME,
  RANDOM_NAME_RECEIVED,
  BUSCADOR_SOFIFA,
  BUSCADOR_SOFIFA_RESULTADOS
};

export const Actions = {
  getRandomName,
  randomNameReceived,
  buscadorSofifa,
  buscadorSofifaResultados
};
