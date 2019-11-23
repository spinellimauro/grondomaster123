import { put, takeLatest, all, call } from "redux-saga/effects";
import { ActionsTypes, Actions } from "../actions";
import { insertPlayer } from "../../../services/homeService";

function* fetchRandomName(action) {
  const json = yield fetch(
    "http://sofifa-api.herokuapp.com/api/v1/players/?name=" +
      action.request.nombreJugador
  ).then(response => response.json());

  console.log(json.results);

  yield put(
    Actions.buscadorSofifaResultados({
      json: json
    })
  );
}

function* fetchSavePlayer(action) {
  try {
    const response = yield call(insertPlayer, action.request);
    if (response.error !== undefined) {
      console.log(response.error);
      alert("Error salvando al jugador.");
    } else {
      alert("Jugador guardado exitosamente");
    }
  } catch (e) {
    console.log(e);
  }
}

function* actionWatcher() {
  yield takeLatest(ActionsTypes.SAVE_PLAYER, fetchSavePlayer);
  yield takeLatest(ActionsTypes.GET_RANDOM_NAME, fetchRandomName);
  yield takeLatest(ActionsTypes.BUSCADOR_SOFIFA, fetchRandomName);
}

export default function* homeSaga() {
  yield all([actionWatcher()]);
}
