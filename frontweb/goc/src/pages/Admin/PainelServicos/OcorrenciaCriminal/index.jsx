import { Form } from "react-bootstrap";
import { listaMunicipiosPorEstado } from "../../../../util/MockData/municipioData";

const OcorrenciaCriminalForm = () => {
  const listaCidades = listaMunicipiosPorEstado();
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
          Formulário Ocorrência Policial
        </h2>
        <div className="container mt-5">
          <h4>Dados Gerais da Ocorrência</h4>
          <div className="row">
            <div className="col-4">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              >
                <option value={null}>
                  Selecione o município da ocorrência
                </option>
                {listaCidades.cidades.map((cidade) => (
                  <option key={cidade}>{cidade}</option>
                ))}
              </Form.Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OcorrenciaCriminalForm;
