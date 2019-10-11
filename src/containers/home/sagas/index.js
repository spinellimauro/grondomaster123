import { put, takeLatest, all } from "redux-saga/effects";
import { ActionsTypes, Actions } from "../actions";

function* fetchRandomName(action) {
  const json = yield fetch("http://sofifa-api.herokuapp.com/api/v1/players/?name=" + action.request.nombreJugador).then(response =>
    response.json()
  );

  console.log(json.results);

  yield put(
    Actions.buscadorSofifaResultados({
      json: json
    })
  );
}

function* actionWatcher() {
  yield takeLatest(ActionsTypes.GET_RANDOM_NAME, fetchRandomName);
  yield takeLatest(ActionsTypes.BUSCADOR_SOFIFA, fetchRandomName);
}


export default function* homeSaga() {
  yield all([actionWatcher()]);
}