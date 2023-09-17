import { useState } from "react";
import EtapaDadosGeraisForm from "./EtapaDadosGerais";
import EtapaDadosVitimaForm from "./EtapaDadosVitima";
import EtapaCrimesEnvolvidosForm from "./EtapaCrimesEnvolvidos";
import EtapaSuspeitosEnvolvidosForm from "./EtapaSuspeitosEnvolvidos";
import ButtonIconSmall from "../../../../components/ButtonIconSmall";
import { useMediaQuery } from "react-responsive";
import { requestBackend } from "../../../../util/requests";
import toast, { Toaster } from "react-hot-toast";

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
    complemento: "",
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
    let ocorrenciaObj = {
      cidade: dadosGeraisFormObj.municipio,
      bairro: dadosGeraisFormObj.bairro,
      endereco: dadosGeraisFormObj.endereco,
      numero: dadosGeraisFormObj.numero,
      complemento: dadosGeraisFormObj.complemento,
      dataOcorrencia: dadosGeraisFormObj.dataOcorrencia,
      descricaoGeral: dadosGeraisFormObj.descricaoGeral,
      vitima: {
        nome: vitimaFormObj.nome,
        dataNascimento: vitimaFormObj.dataNascimento,
        cpf: vitimaFormObj.cpf,
        email: vitimaFormObj.email,
        sexo: vitimaFormObj.sexo,
        telefone1: vitimaFormObj.telefone1,
        telefone2: vitimaFormObj.telefone2,
      },
      idOperador: 1,
      pessoasEnvolvidas: suspeitosEnvolvidosObj.map(
        (suspeitosEnvolvidoElemento) => ({
          descricao: suspeitosEnvolvidoElemento.descricaoSuspeito,
          pessoa: null,
        })
      ),
      crimesEnvolvidos: crimesEnvolvidosObj.map((crimeEnvolvidoElemento) => ({
        idCrime: crimeEnvolvidoElemento.crime,
        descricaoCrimeOcorrencia: crimeEnvolvidoElemento.descricaoAdicional,
      })),
    };
    console.log(ocorrenciaObj);
    if (vitimaFormObj.cpf == null || vitimaFormObj.cpf.length != 11) {
      toast.error("Digite o CPF da vítima.");
    } else if (vitimaFormObj.dataNascimento == null) {
      toast.error("Selecione a data de nascimento da vítima.");
    } else if (
      vitimaFormObj.nome == null ||
      vitimaFormObj.nome.trim().length < 4
    ) {
      toast.error("Digite o nome da vítima.");
    } else if (
      vitimaFormObj.telefone1 == null ||
      vitimaFormObj.telefone1.trim().length < 10
    ) {
      toast.error("Digite o telefone de contato da vítima.");
    } else if (
      vitimaFormObj.sexo == null ||
      !(vitimaFormObj.sexo == "M" || vitimaFormObj.sexo == "F")
    ) {
      toast.error("Selecione o sexo da vítima.");
    } else if (
      vitimaFormObj.email == null ||
      vitimaFormObj.email.trim().length < 4 ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        vitimaFormObj.email.trim()
      )
    ) {
      toast.error("Digite um e-mail válido da vítima.");
    } else if (
      dadosGeraisFormObj.bairro == null ||
      dadosGeraisFormObj.bairro.trim().length < 4
    ) {
      toast.error("Digite o Bairro da ocorrência.");
    } else if (
      dadosGeraisFormObj.municipio == null ||
      dadosGeraisFormObj.municipio.trim() == ""
    ) {
      toast.error("Selecione o município da ocorrência.");
    } else if (
      dadosGeraisFormObj.endereco == null ||
      dadosGeraisFormObj.endereco.trim().length < 3
    ) {
      toast.error("Digite o endereço da ocorrência.");
    } else if (dadosGeraisFormObj.dataOcorrencia == null) {
      toast.error("Selecione a data da ocorrência.");
    } else if (
      dadosGeraisFormObj.descricaoGeral == null ||
      dadosGeraisFormObj.descricaoGeral.trim().length < 10
    ) {
      toast.error("Digite os dados gerais da ocorrência.");
    } else if (
      crimesEnvolvidosObj.some(
        (crimeEnvolvidoElemento) => crimeEnvolvidoElemento.crime == ""
      )
    ) {
      toast.error("Selecione um crime envolvido na ocorrência.");
    } else if (
      suspeitosEnvolvidosObj.some(
        (suspeitoEnvolvidoElemento) =>
          suspeitoEnvolvidoElemento.descricaoSuspeito.trim().length < 4
      )
    ) {
      toast.error("Digite a descrição do envolvido.");
    } else {
      toast.success("Ocorrência cadastrada com sucesso.");
      // serviceOcorrenciaPromise({
      //   methodParam: "POST",
      //   dataParam: ocorrenciaObj,
      // })
      //   .then((response) => toast.success("Ocorrência cadastrada com sucesso."))
      //   .catch((error) => console.log(error));
    }
  };
  return (
    <div className="card" style={cardStyle()}>
      <div className="card-body">
        <h2 className="card-title text-center">
          Formulário Ocorrência Policial
        </h2>
        <>
          <Toaster position="top-right" />
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
