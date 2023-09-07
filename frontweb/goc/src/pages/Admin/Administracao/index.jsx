import ServicoCard from "./ServicoCard";

const AdministracaoPage = () => {
  return (
    <div
      class="card"
      style={{
        boxShadow: "3px 4px 19px -1px rgba(0,0,0,0.75)",
        background: "#fff",
        height: "100%",
        margin: "5px 25px",
      }}
    >
      <div class="card-body">
        <h2 class="card-title text-center">Administração</h2>
        <ServicoCard
          tituloImagem={"Tipo Crime"}
          subTitulo={"Gestão dos Tipos de Crime"}
          descricaoServico={
            "Descrição: Tipos de crimes que estão envolvidos em uma ocorrência criminal."
          }
          onClickButton={() => {
            console.log("aa");
          }}
        />
        <ServicoCard
          tituloImagem={"Ocorrências Criminais"}
          subTitulo={"Gestão das Ocorrências Criminais"}
          descricaoServico={
            "Descrição: ."
          }
          onClickButton={() => {
            console.log("aa");
          }}
        />
        <ServicoCard
          tituloImagem={"Pessoas"}
          subTitulo={"Gestão de Pessoas"}
          descricaoServico={
            "Descrição: Pessoas que estão envolvidas em ocorrências criminais, podendo ser vítimas, acusados ou operadores do Sistema de Ocorrências Criminais."
          }
          onClickButton={() => {
            console.log("aa");
          }}
        />
      </div>
    </div>
  );
};

export default AdministracaoPage;
