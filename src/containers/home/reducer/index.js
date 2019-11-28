import { ActionsTypes } from "../actions";

const initialState = {
  loading: false,
  jugadores: [],
  signOutSuccess: false
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.BUSCADOR_SOFIFA_RESULTADOS:
      return {
        ...state,
        jugadores: action.response.json.results,
        loading: false
      };
    case ActionsTypes.BUSCADOR_SOFIFA:
      return {
        ...state,
        loading: true
      };
    case ActionsTypes.USER_SIGN_OUT_SUCCESS:
      return {
        ...state,
        signOutSuccess: true
      };
    case ActionsTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};

export default homeReducer;
