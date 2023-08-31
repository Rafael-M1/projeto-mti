import { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as MainImage } from "./../../assets/images/main-image.svg";
import ButtonIcon from "../../components/ButtonIcon";
import { Link } from "react-router-dom";
import { requestBackendLogin } from "../../util/requests";
import "./styles.css";
import jwtDecode from "jwt-decode";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onClickFunction = () => {
    setIsLoading(true);
    requestBackendLogin({
      username: "alex@gmail.com",
      password: "123456",
    }).then((response) => {
      console.log(response.data.access_token);
      let token = jwtDecode(response.data.access_token);
      console.log(token);
    });
    setIsLoading(false);
  };

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
                text="Inicie agora a sua busca"
                onClick={onClickFunction}
              />
              {/* <Link to="/produtos">
              </Link> */}
            </div>
          </div>
          <div className="home-image-container">{/* <MainImage /> */}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
