import { all } from "redux-saga/effects";
import loginSaga from "../containers/login/sagas";
import homeSaga from "../containers/home/sagas";

export default function* rootSaga(getState) {
  yield all([loginSaga(), homeSaga()]);
}
