import { listaMunicipiosPorEstado } from "../../../../../util/MockData/municipioData";
import { Form } from "react-bootstrap";
import DatePickerComponent from "../../../../../components/Datepicker";
import ButtonIconSmall from "../../../../../components/ButtonIconSmall";
import { useNavigate } from "react-router-dom";

const EtapaDadosGeraisForm = ({ changeStep }) => {
  const listaCidades = listaMunicipiosPorEstado();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h4>Dados Gerais da Ocorrência</h4>
      <div className="row">
        <div className="col-lg-4">
          <div className="mb-3 mt-5">
            <h6>Município</h6>
            <Form.Select
              className="mt-3"
              onChange={(e) => console.log(e.target.value)}
            >
              <option value={null}>Selecione o município da ocorrência</option>
              {listaCidades.cidades.map((cidade) => (
                <option key={cidade}>{cidade}</option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="mb-3 mt-5">
            <h6>Bairro</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Digite o bairro da ocorrência"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-3 mt-2">
            <h6>Endereço</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Digite o bairro da ocorrência"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-3 mt-2">
            <h6>Número</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Digite o número de endereço da ocorrência"
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="mb-3 mt-2">
            <h6>Data da Ocorrência</h6>
            <div className="mt-3">
              <DatePickerComponent onChangeDate={(date) => console.log(date)} />
            </div>
          </div>
        </div>
        <div className="col-lg-6"></div>
        <div className="col-lg-12">
          <div className="mb-3 mt-2">
            <h6>Descrição Geral</h6>
            <div className="mt-3">
              <textarea
                className="form-control"
                placeholder="Descrição Geral da Ocorrência"
                style={{ width: "100%", height: "150px", resize: "none" }}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <ButtonIconSmall
            text="Cancelar"
            widthPixels={200}
            heightPixels={50}
            onClick={() => navigate("/admin")}
          />
          <ButtonIconSmall
            text={"Próximo"}
            widthPixels={210}
            heightPixels={50}
            icon={true}
            onClick={() => changeStep(1)}
          />
        </div>
      </div>
    </div>
  );
};

export default EtapaDadosGeraisForm;
