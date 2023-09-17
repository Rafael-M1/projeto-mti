import ButtonIconSmall from "../../../../../components/ButtonIconSmall";
import { useState } from "react";
import uuid from "react-uuid";
import { useMediaQuery } from "react-responsive";
const EtapaSuspeitosEnvolvidosForm = ({atualizarSuspeitosEnvolvidosObj}) => {
  const [listaSuspeitosEnvolvidos, setListaSuspeitosEnvolvidos] = useState([
    { id: uuid(), descricaoSuspeito: "" },
  ]);
  const is768pxOrLesser = useMediaQuery({ maxWidth: 767 });
  const is500pxOrLesser = useMediaQuery({ maxWidth: 500 });
  const onClickAdicionarSuspeito = () => {
    setListaSuspeitosEnvolvidos((current) => {
      if (current.length < 3) {
        return [...current, { id: uuid(), descricaoSuspeito: "" }];
      }
      return current;
    });
  };
  const handleChange = (value, index, atributo) => {
    const novaListaSuspeitosEnvolvidos = [...listaSuspeitosEnvolvidos];
    novaListaSuspeitosEnvolvidos[index][atributo] = value;
    setListaSuspeitosEnvolvidos(novaListaSuspeitosEnvolvidos);
    atualizarSuspeitosEnvolvidosObj(novaListaSuspeitosEnvolvidos);
  };
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
        {listaSuspeitosEnvolvidos.map((elemento, index) => {
          return (
            <div key={elemento.id} className="row">
              {index != 0 && (
                <div className="col-12">
                  <hr></hr>
                </div>
              )}
              <div className="col-12 col-md-8">
                <div className="mb-1 mt-2">
                  <h6>Descrição do Suspeito {index + 1}</h6>
                  <input
                    type="text"
                    className="form-control mt-3"
                    placeholder="Descrição do suspeito envolvido, como: nome, idade, descrição física."
                    value={elemento.descricaoSuspeito}
                    onChange={(e) =>
                      handleChange(e.target.value, index, "descricaoSuspeito")
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
              )}
            </div>
          );
        })}
      </div>
      <hr></hr>
    </div>
  );
};
export default EtapaSuspeitosEnvolvidosForm;
