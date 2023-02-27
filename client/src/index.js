import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "font-awesome/css/font-awesome.min.css";
import AppWrapper from "./AppWrapper";
import { AuthContextProvider } from "./context/AuthContext";
import App from "./App";

ReactDOM.render(
  <AppWrapper>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </AppWrapper>,
  document.getElementById("root")
);
