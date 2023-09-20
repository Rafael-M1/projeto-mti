import { useMediaQuery } from "react-responsive";
import DatePickerComponent from "../../../components/Datepicker";
import { useEffect, useState } from "react";
import ButtonIconSmall from "../../../components/ButtonIconSmall";
import toast, { Toaster } from "react-hot-toast";
import { MonitoringIcon } from "../../../assets/images/icon-monitoring";
import DashboardCard from "../../../components/DashboardCard";
import { requestBackend } from "../../../util/requests";
import { formatLocalDateTime } from "../../../util/formatters";

const DashboardPage = () => {
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [dataInicioFiltro, setDataInicioFiltro] = useState(null);
  const [dataFimFiltro, setDataFimFiltro] = useState(null);
  const [value, setValue] = useState(null);
  const [texto, setTexto] = useState(null);
  const [dashboardInfo, setDashboardInfo] = useState({
    qtdOcorrenciasPorPeriodo: 0,
    qtdOcorrenciasMulheresPorPeriodo: 0,
    qtdOcorrenciasHomensPorPeriodo: 0,
  });
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

  useEffect(() => {
    // serviceDashboardPromise({
    //   urlParam:
    //     "/ocorrencia/dashboard?dataInicio=01/01/2023 00:00:00&dataFim=01/12/2023 00:00:00",
    // }).then((response) => console.log(response));
  }, []);

  const serviceDashboardPromise = ({
    methodParam = "GET",
    urlParam = "/ocorrencia/dashboard",
  }) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        let params = {
          url: urlParam,
          method: methodParam,
          withCredentials: true,
        };
        requestBackend(params)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      }, 0);
    });

  const onClickFiltrar = () => {
    if (dataFim == null || dataInicio == null) {
      return toast.error("Data Início ou Data Fim não deve ser vazia.");
    }
    if (dataFim < dataInicio) {
      return toast.error("Data Início deve ser antes de Data Fim");
    }
    serviceDashboardPromise({
      urlParam: `/ocorrencia/dashboard?dataInicio=${dataInicioFiltro}&dataFim=${dataFimFiltro}`,
    }).then((response) => {
      setDashboardInfo(response.data);
    });
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
                  setDataInicioFiltro(formatLocalDateTime(new Date(date)));
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
                  setDataFimFiltro(formatLocalDateTime(new Date(date)));
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
                onClick={onClickFiltrar}
                icon={true}
              />
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <DashboardCard
              texto={"Ocorrências no período"}
              valor={dashboardInfo?.qtdOcorrenciasPorPeriodo}
            />
            <DashboardCard
              texto={"Ocorrências no período envolvendo homens como vítima."}
              valor={dashboardInfo?.qtdOcorrenciasHomensPorPeriodo}
            />
            <DashboardCard
              texto={"Ocorrências no período envolvendo mulheres como vítima."}
              valor={dashboardInfo?.qtdOcorrenciasMulheresPorPeriodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
