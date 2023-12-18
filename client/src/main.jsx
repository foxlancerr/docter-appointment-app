import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import GlobalContextProvider from "./context/GlobalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalContextProvider>
);
