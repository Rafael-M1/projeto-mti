import { useMediaQuery } from "react-responsive";
import DatePickerComponent from "../../../components/Datepicker";
import { useState } from "react";
import ButtonIconSmall from "../../../components/ButtonIconSmall";
import toast, { Toaster } from "react-hot-toast";
import { MonitoringIcon } from "../../../assets/images/icon-monitoring";

const DashboardPage = () => {
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [value, setValue] = useState(null);
  const [texto, setTexto] = useState(null);
  const is768pxOrLesser = useMediaQuery({ maxWidth: 767 });
  const cardStyle = () => {
    if (is768pxOrLesser) {
      return {
        boxShadow: "3px 4px 19px -1px rgba(0,0,0,0.75)",
        background: "#fff",
        height: "100%",
      };
    } else {
      return {
        boxShadow: "3px 4px 19px -1px rgba(0,0,0,0.75)",
        background: "#fff",
        height: "100%",
        margin: "5px 25px",
      };
    }
  };

  return (
    <div className="card" style={cardStyle()}>
      <div className="card-body">
        <Toaster position="top-right" />
        <h2 className="card-title text-center">Dashboard</h2>
        <div className="container mt-5">
          <div className="d-flex justify-content-center">
            <div className="col-3">
              <h5>Data Início</h5>
              <DatePickerComponent
                onChangeDate={(date) => {
                  setDataInicio(date);
                }}
                selectedDateComponent={dataInicio}
              />
            </div>
            <div style={{ width: "10px" }}></div>
            <div className="col-3">
              <h5>Data Fim</h5>
              <DatePickerComponent
                onChangeDate={(date) => {
                  setDataFim(date);
                }}
                selectedDateComponent={dataFim}
              />
            </div>
            <div
              className="col-3 d-flex"
              style={{ alignItems: "center", justifyContent: "flex-end" }}
            >
              <ButtonIconSmall
                text="Filtrar"
                widthPixels={220}
                heightPixels={40}
                onClick={() => {
                  if (dataFim == null || dataInicio == null) {
                    return toast.error(
                      "Data Início ou Data Fim não deve ser vazia."
                    );
                  }
                  if (dataFim < dataInicio) {
                    return toast.error(
                      "Data Início deve ser antes de Data Fim"
                    );
                  }
                }}
                icon={true}
              />
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div
              className="col-5 d-flex"
              style={{
                background: "#DCDCDC",
                paddingTop: "15px",
                paddingBottom: "15px",
                borderRadius: "10px",
              }}
            >
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
                  {value ?? "100"}
                </p>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "normal",
                    marginBottom: "0px",
                  }}
                >
                  {texto ?? "Ocorrências no período."}
                </p>
              </div>
            </div>
            <div className="col-1"></div>
            <div
              className="col-5 d-flex"
              style={{
                background: "#DCDCDC",
                paddingTop: "15px",
                paddingBottom: "15px",
                borderRadius: "10px",
              }}
            >
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
                  {value ?? "100"}
                </p>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "normal",
                    marginBottom: "0px",
                  }}
                >
                  {texto ?? "Ocorrências no período."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
