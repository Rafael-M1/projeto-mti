import { useState, useEffect } from "react";
import { EditIcon } from "../../../../assets/images/icon-edit";
import { DeleteIcon } from "../../../../assets/images/icon-delete";
import ButtonIconSmall from "../../../../components/ButtonIconSmall";
import { requestBackend } from "../../../../util/requests";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import Pagination from "../../../../components/Pagination";
import CardLoader from "../../../../components/CardLoader";
import { useMediaQuery } from "react-responsive";
import { VisibilityOffIcon } from "../../../../assets/images/icon-visibility-off";
import { VisibilityIcon } from "../../../../assets/images/icon-visibility";

const TipoCrime = () => {
  const [page, setPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [filtroTipoCrimeTexto, setFiltroTipoCrimeTexto] = useState("");
  const [filtroTipoCrime, setFiltroTipoCrime] = useState("");
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [tipoCrimeSelecionado, setTipoCrimeSelecionado] = useState(null);
  const is1000pxOrLesser = useMediaQuery({ maxWidth: 1000 });
  const navigate = useNavigate();
  const { state } = useLocation();
  const handleClose = () => {
    setTipoCrimeSelecionado(null);
    setShowModalExcluir(false);
  };

  useEffect(() => {
    if (state != null && state.mensagem != null) {
      if (state.mensagem.tipo == "success") {
        toast.success(state.mensagem.texto);
        navigate(location.pathname, { replace: true });
      }
    }
    setIsLoading(true);
    serviceTipoCrimePromise({})
      .then((response) => setPage(response.data))
      .finally(() => setIsLoading(false));
  }, []);

  const serviceTipoCrimePromise = ({
    pageNumberParam,
    methodParam = "GET",
    urlParam = "/crime",
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

  const onClickFiltrar = () => {
    if (filtroTipoCrimeTexto.trim() != "") {
      // setIsLoading(true);
      setFiltroTipoCrime(filtroTipoCrimeTexto);
      serviceTipoCrimePromise({
        methodParam: "POST",
        urlParam: "/crime/descricao",
        dataParam: { descricao: filtroTipoCrimeTexto },
      })
        .then((response) => setPage(response.data))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // setIsLoading(true);
      setFiltroTipoCrime(filtroTipoCrimeTexto);
      serviceTipoCrimePromise({})
        .then((response) => setPage(response.data))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const onClickExcluir = (tipoCrime) => {
    setTipoCrimeSelecionado(tipoCrime);
    setShowModalExcluir(true);
  };

  const onClickEditar = (tipoCrimeParam) => {
    navigate("/goc/admin/administracao/tipocrime/form", {
      state: {
        tipoCrime: {
          idCrime: tipoCrimeParam.idCrime,
          descricao: tipoCrimeParam.descricao,
        },
      },
    });
  };
  const onClickAdicionar = () => {
    navigate("/goc/admin/administracao/tipocrime/form");
  };
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
        <div className="container">
          <ButtonIconSmall
            text="Voltar"
            widthPixels={220}
            heightPixels={40}
            onClick={() => {
              navigate("/goc/admin/administracao");
            }}
            icon={false}
          />
        </div>
        <h2 className="card-title text-center">Cadastro - Tipos de Crimes</h2>
        <Toaster position="top-right" />
        <div className="container mt-5">
          {!is1000pxOrLesser ? (
            <div className="d-flex justify-content-between">
              <div style={{ display: "flex" }}>
                <ButtonIconSmall
                  text="Filtrar"
                  widthPixels={220}
                  heightPixels={50}
                  onClick={onClickFiltrar}
                  icon={true}
                />
                <input
                  type="text"
                  className="form-control"
                  style={{ height: "50px", width: "400px", marginLeft: "10px" }}
                  placeholder="Filtrar pelo nome do Tipo de Crime"
                  onChange={(e) => setFiltroTipoCrimeTexto(e.target.value)}
                />
              </div>
              <ButtonIconSmall
                text="Adicionar"
                widthPixels={240}
                heightPixels={50}
                onClick={onClickAdicionar}
                icon={true}
              />
            </div>
          ) : (
            <div className="row">
              <div className="col-12 d-flex justify-content-end">
                <ButtonIconSmall
                  text="Adicionar"
                  widthPixels={240}
                  heightPixels={50}
                  onClick={onClickAdicionar}
                  icon={true}
                />
              </div>
              <div className="col-12 col-lg-6 mt-4">
                <ButtonIconSmall
                  text="Filtrar"
                  widthPixels={220}
                  heightPixels={50}
                  onClick={onClickFiltrar}
                  icon={true}
                />
                <input
                  type="text"
                  className="form-control"
                  style={{ height: "50px", width: "100%", marginLeft: "10px" }}
                  placeholder="Filtrar pelo nome do Tipo de Crime"
                  onChange={(e) => setFiltroTipoCrimeTexto(e.target.value)}
                />
              </div>
            </div>
          )}
          {isLoading ? (
            <CardLoader speed={0.9} width={1120} height={580} />
          ) : (
            <>
              {filtroTipoCrime && (
                <p className="mt-3">Busca por: {filtroTipoCrime}</p>
              )}
              <div style={{ overflowX: "auto" }}>
                <table className="table table-light table-hover mt-4">
                  <thead>
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Tipo de Crime</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page &&
                      page.content &&
                      page.content.map((tipoCrime) => (
                        <tr key={tipoCrime.idCrime}>
                          <th scope="row">{tipoCrime.idCrime}</th>
                          <td>{tipoCrime.descricao}</td>
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
                                  onClick={() => onClickEditar(tipoCrime)}
                                >
                                  <EditIcon />
                                </div>
                              </OverlayTrigger>
                              <div
                                style={{
                                  width: "10px",
                                }}
                              ></div>
                              {tipoCrime.status == true ? (
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 100 }}
                                  overlay={
                                    <Tooltip id="tooltip-top">
                                      Desabilitar
                                    </Tooltip>
                                  }
                                >
                                  <div
                                    style={{
                                      cursor: "pointer",
                                      borderStyle: "hidden",
                                      margin: "4px",
                                      padding: "4px",
                                    }}
                                    onClick={() => onClickExcluir(tipoCrime)}
                                  >
                                    <VisibilityOffIcon size={24} />
                                  </div>
                                </OverlayTrigger>
                              ) : (
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 100 }}
                                  overlay={
                                    <Tooltip id="tooltip-top">
                                      Habilitar
                                    </Tooltip>
                                  }
                                >
                                  <div
                                    style={{
                                      cursor: "pointer",
                                      borderStyle: "hidden",
                                      margin: "4px",
                                      padding: "4px",
                                    }}
                                    onClick={() => onClickExcluir(tipoCrime)}
                                  >
                                    <VisibilityIcon size={24} />
                                  </div>
                                </OverlayTrigger>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <div style={{ display: "flex" }} className="mt-4">
            <Pagination
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
            />
          </div>
        </div>
      </div>
      <Modal show={showModalExcluir} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            {tipoCrimeSelecionado?.status == true ? (
              <h6>Deseja realmente desabilitar o Tipo de Crime?</h6>
            ) : (
              <h6>Deseja realmente habilitar o Tipo de Crime?</h6>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Nome: ${tipoCrimeSelecionado?.descricao}`}
          {tipoCrimeSelecionado?.status == false && (
            <>
              <div className="mt-2"></div>
              <>
                Observação: Tipos de Crime habilitados ficam disponíveis nos
                formulários de ocorrências criminais.
              </>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <ButtonIconSmall
            text="Cancelar"
            widthPixels={220}
            heightPixels={40}
            onClick={() => setShowModalExcluir(false)}
            icon={false}
          />
          <ButtonIconSmall
            text="Confirmar"
            widthPixels={220}
            heightPixels={40}
            onClick={() => {
              serviceTipoCrimePromise({
                methodParam: "DELETE",
                urlParam: `/crime/${tipoCrimeSelecionado.idCrime}`,
              })
                .then((response) => {
                  setIsLoading(true);
                  serviceTipoCrimePromise({})
                    .then((response) => setPage(response.data))
                    .finally(() => setIsLoading(false));
                })
                .finally(() => handleClose());
            }}
            icon={true}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TipoCrime;
