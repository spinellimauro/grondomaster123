import { put, takeLatest, all, call } from "redux-saga/effects";
import { ActionsTypes, Actions } from "../actions";
import { insertPlayer } from "../../../services/homeService";
import { userSignOut } from "../../../services/loginService";

function* fetchSearchPlayers(action) {
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

function* fetchUserSignOut(action) {
  try {
    yield call(userSignOut);
    yield put(Actions.signOutSuccess());
  } catch (e) {
    console.log(e);
    alert("Hubo un error en el sistema. Intente más tarde.");
  }
  yield put(Actions.clearState());
}

function* actionWatcher() {
  yield takeLatest(ActionsTypes.SAVE_PLAYER, fetchSavePlayer);
  yield takeLatest(ActionsTypes.BUSCADOR_SOFIFA, fetchSearchPlayers);
  yield takeLatest(ActionsTypes.USER_SIGN_OUT_REQUEST, fetchUserSignOut);
}

export default function* homeSaga() {
  yield all([actionWatcher()]);
}
