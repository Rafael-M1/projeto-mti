import { listaMunicipiosPorEstado } from "../../../../../util/MockData/municipioData";
import { Form } from "react-bootstrap";
import DatePickerComponent from "../../../../../components/Datepicker";
import ButtonIconSmall from "../../../../../components/ButtonIconSmall";
import { useState } from "react";

const EtapaDadosGeraisForm = ({
  atualizarDadosGeraisObj,
  dadosGeraisParamObj,
  modoVisualizar = false,
}) => {
  const listaCidades = listaMunicipiosPorEstado();
  const [dadosGeraisFormObj, setDadosGeraisFormObj] = useState(
    dadosGeraisParamObj
      ? dadosGeraisParamObj
      : {
          municipio: "",
          bairro: "",
          endereco: "",
          numero: "",
          dataOcorrencia: null,
          descricaoGeral: "",
          complemento: "",
        }
  );

  const atualizarDadosGeraisFormObj = (campoForm, value) => {
    let newDadosGeraisFormObj = {
      ...dadosGeraisFormObj,
      [campoForm]: value,
    };
    setDadosGeraisFormObj(newDadosGeraisFormObj);
    atualizarDadosGeraisObj(newDadosGeraisFormObj);
  };

  return (
    <div className="container mt-5">
      <h4>Dados Gerais da Ocorrência</h4>
      <div className="row">
        <div className="col-lg-4">
          <div className="mb-3 mt-5">
            <h6>Município</h6>
            <Form.Select
              className="mt-3"
              disabled={modoVisualizar}
              onChange={(e) =>
                atualizarDadosGeraisFormObj("municipio", e.target.value)
              }
              value={dadosGeraisFormObj.municipio}
            >
              <option value={""}>Selecione o município da ocorrência</option>
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
              value={dadosGeraisFormObj.bairro}
              disabled={modoVisualizar}
              onChange={(e) =>
                atualizarDadosGeraisFormObj("bairro", e.target.value)
              }
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-3 mt-2">
            <h6>Endereço</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Digite o endereço da ocorrência"
              value={dadosGeraisFormObj.endereco}
              disabled={modoVisualizar}
              onChange={(e) =>
                atualizarDadosGeraisFormObj("endereco", e.target.value)
              }
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
              value={dadosGeraisFormObj.numero}
              disabled={modoVisualizar}
              onChange={(e) =>
                atualizarDadosGeraisFormObj("numero", e.target.value)
              }
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-3 mt-2">
            <h6>Complemento</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Digite um complemento de endereço da ocorrência"
              value={dadosGeraisFormObj.complemento}
              disabled={modoVisualizar}
              onChange={(e) =>
                atualizarDadosGeraisFormObj("complemento", e.target.value)
              }
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="mb-3 mt-2">
            <h6>Data da Ocorrência</h6>
            <div className="mt-3">
              <DatePickerComponent
                disabled={modoVisualizar}
                onChangeDate={(date) =>
                  atualizarDadosGeraisFormObj("dataOcorrencia", date)
                }
                selectedDateComponent={dadosGeraisFormObj.dataOcorrencia}
              />
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
                value={dadosGeraisFormObj.descricaoGeral}
                disabled={modoVisualizar}
                onChange={(e) =>
                  atualizarDadosGeraisFormObj("descricaoGeral", e.target.value)
                }
                style={{ width: "100%", height: "150px", resize: "none" }}
              />
            </div>
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  );
};

export default EtapaDadosGeraisForm;
