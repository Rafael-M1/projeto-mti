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
          <div className="home-content-container">
            <div>
              <h1>Lorem ipsum dolor sit amet, consectetuer</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean m.
              </p>
            </div>
            <div>
              <ButtonIcon
                text="Registrar Boletim de Ocorrência"
                onClick={onClickFunction}
              />
            </div>
          </div>
          <div className="home-image-container">{/* <MainImage /> */}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
