import { useState, useEffect } from "react";
import { EditIcon } from "../../../../assets/images/icon-edit";
import { DeleteIcon } from "../../../../assets/images/icon-delete";
import ButtonIconSmall from "../../../../components/ButtonIconSmall";
import { requestBackend } from "../../../../util/requests";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";

const TipoCrime = () => {
  const [listaTipoCrime, setListaTipoCrime] = useState([]);
  const [filtroTipoCrime, setFiltroTipoCrime] = useState("");
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [tipoCrimeSelecionado, setTipoCrimeSelecionado] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state != null && state.mensagem != null) {
      if (state.mensagem.tipo == "success") {
        toast.success(state.mensagem.texto);
        navigate(location.pathname, { replace: true });
      }
    }
    const params = {
      url: "/crime",
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };
    requestBackend(params).then((response) => {
      setListaTipoCrime(response.data.content);
    });
  }, []);
  const handleClose = () => setShowModalExcluir(false);
  const onClickFiltrar = () => {
    const params = {
      method: "POST",
      url: "/crime/descricao",
      withCredentials: true,
      data: {
        descricao: filtroTipoCrime,
      },
      params: {
        page: 0,
        size: 12,
      },
    };
    requestBackend(params).then((response) => {
      setTipoCrime(response.data.content);
    });
  };
  const onClickExcluir = (tipoCrime) => {
    setTipoCrimeSelecionado(tipoCrime);
    setShowModalExcluir(true);
  };

  const onClickEditar = (idCrime) => {
    console.log("idCrime editar clicado " + idCrime);
  };
  const onClickAdicionar = () => {
    navigate("/admin/administracao/tipocrime/form");
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
        <h2 className="card-title text-center">
          Administração - Tipos de Crimes
        </h2>
        <Toaster position="top-right" />
        <div className="container mt-5">
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
                onChange={(e) => setFiltroTipoCrime(e.target.value)}
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
          <table className="table table-light table-hover mt-4">
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Tipo de Crime</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaTipoCrime.map((tipoCrime) => (
                <tr key={tipoCrime.idCrime}>
                  <th scope="row">{tipoCrime.idCrime}</th>
                  <td>{tipoCrime.descricao}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-top">Editar</Tooltip>}
                      >
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => onClickEditar(tipoCrime.idCrime)}
                        >
                          <EditIcon />
                        </div>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-top">Excluir</Tooltip>}
                      >
                        <div
                          style={{ cursor: "pointer", marginLeft: "10px" }}
                          onClick={() => onClickExcluir(tipoCrime)}
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
        </div>
      </div>
      <Modal show={showModalExcluir} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h6>Deseja realmente excluir o Tipo de Crime?</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Nome: ${tipoCrimeSelecionado?.descricao}`}</Modal.Body>
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
              const params = {
                method: "DELETE",
                url: `/crime/${tipoCrimeSelecionado.idCrime}`,
                withCredentials: true,
              };
              requestBackend(params)
                .then((response) => {
                  requestBackend({
                    url: "/crime",
                    withCredentials: true,
                    params: {
                      page: 0,
                      size: 12,
                    },
                  })
                    .then((response) => {
                      setListaTipoCrime(response.data.content);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .finally(handleClose());
            }}
            icon={true}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TipoCrime;
