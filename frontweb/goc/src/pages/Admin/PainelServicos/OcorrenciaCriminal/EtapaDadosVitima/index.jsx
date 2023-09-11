import ButtonIconSmall from "../../../../../components/ButtonIconSmall";
import { Form } from "react-bootstrap";
import DatePickerComponent from "../../../../../components/Datepicker";

const EtapaDadosVitimaForm = ({ changeStep }) => {
  return (
    <div className="container mt-5">
      <h4>Dados da Pessoa</h4>
      {/* <h4>Dados da Vítima</h4> */}
      <div className="row">
        <div className="col-lg-6">
          <div className="mb-3 mt-5">
            <h6>Nome</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Digite o nome da pessoa"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-3 mt-5">
            <h6>CPF</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Digite o CPF da pessoa"
            />
          </div>
        </div>
        <div className="col-lg-5 col-xl-4 col-xxl-3">
          <div className="mb-3 mt-2">
            <h6>Data de Nascimento</h6>
            <div className="mt-3">
              <DatePickerComponent onChangeDate={(date) => console.log(date)} />
            </div>
          </div>
        </div>
        <div className="col-lg-3 ">
          <div className="mb-3 mt-2">
            <h6>Sexo</h6>
            <Form.Select
              className="mt-3"
              onChange={(e) => console.log(e.target.value)}
            >
              {/* <option value={null}>
                  Selecione o município da ocorrência
                </option> */}
              <option value={"M"}>Masculino</option>
              <option value={"F"}>Feminino</option>
            </Form.Select>
          </div>
        </div>
      </div>
      <h4>Contatos da Pessoa</h4>
      <div className="row">
        <div className="col-lg-6">
          <div className="mb-3 mt-5">
            <h6>E-mail</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Digite o e-mail da pessoa"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-3 mt-5">
            <h6>Telefone 1</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="(XX) XXXXX-XXXX"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-3 mt-2">
            <h6>Telefone 2</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="(XX) XXXXX-XXXX"
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <ButtonIconSmall
          text="Voltar"
          widthPixels={200}
          heightPixels={50}
          onClick={() => changeStep(-1)}
        />
        <ButtonIconSmall
          text={"Próximo"}
          widthPixels={210}
          heightPixels={50}
          icon={true}
          onClick={() => {
            changeStep(1);
          }}
        />
      </div>
    </div>
  );
};
export default EtapaDadosVitimaForm;
