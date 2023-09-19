import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import ptBr from "date-fns/locale/pt-BR";
// import './index.css';
registerLocale("pt-BR", ptBr);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/helloworld/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
