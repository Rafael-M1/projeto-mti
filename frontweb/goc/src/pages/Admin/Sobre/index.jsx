import { useMediaQuery } from "react-responsive";

const SobrePage = () => {
  const is768pxOrLesser = useMediaQuery({ maxWidth: 767 });
  const cardStyle = () => {
    if (is768pxOrLesser) {
      return {
        boxShadow: "3px 4px 19px -1px rgba(0,0,0,0.75)",
        background: "#fff",
        height: "100%",
      };
    } else {
      return {
        boxShadow: "3px 4px 19px -1px rgba(0,0,0,0.75)",
        background: "#fff",
        height: "100%",
        margin: "5px 25px",
      };
    }
  };

  return (
    <div className="card" style={cardStyle()}>
      <div className="card-body">
        <h2 className="card-title text-center">Sobre</h2>
        <div className="container mt-5">
          <h4>Tema do Projeto: Gestão de Ocorrências Criminais - FICDEV</h4>
          <h5 className="mt-5">Autor: Rafael Muzzi da Silva</h5>
          <h5 className="mt-3">Contatos:</h5>
          <h5>E-mail:</h5> <p>rafael.muzzi2@gmail.com</p>
          <h5>E-Github:</h5> <p>rafael-m1</p>
        </div>
      </div>
    </div>
  );
};

export default SobrePage;
