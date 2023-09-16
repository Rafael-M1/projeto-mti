import { useState } from "react";
import EtapaDadosGeraisForm from "./EtapaDadosGerais";
import EtapaDadosVitimaForm from "./EtapaDadosVitima";
import EtapaCrimesEnvolvidosForm from "./EtapaCrimesEnvolvidos";
import EtapaSuspeitosEnvolvidosForm from "./EtapaSuspeitosEnvolvidos";
import ButtonIconSmall from "../../../../components/ButtonIconSmall";
import { useMediaQuery } from "react-responsive";

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

  const atualizarVitimaObj = (novoEstado) => {
    setVitimaFormObj(novoEstado);
  };
  const atualizarDadosGeraisObj = (novoEstado) => {
    setDadosGeraisFormObj(novoEstado);
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
          <EtapaCrimesEnvolvidosForm />
          <EtapaSuspeitosEnvolvidosForm />
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
              onClick={() => {}}
            />
          </div>
        </>
      </div>
    </div>
  );
};

export default OcorrenciaCriminalForm;
