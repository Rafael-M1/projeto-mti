import "./styles.css";

import { ReactComponent as ArrowIcon } from "./../../assets/images/arrow.svg";

const ButtonIcon = ({ text, onClick }) => {
  return (
    <div className="btn-container" onClick={onClick}>
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
