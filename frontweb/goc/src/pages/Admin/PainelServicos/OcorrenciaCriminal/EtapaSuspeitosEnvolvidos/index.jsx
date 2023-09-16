import ButtonIconSmall from "../../../../../components/ButtonIconSmall";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import uuid from "react-uuid";
import { useMediaQuery } from "react-responsive";
import { requestBackend } from "../../../../../util/requests";

const EtapaSuspeitosEnvolvidosForm = ({}) => {
  const [listaSuspeitosEnvolvidos, setListaSuspeitosEnvolvidos] = useState([
    { id: uuid(), crime: "", descricao: "" },
  ]);
  const is768pxOrLesser = useMediaQuery({ maxWidth: 767 });
  const is500pxOrLesser = useMediaQuery({ maxWidth: 500 });
  const onClickAdicionarSuspeito = () => {
    setListaSuspeitosEnvolvidos((current) => {
      if (current.length < 3) {
        return [...current, { id: uuid(), crime: "", descricao: "" }];
      }
      return current;
    });
  };

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
          <h4>Suspeitos Envolvidos</h4>
          <div className="col-12">
            <ButtonIconSmall
              text={"Adicionar Suspeito"}
              widthPixels={"100%"}
              heightPixels={50}
              icon={false}
              onClick={onClickAdicionarSuspeito}
            />
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-between mt-2">
          <h4>Suspeitos Envolvidos</h4>
          <ButtonIconSmall
            text={"Adicionar Suspeito"}
            widthPixels={300}
            heightPixels={50}
            icon={true}
            onClick={onClickAdicionarSuspeito}
          />
        </div>
      )}
      <div className="row">
        <div className="col-12">
          <div className="mb-1 mt-2">
            <h6>Descrição do Suspeito 1</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Descrição do suspeito envolvido, como: nome, idade, descrição física."
            />
          </div>
        </div>
        {listaSuspeitosEnvolvidos.length > 1 &&
          listaSuspeitosEnvolvidos
            .filter((value, index) => index != 0)
            .map((elemento, index) => {
              return (
                <>
                  <div className="col-12">
                    <hr></hr>
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="mb-1 mt-2">
                      <h6>Descrição do Suspeito {index + 2}</h6>
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Descrição do suspeito envolvido, como: nome, idade, descrição física."
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
                        // widthPixelsButton={"auto"}
                        heightPixels={50}
                        icon={false}
                        onClick={() =>
                          setListaSuspeitosEnvolvidos((current) => {
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
export default EtapaSuspeitosEnvolvidosForm;
