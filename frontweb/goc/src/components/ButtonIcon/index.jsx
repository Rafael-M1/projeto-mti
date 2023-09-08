import "./styles.css";

import { ArrowIcon } from "../../assets/images/arrow";

const ButtonIcon = ({ text, onClick, widthPixels, heightPixels }) => {
  return (
    <div
      className="btn-container"
      onClick={onClick}
      style={{
        width: widthPixels,
        height: heightPixels ?? "auto",
        margin: "auto",
      }}
    >
      <button className="btn btn-dark">
        <h6>{text}</h6>
      </button>
      <div className="btn-icon-container">
        <ArrowIcon colour={"#fff"} width={"14"} height={"24"}/>
      </div>
    </div>
  );
};

export default ButtonIcon;
