import { Modal } from "react-bootstrap";
import EtapaDadosVitimaForm from "../../Admin/PainelServicos/OcorrenciaCriminal/EtapaDadosVitima";
import EtapaDadosGeraisForm from "../../Admin/PainelServicos/OcorrenciaCriminal/EtapaDadosGerais";
import EtapaCrimesEnvolvidosForm from "../../Admin/PainelServicos/OcorrenciaCriminal/EtapaCrimesEnvolvidos";
import EtapaSuspeitosEnvolvidosForm from "../../Admin/PainelServicos/OcorrenciaCriminal/EtapaSuspeitosEnvolvidos";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestBackend } from "../../../util/requests";
import ButtonIconSmall from "../../../components/ButtonIconSmall";

const ModalOcorrenciaPublic = ({ isModalVisible, closeModal, ocorrencia }) => {
  const [isVisibleOcorrenciaModal, setVisibleOcorrenciaModal] = useState(false);
  const closeModalBoletimOcorrencia = () => {
    setVisibleOcorrenciaModal(false);
    closeModal();
  };
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
        };
        if (dataParam) {
          params.data = dataParam;
        }
        requestBackend(params)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      }, 0);
    });
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
      idOperador: null,
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
      serviceOcorrenciaPromise({
        methodParam: "POST",
        dataParam: ocorrenciaObj,
      })
        .then((response) => {
          toast.success("Cadastrado com sucesso!");
          setVisibleOcorrenciaModal(true);
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <>
      <Modal
        show={isModalVisible}
        onHide={() => closeModal()}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
        size="xl"
        scrollable
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>
            <h6>Novo Boletim de Ocorrência Online</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Toaster position="top-right" />
          <EtapaDadosVitimaForm
            modoPublico={true}
            atualizarVitimaObj={atualizarVitimaObj}
          />
          <EtapaDadosGeraisForm
            atualizarDadosGeraisObj={atualizarDadosGeraisObj}
          />
          <EtapaCrimesEnvolvidosForm
            atualizarCrimesEnvolvidosObj={atualizarCrimesEnvolvidosObj}
          />
          <EtapaSuspeitosEnvolvidosForm
            atualizarSuspeitosEnvolvidosObj={atualizarSuspeitosEnvolvidosObj}
          />
        </Modal.Body>
        <Modal.Footer>
          <ButtonIconSmall
            text={"Cancelar"}
            widthPixels={210}
            heightPixels={50}
            icon={false}
            onClick={() => closeModal()}
          />
          <ButtonIconSmall
            text={"Finalizar"}
            widthPixels={210}
            heightPixels={50}
            icon={true}
            onClick={() => salvarOcorrencia()}
          />
        </Modal.Footer>
      </Modal>
      <Modal
        show={isVisibleOcorrenciaModal}
        onHide={() => closeModalBoletimOcorrencia()}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
        size="lg"
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>
            <div style={{ display: "flex" }}>
              {/* <h6>Boletim de Ocorrência Online</h6> */}
              <h6>Boletim de ocorrencia criado com sucesso!</h6>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <ButtonIconSmall
            text={"Fechar"}
            widthPixels={210}
            heightPixels={50}
            icon={false}
            onClick={() => closeModalBoletimOcorrencia()}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalOcorrenciaPublic;
