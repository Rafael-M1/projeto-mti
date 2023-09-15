import ButtonIconSmall from "../../../../../components/ButtonIconSmall";
import { Form } from "react-bootstrap";
import DatePickerComponent from "../../../../../components/Datepicker";
import { useState } from "react";
import { requestBackend } from "../../../../../util/requests";
import toast, { Toaster } from "react-hot-toast";

const EtapaDadosVitimaForm = ({ changeStep }) => {
  const [isVitimaExistente, setIsVitimaExistente] = useState(false);
  const [vitimaExistenteTexto, setVitimaExistenteTexto] = useState("");
  const [vitimaExistenteFiltro, setVitimaExistenteFiltro] = useState("");

  const serviceOcorrenciaPromise = ({
    pageNumberParam,
    methodParam = "GET",
    urlParam = "/pessoa",
    dataParam,
  }) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        let params = {
          url: urlParam,
          method: methodParam,
          withCredentials: true,
        };
        if (methodParam == "GET" || methodParam != "POST") {
          params.params = {
            page: pageNumberParam ?? 0,
            size: 12,
          };
        }
        if (dataParam) {
          params.data = dataParam;
        }
        requestBackend(params)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      }, 0);
    });
  return (
    <div className="container mt-5">
      <Toaster position="top-right" />
      <h4>Dados da Vítima</h4>
      <div className="row">
        <p>Pessoa já existente?</p>
        <div className="col-2 col-lg-1">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onChange={() => {
                setIsVitimaExistente(true);
              }}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Sim
            </label>
          </div>
        </div>
        <div className="col-2 col-lg-1">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              onChange={() => {
                setIsVitimaExistente(false);
              }}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Não
            </label>
          </div>
        </div>
        {isVitimaExistente && (
          <>
            <div style={{ marginTop: "20px" }} className="row">
              <div className="col-12 col-lg-3 mt-1">
                <input
                  type="text"
                  className="form-control"
                  style={{ height: "50px" }}
                  placeholder="Digite o CPF da vítima"
                  value={vitimaExistenteTexto}
                  onChange={(e) => {
                    if (e.target.value.length > 11) {
                      return;
                    }
                    setVitimaExistenteTexto(
                      e.target.value.replace(/[a-zA-Z]/g, "")
                    );
                  }}
                />
              </div>
              <div className="col-12 col-lg-4 mt-1">
                <ButtonIconSmall
                  text="Buscar Vítima"
                  widthPixels={"100%"}
                  heightPixels={50}
                  onClick={() => {
                    if (vitimaExistenteTexto.trim().length > 0) {
                      serviceOcorrenciaPromise({
                        urlParam: `/pessoa/cpf/${vitimaExistenteTexto}`,
                      })
                        .then((response) => {
                          console.log(response.data);
                          setVitimaExistenteFiltro(vitimaExistenteTexto);
                        })
                        .catch((error) => {
                          toast.error("Usuário não encontrado!");
                          setVitimaExistenteFiltro("");
                        });
                    }
                  }}
                  icon={true}
                />
              </div>
            </div>
            <br></br>
            {vitimaExistenteFiltro && <p>Busca por: {vitimaExistenteFiltro}</p>}
          </>
        )}
        <div className="col-12"></div>
        <div className="col-lg-6">
          <div className="mb-3 mt-4">
            <h6>Nome</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Digite o nome da vítima"
              disabled={isVitimaExistente}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-3 mt-4">
            <h6>CPF</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Digite o CPF da vítima"
              disabled={isVitimaExistente}
            />
          </div>
        </div>
        <div className="col-lg-5 col-xl-4 col-xxl-3">
          <div className="mb-3 mt-2">
            <h6>Data de Nascimento</h6>
            <div className="mt-3">
              <DatePickerComponent
                onChangeDate={(date) => console.log(date)}
                disabled={isVitimaExistente}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3 ">
          <div className="mb-3 mt-2">
            <h6>Sexo</h6>
            <Form.Select
              className="mt-3"
              onChange={(e) => console.log(e.target.value)}
              disabled={isVitimaExistente}
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
              placeholder="Digite o e-mail da vítima"
              disabled={isVitimaExistente}
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
              disabled={isVitimaExistente}
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
              disabled={isVitimaExistente}
            />
          </div>
        </div>
      </div>
      {/* <div className="d-flex justify-content-end">
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
      </div> */}
      <hr></hr>
    </div>
  );
};
export default EtapaDadosVitimaForm;
