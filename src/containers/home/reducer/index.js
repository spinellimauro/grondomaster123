import { ActionsTypes } from "../actions";

const initialState = {
  loading: false,
  randomName: null,
  dT: "Mauro",
  dinero: 20000,
  cantidadDeJugadores: 30,
  jugadores : []
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.GET_RANDOM_NAME:
      return { ...state, loading: true };
    case ActionsTypes.RANDOM_NAME_RECEIVED:
      return { ...state, randomName: action.response.json, loading: false };
    case ActionsTypes.BUSCADOR_SOFIFA_RESULTADOS:
      return { ...state, jugadores: action.response.json.results, loading: false };
         
      default:
      return state;
  }
};

export default homeReducer;
