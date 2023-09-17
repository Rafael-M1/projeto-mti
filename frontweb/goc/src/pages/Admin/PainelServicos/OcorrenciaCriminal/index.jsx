import { useState } from "react";
import EtapaDadosGeraisForm from "./EtapaDadosGerais";
import EtapaDadosVitimaForm from "./EtapaDadosVitima";
import EtapaCrimesEnvolvidosForm from "./EtapaCrimesEnvolvidos";
import EtapaSuspeitosEnvolvidosForm from "./EtapaSuspeitosEnvolvidos";
import ButtonIconSmall from "../../../../components/ButtonIconSmall";
import { useMediaQuery } from "react-responsive";
import { requestBackend } from "../../../../util/requests";

const OcorrenciaCriminalForm = () => {
  const [vitimaFormObj, setVitimaFormObj] = useState({
    nome: "",
    cpf: "",
    dataNascimento: null,
    sexo: "",
    email: "",
    telefone1: "",
    telefone2: "",
  });
  const [dadosGeraisFormObj, setDadosGeraisFormObj] = useState({
    municipio: "",
    bairro: "",
    endereco: "",
    numero: "",
    dataOcorrencia: null,
    descricaoGeral: "",
  });
  const [crimesEnvolvidosObj, setCrimesEnvolvidosObj] = useState([
    { id: 1, crime: "", descricaoAdicional: "" },
  ]);
  const [suspeitosEnvolvidosObj, setSuspeitosEnvolvidosObj] = useState([
    { id: 1, descricaoSuspeito: "" },
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
  const serviceOcorrenciaPromise = ({
    pageNumberParam,
    methodParam = "GET",
    urlParam = "/ocorrencia",
    dataParam,
  }) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        let params = {
          url: urlParam,
          method: methodParam,
          withCredentials: true,
        };
        if (methodParam == "GET" || methodParam != "POST") {
          params.params = {
            page: pageNumberParam ?? 0,
            size: 12,
          };
        }
        if (dataParam) {
          params.data = dataParam;
        }
        requestBackend(params)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      }, 0);
    });
  const atualizarVitimaObj = (novoEstado) => {
    setVitimaFormObj(novoEstado);
  };
  const atualizarDadosGeraisObj = (novoEstado) => {
    setDadosGeraisFormObj(novoEstado);
  };
  const atualizarCrimesEnvolvidosObj = (novoEstado) => {
    setCrimesEnvolvidosObj(novoEstado);
  };

  const atualizarSuspeitosEnvolvidosObj = (novoEstado) => {
    setSuspeitosEnvolvidosObj(novoEstado);
  };

  const salvarOcorrencia = () => {
    serviceOcorrenciaPromise({
      methodParam: "POST",
      dataParam: {
        cidade: "Cuiabá",
        bairro: "Jardim Petropolis",
        endereco: "Rua 100",
        numero: "dois",
        complemento: "Próximo a uma praça",
        dataOcorrencia: "2023-09-15T14:32:50.505453",
        descricaoGeral: "Descrição Geral",
        vitima: {
          nome: "João da Silva",
          dataNascimento: "1990-09-15T00:00:00.0",
          cpf: "00012345678",
          email: "joao2@gmail.com",
          sexo: "M",
          telefone: "65 99999-1234",
        },
        idOperador: 1,
        pessoasEnvolvidas: [
          {
            descricao: "Pessoa magra, alta, usava camisa verde",
            pessoa: null,
          },
          {
            descricao: "Pessoa magra, alta, usava camisa vermelha",
            pessoa: null,
          },
        ],
        crimesEnvolvidos: [
          {
            idCrime: 1,
            descricaoCrimeOcorrencia: "Descrição adicional crime",
          },
        ],
      },
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  return (
    <div className="card" style={cardStyle()}>
      <div className="card-body">
        <h2 className="card-title text-center">
          Formulário Ocorrência Policial
        </h2>
        <>
          <EtapaDadosVitimaForm atualizarVitimaObj={atualizarVitimaObj} />
          <EtapaDadosGeraisForm
            atualizarDadosGeraisObj={atualizarDadosGeraisObj}
          />
          <EtapaCrimesEnvolvidosForm
            atualizarCrimesEnvolvidosObj={atualizarCrimesEnvolvidosObj}
          />
          <EtapaSuspeitosEnvolvidosForm
            atualizarSuspeitosEnvolvidosObj={atualizarSuspeitosEnvolvidosObj}
          />
          <div className="d-flex justify-content-end mt-5">
            {/* <ButtonIconSmall
                text="Voltar"
                widthPixels={200}
                heightPixels={50}
                onClick={() => {}}
              /> */}
            <ButtonIconSmall
              text={"Finalizar"}
              widthPixels={210}
              heightPixels={50}
              icon={true}
              onClick={() => salvarOcorrencia()}
            />
          </div>
        </>
      </div>
    </div>
  );
};

export default OcorrenciaCriminalForm;
