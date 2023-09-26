import { Modal } from "react-bootstrap";
import ButtonIconSmall from "../../../../../components/ButtonIconSmall";
import EtapaDadosVitimaForm from "../../../PainelServicos/OcorrenciaCriminal/EtapaDadosVitima";
import EtapaDadosGeraisForm from "../../../PainelServicos/OcorrenciaCriminal/EtapaDadosGerais";
import EtapaCrimesEnvolvidosForm from "../../../PainelServicos/OcorrenciaCriminal/EtapaCrimesEnvolvidos";
import uuid from "react-uuid";
import EtapaSuspeitosEnvolvidosForm from "../../../PainelServicos/OcorrenciaCriminal/EtapaSuspeitosEnvolvidos";
import { requestBackend } from "../../../../../util/requests";

const ModalVisualizar = ({ showModalVisualizar, onHide, ocorrencia }) => {
  const onClickValidar = () => {
    servicePromise({ urlParam: "/me" }).then((response) => {
      console.log(response);
      let idUsuarioLogado = response.data.idUser;
      servicePromise({
        urlParam: "/ocorrencia/validar",
        dataParam: {
          idOcorrencia: ocorrencia.idOcorrencia,
          idOperador: idUsuarioLogado,
        },
        methodParam: "POST",
      }).then((response) => console.log(response));
    });
  };

  const servicePromise = ({
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
        if (dataParam) {
          params.data = dataParam;
        }
        requestBackend(params)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      }, 0);
    });

  return (
    <Modal
      show={showModalVisualizar}
      onHide={onHide}
      centered
      size="xl"
      scrollable
    >
      <Modal.Header>
        <Modal.Title>
          <h6>
            Ocorrência - Código:
            {ocorrencia && ocorrencia.idOcorrencia
              ? " " + ocorrencia.idOcorrencia
              : ""}
          </h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <p>{`Código Ocorrência: ${ocorrencia?.idOcorrencia}`}</p>
        <p>{`Vítima: ${ocorrencia?.vitima.nome}`}</p> */}
        <EtapaDadosVitimaForm
          modoVisualizar={true}
          vitimaParamObj={{
            nome: ocorrencia?.vitima?.nome,
            cpf: ocorrencia?.vitima?.cpf,
            dataNascimento: new Date(ocorrencia?.vitima?.dataNascimento),
            sexo: ocorrencia?.vitima?.sexo,
            email: ocorrencia?.vitima?.email,
            telefone1: ocorrencia?.vitima?.telefone1,
            telefone2: ocorrencia?.vitima?.telefone2 ?? "",
          }}
        />
        <EtapaDadosGeraisForm
          modoVisualizar={true}
          dadosGeraisParamObj={{
            municipio: ocorrencia?.cidade,
            bairro: ocorrencia?.bairro,
            endereco: ocorrencia?.endereco,
            numero: ocorrencia?.numero,
            dataOcorrencia: new Date(ocorrencia?.dataOcorrencia),
            descricaoGeral: ocorrencia?.descricaoGeral,
            complemento: ocorrencia?.complemento,
          }}
        />
        <EtapaCrimesEnvolvidosForm
          modoVisualizar={true}
          crimesEnvolvidosParamObj={ocorrencia?.crimesEnvolvidos.map(
            (crimeEnvolvido) => {
              return {
                id: uuid(),
                crime: crimeEnvolvido.tipoCrime,
                descricaoAdicional: crimeEnvolvido.descricaoCrimeOcorrencia,
              };
            }
          )}
        />
        <EtapaSuspeitosEnvolvidosForm
          modoVisualizar={true}
          pessoasEnvolvidasParamObj={ocorrencia?.pessoasEnvolvidas.map(
            (pessoaEnvolvida) => {
              return {
                id: pessoaEnvolvida.idEnvolvido,
                descricaoSuspeito: pessoaEnvolvida.descricao,
              };
            }
          )}
        />
      </Modal.Body>
      <Modal.Footer>
        <ButtonIconSmall
          text="Fechar"
          widthPixels={220}
          heightPixels={40}
          onClick={onHide}
          icon={false}
        />
        {ocorrencia && ocorrencia.operador == null && (
          <ButtonIconSmall
            text="Validar"
            widthPixels={220}
            heightPixels={40}
            onClick={() => onClickValidar()}
            icon={true}
          />
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default ModalVisualizar;
