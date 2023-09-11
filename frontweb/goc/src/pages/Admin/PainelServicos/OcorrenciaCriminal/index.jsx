import { useState, forwardRef } from "react";
import { Form } from "react-bootstrap";
import { listaMunicipiosPorEstado } from "../../../../util/MockData/municipioData";
import DatePickerComponent from "../../../../components/Datepicker";

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
              <div className="mb-3 mt-5">
                <h6>Município</h6>
                <Form.Select
                  className="mt-3"
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
            <div className="col-8">
              <div className="mb-3 mt-5">
                <h6>Bairro</h6>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Digite o bairro da ocorrência"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3 mt-2">
                <h6>Endereço</h6>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Digite o bairro da ocorrência"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3 mt-2">
                <h6>Número</h6>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Digite o número de endereço da ocorrência"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3 mt-2">
                <h6>Data da Ocorrência</h6>
                <div className="mt-3">
                  <DatePickerComponent
                    onChangeDate={(date) => console.log(date)}
                    width="250px"
                  />
                </div>
              </div>
            </div>
            <div className="col-6"></div>
            <div className="col-12">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OcorrenciaCriminalForm;
