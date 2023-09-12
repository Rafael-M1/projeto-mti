import { useState, useEffect } from "react";
import { EditIcon } from "../../../../assets/images/icon-edit";
import { DeleteIcon } from "../../../../assets/images/icon-delete";
import ButtonIconSmall from "../../../../components/ButtonIconSmall";
import { requestBackend } from "../../../../util/requests";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import Pagination from "../../../../components/Pagination";
import CardLoader from "../../../Catalog/CardLoader";

const OcorrenciaAdministracao = () => {
  const [page, setPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClose = () => {
    // setTipoCrimeSelecionado(null);
    setShowModalExcluir(false);
  };

  useEffect(() => {
    setIsLoading(true);
    serviceOcorrenciaPromise({})
      .then((response) => setPage(response.data))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  console.log(page);

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
          params: {
            page: pageNumberParam ?? 0,
            size: 12,
          },
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
    <div
      className="card"
      style={{
        boxShadow: "3px 4px 19px -1px rgba(0,0,0,0.75)",
        background: "#fff",
        height: "100%",
        margin: "5px 25px",
      }}
    >
      <div className="card-body">
        <h2 className="card-title text-center">Administração - Ocorrências</h2>
        <Toaster position="top-right" />
        <div className="container mt-5">
          <div className="d-flex justify-content-between">
            <div style={{ display: "flex" }}>
              <ButtonIconSmall
                text="Filtrar"
                widthPixels={220}
                heightPixels={50}
                onClick={() => {}}
                icon={true}
              />
              <input
                type="text"
                className="form-control"
                style={{ height: "50px", width: "400px", marginLeft: "10px" }}
                placeholder="Filtrar pelo número da Ocorrência"
                onChange={(e) => {}}
              />
            </div>
            <ButtonIconSmall
              text="Adicionar"
              widthPixels={240}
              heightPixels={50}
              onClick={() => {}}
              icon={true}
            />
          </div>
          {isLoading ? (
            <CardLoader speed={0.9} width={1120} height={580} />
          ) : (
            <>
              {/* {filtroTipoCrime && <p className="mt-3">Busca por: </p>} */}
              <table className="table table-light table-hover mt-4">
                <thead>
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Vítima</th>
                    <th scope="col">Data Ocorrência</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {page &&
                    page.content &&
                    page.content.map((ocorrencia) => (
                      <tr key={ocorrencia.idOcorrencia}>
                        <th scope="row">{ocorrencia.idOcorrencia}</th>
                        <td>{ocorrencia.vitima.nome}</td>
                        <td>{ocorrencia.dataOcorrencia}</td>
                        <td>
                          <div style={{ display: "flex" }}>
                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 250, hide: 100 }}
                              overlay={
                                <Tooltip id="tooltip-top">Editar</Tooltip>
                              }
                            >
                              <div
                                style={{
                                  cursor: "pointer",
                                  borderStyle: "hidden",
                                  margin: "4px",
                                  padding: "4px",
                                }}
                                onClick={() => {}}
                              >
                                <EditIcon />
                              </div>
                            </OverlayTrigger>
                            <div
                              style={{
                                width: "10px",
                              }}
                            ></div>
                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 250, hide: 100 }}
                              overlay={
                                <Tooltip id="tooltip-top">Excluir</Tooltip>
                              }
                            >
                              <div
                                style={{
                                  cursor: "pointer",
                                  borderStyle: "hidden",
                                  margin: "4px",
                                  padding: "4px",
                                }}
                                onClick={() => {}}
                              >
                                <DeleteIcon />
                              </div>
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
          <div style={{ display: "flex" }} className="mt-4">
            {/* <Pagination
              pageCount={page && page.totalPages ? page.totalPages : 0}
              range={3}
              onChange={(pageNumber) => {
                if (filtroTipoCrime == "") {
                  serviceTipoCrimePromise({ pageNumberParam: pageNumber })
                    .then((response) => setPage(response.data))
                    .finally(() => setIsLoading(false));
                } else {
                  serviceTipoCrimePromise({
                    pageNumberParam: pageNumber,
                    methodParam: "POST",
                    urlParam: "/crime/descricao",
                    dataParam: {
                      descricao: filtroTipoCrime,
                    },
                  })
                    .then((response) => setPage(response.data))
                    .finally(() => setIsLoading(false));
                }
              }}
            /> */}
          </div>
        </div>
      </div>
      <Modal show={showModalExcluir} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h6>Deseja realmente excluir a Ocorrência?</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Nome: `}</Modal.Body>
        <Modal.Footer>
          <ButtonIconSmall
            text="Cancelar"
            widthPixels={220}
            heightPixels={40}
            onClick={() => {}}
            icon={false}
          />
          <ButtonIconSmall
            text="Confirmar"
            widthPixels={220}
            heightPixels={40}
            onClick={() => {}}
            icon={true}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OcorrenciaAdministracao;
