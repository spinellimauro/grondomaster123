import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === "development"
});

const middlewares = [thunk, sagaMiddleware, loggerMiddleware];

const appReducer = combineReducers({
  ...reducers
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

export { store };
