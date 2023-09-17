import ButtonIconSmall from "../../../../../components/ButtonIconSmall";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { useMediaQuery } from "react-responsive";
import { requestBackend } from "../../../../../util/requests";

const EtapaCrimesEnvolvidosForm = ({}) => {
  const [listaCrimesOpcoes, setListaCrimesOpcoes] = useState(null);
  const [listaCrimesEnvolvidos, setListaCrimesEnvolvidos] = useState([
    { id: uuid(), crime: "", descricaoAdicional: "" },
  ]);
  const is768pxOrLesser = useMediaQuery({ maxWidth: 767 });
  const is500pxOrLesser = useMediaQuery({ maxWidth: 500 });
  const onClickAdicionarCrime = () => {
    if (listaCrimesEnvolvidos.length < 3) {
      setListaCrimesEnvolvidos([
        ...listaCrimesEnvolvidos,
        { id: uuid(), crime: "", descricaoAdicional: "" },
      ]);
    }
  };
  useEffect(() => {
    serviceCrimePromise({ urlParam: "/crime/ativos/lista" })
      .then((response) => setListaCrimesOpcoes(response.data))
      .catch((error) => console.log(error));
  }, []);

  const serviceCrimePromise = ({
    pageNumberParam,
    methodParam = "GET",
    urlParam = "/crime",
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
  const handleChange = (value, index, atributo) => {
    const novaListaCrimesEnvolvidos = [...listaCrimesEnvolvidos];
    novaListaCrimesEnvolvidos[index][atributo] = value;
    setListaCrimesEnvolvidos(novaListaCrimesEnvolvidos);
  };
  return (
    <div className="container mt-4">
      {is500pxOrLesser ? (
        <div className="row mt-2">
          <h4>Crimes Envolvidos</h4>
          <div className="col-12">
            <ButtonIconSmall
              text={"Adicionar Crime"}
              widthPixels={"100%"}
              heightPixels={50}
              icon={false}
              onClick={onClickAdicionarCrime}
            />
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-between mt-2">
          <h4>Crimes Envolvidos</h4>
          <div style={{ width: "300px" }}>
            <ButtonIconSmall
              text={"Adicionar Crime"}
              widthPixels={"100%"}
              heightPixels={50}
              icon={true}
              onClick={onClickAdicionarCrime}
            />
          </div>
        </div>
      )}
      <div className="row">
        {listaCrimesEnvolvidos.map((elemento, index) => {
          return (
            <div key={elemento.id} className="row">
              {index != 0 && (
                <div className="col-12">
                  <hr></hr>
                </div>
              )}
              <div className="col-12 col-md-6">
                <div className="mb-3 mt-2">
                  <h6>Crime {index + 1}</h6>
                  <Form.Select
                    className="mt-3"
                    onChange={(e) =>
                      handleChange(e.target.value, index, "crime")
                    }
                    value={elemento.crime}
                  >
                    <option value={""}>
                      Selecione o crime {index + 1} envolvido
                    </option>
                    {listaCrimesOpcoes?.map((crimeOpcao) => (
                      <option
                        key={crimeOpcao.idCrime}
                        value={crimeOpcao.idCrime}
                      >
                        {crimeOpcao.descricao}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
              <div className="col-12"></div>
              <div className="col-12 col-md-9">
                <div className="mb-1 mt-2">
                  <h6>Descrição adicional do Crime {index + 1}</h6>
                  <input
                    type="text"
                    className="form-control mt-3"
                    placeholder="Descrição adicional do crime envolvido"
                    value={elemento.descricaoAdicional}
                    onChange={(e) =>
                      handleChange(e.target.value, index, "descricaoAdicional")
                    }
                  />
                </div>
              </div>
              {index != 0 && (
                <div className="col-12 col-md-3">
                  <div
                    className={`d-flex  mt-4 ${
                      is768pxOrLesser
                        ? "justify-content-start"
                        : "justify-content-end"
                    }`}
                  >
                    <ButtonIconSmall
                      text={"Excluir"}
                      widthPixels={"100%"}
                      heightPixels={50}
                      icon={false}
                      onClick={() =>
                        setListaCrimesEnvolvidos((current) =>
                          current.filter(
                            (elementoArray) => elementoArray.id != elemento.id
                          )
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <hr></hr>
    </div>
  );
};
export default EtapaCrimesEnvolvidosForm;
