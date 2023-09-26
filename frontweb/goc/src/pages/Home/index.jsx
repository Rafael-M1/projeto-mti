import { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as MainImage } from "./../../assets/images/main-image.svg";
import ButtonIcon from "../../components/ButtonIcon";
import "./styles.css";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onClickFunction = () => {};

  // useEffect(() => {

  // }, []);

  return (
    <>
      <div className="home-container">
        <div className="base-card home-card">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div>
                  <h1>Lorem ipsum dolor sit amet, consectetuer</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean m.
                  </p>
                </div>
              </div>
              <div className="col-lg-1"></div>
              <div
                className="col-lg-5"
                style={{
                  background: "#f8e7a2",
                  borderRadius: "20px",
                  marginTop: "20px",
                  marginBottom: "20px",
                  border: "2px solid #e1ba74"
                }}
              >
                <div
                  style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <h5 style={{ color: "red" }}>Atenção</h5>
                    <h6 style={{ textAlign: "left" }}>
                      A Polícia Civil adverte que falsidade ideológica e falsa
                      comunicação de crime também configuram crimes, conforme
                      previsão no artigo 299 e 340, respectivamente, do Código
                      Penal Brasileiro.
                    </h6>
                    <h6 style={{ textAlign: "left" }} className="mt-4">
                      O usuário poderá receber a visita de policiais civis,
                      devidamente identificados, para entrevista pessoal sobre o
                      delito notificado.
                    </h6>
                  </div>
                  <div className="mt-5">
                    <ButtonIcon
                      text="Registrar Boletim de Ocorrência"
                      onClick={onClickFunction}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
