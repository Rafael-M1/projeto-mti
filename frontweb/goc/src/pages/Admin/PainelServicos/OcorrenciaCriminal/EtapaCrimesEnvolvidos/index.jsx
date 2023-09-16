import ButtonIconSmall from "../../../../../components/ButtonIconSmall";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { useMediaQuery } from "react-responsive";
import { requestBackend } from "../../../../../util/requests";

const EtapaCrimesEnvolvidosForm = ({}) => {
  const [listaCrimesOpcoes, setListaCrimesOpcoes] = useState(null);
  const [listaCrimesEnvolvidos, setListaCrimesEnvolvidos] = useState([
    { id: 1, crime: "", descricaoAdicional: "" },
  ]);
  const is768pxOrLesser = useMediaQuery({ maxWidth: 767 });
  const is500pxOrLesser = useMediaQuery({ maxWidth: 500 });
  const onClickAdicionarCrime = () => {
    setListaCrimesEnvolvidos((current) => {
      if (current && current.length < 3) {
        return [...current, { id: uuid(), crime: "", descricaoAdicional: "" }];
      }
      return current;
    });
  };
  console.log(listaCrimesEnvolvidos);
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
        <div className="col-12 col-md-6">
          <div className="mb-3 mt-4">
            <h6>Crime 1</h6>
            <Form.Select
              className="mt-3"
              onChange={(e) => {
                // console.log(e.target.value);
                setListaCrimesEnvolvidos((current) => {
                  console.log(current);
                  return current;
                });
              }}
              value={
                listaCrimesEnvolvidos != null
                  ? listaCrimesEnvolvidos[0].crime
                  : null
              }
            >
              <option value={""}>Selecione o crime 1 envolvido</option>
              {listaCrimesOpcoes?.map((crimeOpcao) => (
                <option key={crimeOpcao.idCrime} value={crimeOpcao.idCrime}>
                  {crimeOpcao.descricao}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className="col-12 col-md-9">
          <div className="mb-1 mt-2">
            <h6>Descrição adicional do Crime 1</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Descrição adicional do crime envolvido"
              value={listaCrimesEnvolvidos[0].descricaoAdicional}
              onChange={(e) => {
                if (
                  listaCrimesEnvolvidos != null &&
                  listaCrimesEnvolvidos[0] != null
                ) {
                  setListaCrimesEnvolvidos((previousState) => {
                    console.log(previousState);
                    return {
                      ...previousState,
                      [previousState[0].descricaoAdicional]: e.target.value,
                    };
                  });
                }
              }}
            />
          </div>
        </div>
        {listaCrimesEnvolvidos?.length > 1 &&
          listaCrimesEnvolvidos
            .filter((value, index) => index != 0)
            .map((elemento, index) => {
              return (
                <>
                  <div className="col-12">
                    <hr></hr>
                    {elemento.id}
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="mb-3 mt-2">
                      <h6>Crime {index + 2}</h6>
                      <Form.Select
                        className="mt-3"
                        onChange={(e) => console.log(e.target.value)}
                      >
                        <option value={""}>
                          Selecione o crime {index + 2} envolvido
                        </option>
                        {listaCrimesOpcoes?.map((crimeOpcao) => (
                          <option
                            key={crimeOpcao.idCrime}
                            value={crimeOpcao.idCrime}
                          >
                            {crimeOpcao.descricao}
                          </option>
                        ))}
                        <option value={"M"}>Crime A</option>
                        <option value={"F"}>Crime B</option>
                      </Form.Select>
                    </div>
                  </div>
                  <div className="col-12"></div>
                  <div className="col-12 col-md-9">
                    <div className="mb-1 mt-2">
                      <h6>Descrição adicional do Crime {index + 2}</h6>
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Descrição adicional do crime envolvido"
                        onChange={(e) => {
                          setListaCrimesEnvolvidos((previousStateList) => {
                            let newElement = previousStateList.filter(
                              (previousStateElement) =>
                                previousStateElement.id == elemento.id
                            )[0];
                            newElement.descricaoAdicional = e.target.value;
                            let indexElement =
                              previousStateList.indexOf(newElement);
                            const newArray = previousStateList;
                            newArray[indexElement] = newElement;
                            return newArray;
                          });
                        }}
                      />
                    </div>
                  </div>
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
                          setListaCrimesEnvolvidos((current) => {
                            let newArray = current.filter(
                              (elementoArray) => elementoArray.id != elemento.id
                            );
                            return newArray;
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              );
            })}
      </div>
      <hr></hr>
    </div>
  );
};
export default EtapaCrimesEnvolvidosForm;
