import { useMediaQuery } from "react-responsive";

const DashboardPage = () => {
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
        <h2 className="card-title text-center">Dashboard</h2>
        <div className="container mt-5">Conteudo</div>
      </div>
    </div>
  );
};

export default DashboardPage;
