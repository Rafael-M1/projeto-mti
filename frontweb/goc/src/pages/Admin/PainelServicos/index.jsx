import { useNavigate } from "react-router-dom";
import ServicoCard from "../../../components/ServicoCard";

const PainelServicos = () => {
  const navigate = useNavigate();
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
        <h2 className="card-title text-center">Painel de Serviços</h2>
        <ServicoCard
          tituloImagem={"Ocorrência Criminal"}
          subTitulo={"Registrar Ocorrência Criminal"}
          descricaoServico={
            "Descrição: Serviço de registro de ocorrência policial, permitindo a comunicação de crimes e fatos atípicos pela unidade de polícia competente."
          }
          onClickButton={() => navigate("/admin/ocorrencia")}
        />
      </div>
    </div>
  );
};

export default PainelServicos;
