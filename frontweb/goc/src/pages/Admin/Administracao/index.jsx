import { useNavigate } from "react-router-dom";
import ServicoCard from "../../../components/ServicoCard";

const AdministracaoPage = () => {
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
        <h2 className="card-title text-center">Administração</h2>
        <ServicoCard
          tituloImagem={"Tipo Crime"}
          subTitulo={"Gestão dos Tipos de Crime"}
          descricaoServico={
            "Descrição: Tipos de crimes que estão envolvidos em uma ocorrência criminal."
          }
          onClickButton={() => {
            navigate("/admin/administracao/tipocrime");
          }}
        />
        <ServicoCard
          tituloImagem={"Ocorrências Criminais"}
          subTitulo={"Gestão das Ocorrências Criminais"}
          descricaoServico={"Descrição: ."}
          onClickButton={() => {
            navigate("/admin/administracao/ocorrencias");
          }}
        />
        <ServicoCard
          tituloImagem={"Pessoas"}
          subTitulo={"Gestão de Pessoas"}
          descricaoServico={
            "Descrição: Pessoas que estão envolvidas em ocorrências criminais, podendo ser vítimas, acusados ou operadores do Sistema de Ocorrências Criminais."
          }
          onClickButton={() => {
            navigate("/admin/administracao/pessoas");
          }}
        />
      </div>
    </div>
  );
};

export default AdministracaoPage;
