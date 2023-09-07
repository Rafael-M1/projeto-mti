import "./styles.css";

import { ReactComponent as ArrowIcon } from "./../../assets/images/arrow.svg";

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
        <ArrowIcon />
      </div>
    </div>
  );
};

export default ButtonIcon;
