import React from "react";
import App from "./components/App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { render } from "react-dom";

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
