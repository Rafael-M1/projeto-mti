import { Modal } from "react-bootstrap";
import ButtonIconSmall from "../../../../../components/ButtonIconSmall";

const ModalVisualizar = ({ showModalVisualizar, onHide, ocorrencia }) => {
  return (
    <Modal show={showModalVisualizar} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>
          <h6>
            Ocorrencia -
            {ocorrencia && ocorrencia.idOcorrencia
              ? " " + ocorrencia.idOcorrencia
              : ""}
          </h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{`Código Ocorrência: ${ocorrencia?.idOcorrencia}`}</p>
        <p>{`Vítima: ${ocorrencia?.vitima.nome}`}</p>
      </Modal.Body>
      <Modal.Footer>
        <ButtonIconSmall
          text="Fechar"
          widthPixels={220}
          heightPixels={40}
          onClick={onHide}
          icon={false}
        />
        {/* <ButtonIconSmall
          text="Confirmar"
          widthPixels={220}
          heightPixels={40}
          onClick={() => {
            serviceOcorrenciaPromise({
              methodParam: "DELETE",
              urlParam: `/ocorrencia/${ocorrenciaSelecionada.idOcorrencia}`,
            })
              .then((response) => {
                setIsLoading(true);
                serviceOcorrenciaPromise({})
                  .then((response) => setPage(response.data))
                  .finally(() => setIsLoading(false));
              })
              .finally(() => handleClose());
          }}
          icon={true}
        /> */}
      </Modal.Footer>
    </Modal>
  );
};
export default ModalVisualizar;
