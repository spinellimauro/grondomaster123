import { put, takeLatest, all, call } from "redux-saga/effects";
import { ActionsTypes, Actions } from "../actions";
import { login } from "../../../services/loginService";

function* fetchUserLogin(action) {
  try {
    const { email, password } = action.request;

    const response = yield call(login, email, password);
    yield put(Actions.userLoginResponse());
  } catch (e) {
    let errorMessage = "";

    switch (e.code) {
      case "auth/user-not-found":
        errorMessage =
          "La dirección de email que ha ingresado no se encuentra registrada.";
        break;
      case "auth/invalid-email":
        errorMessage = "La dirección de email que ha ingresado es inválida.";
        break;
      case "auth/wrong-password":
        errorMessage = "La contraseña que ha ingresado es incorrecta.";
        break;
      case "auth/network-request-failed":
        errorMessage = "Active internet para poder loguearse.";
        break;
      default:
        errorMessage = "Ha ocurrido un error en el sistema, intente más tarde.";
        break;
    }
    alert(errorMessage);
    console.log(e);
  }
  yield put(Actions.clearState());
}

function* actionWatcher() {
  yield takeLatest(ActionsTypes.USER_LOGIN_REQUEST, fetchUserLogin);
}

export default function* loginSaga() {
  yield all([actionWatcher()]);
}
