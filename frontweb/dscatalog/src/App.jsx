import "./assets/styles/custom.scss";
import "./App.css";

import { useState } from "react";
import RoutesConfig from "./Routes";
//import { AuthContext, AuthContextData } from 'AuthContext';

function App() {
  const [authContextData, setAuthContextData] = useState({
    authenticated: false,
  });

  return <RoutesConfig />;
}

export default App;
