import { useState, useEffect } from "react";
import { ReactComponent as EditIcon } from "./../../../../assets/images/icon-edit.svg";
import ButtonIconSmall from "../../../../components/ButtonIconSmall";
import { requestBackend } from "../../../../util/requests";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const TipoCrime = () => {
  const [tipoCrime, setTipoCrime] = useState([]);
  const [filtroTipoCrime, setFiltroTipoCrime] = useState("");
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
      setTipoCrime(response.data.content);
    });
  }, []);

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
              {tipoCrime.map((tipoCrime) => (
                <tr key={tipoCrime.idCrime}>
                  <th scope="row">{tipoCrime.idCrime}</th>
                  <td>{tipoCrime.descricao}</td>
                  <td>
                    <div style={{display: "flex"}}>
                      <div style={{ cursor: "pointer" }}>
                        <EditIcon />
                      </div>
                      <div style={{ cursor: "pointer", marginLeft: "10px" }}>
                        <EditIcon />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TipoCrime;
