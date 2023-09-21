import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import ptBr from "date-fns/locale/pt-BR";
import AxiosInterceptorsSetup from "./util/requests.js";
// import './index.css';
registerLocale("pt-BR", ptBr);

function AxiosInterceptorNavigate() {
  let navigate = useNavigate();
  const [ran, setRan] = useState(false);

  if (!ran) {
    AxiosInterceptorsSetup(navigate);
    setRan(true);
  }
  return <></>;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AxiosInterceptorNavigate />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
