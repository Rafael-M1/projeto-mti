import { useMediaQuery } from "react-responsive";
import DatePickerComponent from "../../../components/Datepicker";
import { useEffect, useState } from "react";
import ButtonIconSmall from "../../../components/ButtonIconSmall";
import toast, { Toaster } from "react-hot-toast";
import { MonitoringIcon } from "../../../assets/images/icon-monitoring";
import DashboardCard from "../../../components/DashboardCard";
import { requestBackend } from "../../../util/requests";
import { formatLocalDateTime } from "../../../util/formatters";
import { Chart } from "react-google-charts";

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
  const [dataOcorrenciaPorTipoCrime, setDataOcorrenciaPorTipoCime] = useState([
    [" ", " "],
    [" ", " "],
  ]);
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
  const is1000pxOrLesser = useMediaQuery({ maxWidth: 1000 });

  useEffect(() => {
    serviceDashboardPromise({
      urlParam: `/ocorrencia/dashboard`,
    }).then((response) => {
      setDashboardInfo(response.data);
      if (response.data.qtdOcorrenciasPorTipoCrimePorPeriodo.length == 0) {
        setDataOcorrenciaPorTipoCime([
          [" ", "Não há dados"],
          [" ", " "],
        ]);
      } else {
        let tipoCrimeArray = [" "];
        response.data.qtdOcorrenciasPorTipoCrimePorPeriodo.forEach(
          (element) => {
            tipoCrimeArray.push(element.key);
          }
        );
        let numeroOcorrenciaPorTipoCrimeArray = [" "];
        response.data.qtdOcorrenciasPorTipoCrimePorPeriodo.forEach(
          (element) => {
            numeroOcorrenciaPorTipoCrimeArray.push(element.value);
          }
        );
        setDataOcorrenciaPorTipoCime([
          tipoCrimeArray,
          numeroOcorrenciaPorTipoCrimeArray,
        ]);
      }
    });
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
      if (response.data.qtdOcorrenciasPorTipoCrimePorPeriodo.length == 0) {
        setDataOcorrenciaPorTipoCime([
          [" ", "Não há dados"],
          [" ", " "],
        ]);
      } else {
        let tipoCrimeArray = [" "];
        response.data.qtdOcorrenciasPorTipoCrimePorPeriodo.forEach(
          (element) => {
            tipoCrimeArray.push(element.key);
          }
        );
        let numeroOcorrenciaPorTipoCrimeArray = [" "];
        response.data.qtdOcorrenciasPorTipoCrimePorPeriodo.forEach(
          (element) => {
            numeroOcorrenciaPorTipoCrimeArray.push(element.value);
          }
        );
        setDataOcorrenciaPorTipoCime([
          tipoCrimeArray,
          numeroOcorrenciaPorTipoCrimeArray,
        ]);
      }
    });
  };

  const options = {
    chart: {
      title: "Ocorrências por Tipo de Crime",
    },
  };

  return (
    <div className="card" style={cardStyle()}>
      <div className="card-body">
        <Toaster position="top-right" />
        <h2 className="card-title text-center">Dashboard</h2>
        <div className="container mt-5 row mx-auto">
          <div className="col-12 col-lg-3">
            <h5>Data Início</h5>
            <DatePickerComponent
              onChangeDate={(date) => {
                setDataInicio(date);
                setDataInicioFiltro(formatLocalDateTime(new Date(date)));
              }}
              selectedDateComponent={dataInicio}
            />
          </div>
          <div className="col-12 col-lg-3">
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
            className="col-12 col-lg-3 d-flex"
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
        <div className="container mt-5">
          <div className="row">
            {/* <DashboardCard
              texto={"Ocorrências totais"}
              valor={dashboardInfo?.qtdOcorrenciasTotais}
            /> */}
            <DashboardCard
              texto={"Ocorrências totais"}
              valor={dashboardInfo?.qtdOcorrenciasPorPeriodo}
            />
            <DashboardCard
              texto={"Ocorrências envolvendo homens como vítima."}
              valor={dashboardInfo?.qtdOcorrenciasHomensPorPeriodo}
            />
            <DashboardCard
              texto={"Ocorrências envolvendo mulheres como vítima."}
              valor={dashboardInfo?.qtdOcorrenciasMulheresPorPeriodo}
            />
          </div>
          <div className="mt-5">
            <Chart
              chartType="Bar"
              width={is1000pxOrLesser ? "100%" : "80%"}
              height="300px"
              data={dataOcorrenciaPorTipoCrime}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
