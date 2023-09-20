import { MonitoringIcon } from "../../assets/images/icon-monitoring";
import { useMediaQuery } from "react-responsive";

const DashboardCard = ({
  valor,
  texto,
  textoStyle = {
    fontSize: "24px",
    fontWeight: "normal",
    marginBottom: "0px",
  },
}) => {
  const is1000pxOrLesser = useMediaQuery({ maxWidth: 1000 });
  return (
    <>
      <div
        className="col-12 col-md-6 col-lg-6 mx-2 my-1"
        style={{
          background: "#DCDCDC",
          paddingTop: "15px",
          paddingBottom: "15px",
          borderRadius: "10px",
          width: !is1000pxOrLesser ? "45%" : "99%",
        }}
      >
        <div className="d-flex">
          <MonitoringIcon
            size={110}
            styleComponent={{
              background: "#fff",
              padding: "3px",
              border: "1px solid",
              borderRadius: "10px",
            }}
          />
          <div
            style={{
              marginLeft: "10px",
              background: "#fff",
              borderRadius: "10px",
              width: "80%",
              padding: "0 10px",
            }}
          >
            <p
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                marginBottom: "0px",
              }}
            >
              {valor ?? "0"}
            </p>
            <p style={textoStyle}>{texto ?? "Ocorrências no período."}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCard;
