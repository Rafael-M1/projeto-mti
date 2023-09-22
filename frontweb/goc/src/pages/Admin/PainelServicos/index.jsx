import { useLocation, useNavigate } from "react-router-dom";
import ServicoCard from "../../../components/ServicoCard";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const PainelServicos = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (state != null && state.mensagem != null) {
      if (state.mensagem.tipo == "success") {
        toast.success(state.mensagem.texto);
        navigate(location.pathname, { replace: true });
      }
    }
  }, []);
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
        <Toaster position="top-right" />
        <h2 className="card-title text-center">Painel de Serviços</h2>
        <ServicoCard
          tituloImagem={"Ocorrência Criminal"}
          subTitulo={"Registrar Ocorrência Criminal"}
          descricaoServico={
            "Descrição: Serviço de registro de ocorrência policial, permitindo a comunicação de crimes e fatos atípicos pela unidade de polícia competente."
          }
          onClickButton={() => navigate("/goc/admin/ocorrencia")}
        />
      </div>
    </div>
  );
};

export default PainelServicos;
