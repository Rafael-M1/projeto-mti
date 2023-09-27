import { MonitoringIcon } from "../../assets/images/icon-monitoring";
import { useMediaQuery } from "react-responsive";

const DashboardCard = ({
  valor,
  texto,
  textoStyle = {
    fontSize: "16px",
    fontWeight: "normal",
    marginBottom: "0px",
    marginLeft: "10px",
  },
}) => {
  const is1000pxOrLesser = useMediaQuery({ maxWidth: 1000 });
  const is1400pxOrLesser = useMediaQuery({ maxWidth: 1400 });
  return (
    <>
      <div
        className="mx-1 my-1"
        style={{
          background: "#DCDCDC",
          paddingTop: "15px",
          paddingBottom: "15px",
          borderRadius: "10px",
          width: is1000pxOrLesser ? "99%" : is1400pxOrLesser ? "45%" : "30%",
        }}
      >
        <div className="d-flex">
          <MonitoringIcon
            size={90}
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
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
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
