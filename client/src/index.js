import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Context from "./context/Context";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <Router>
    <Context>
      <App />
    </Context>
  </Router>,
  document.getElementById("root")
);
