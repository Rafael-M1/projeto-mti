import "./styles.css";
import { ArrowIcon } from "../../assets/images/arrow";

const ButtonIconSmall = ({
  text,
  onClick,
  widthPixels,
  heightPixels,
  icon,
  widthPixelsButton
}) => {
  return (
    <div
      className="btn-container-small"
      onClick={onClick}
      style={{
        width: widthPixels,
        height: heightPixels ?? "auto",
      }}
    >
      <button
        className="btn btn-dark"
        style={{
          borderRadius: icon ? "10px 0px 0px 10px" : "10px 10px 10px 10px",
          // width: widthPixelsButton
        }}
      >
        <p style={{margin: "0", fontSize: "16px"}}>{text}</p>
      </button>
      {icon ? (
        <div
          className="btn-icon-container-small"
          style={{
            borderRadius: icon ? "0px 10px 10px 0px" : "10px 10px 10px 10px",
          }}
        >
          <ArrowIcon colour={"#fff"} width={"14"} height={"24"} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ButtonIconSmall;
