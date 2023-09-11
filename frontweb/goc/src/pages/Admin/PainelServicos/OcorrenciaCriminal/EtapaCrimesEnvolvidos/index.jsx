import ButtonIconSmall from "../../../../../components/ButtonIconSmall";
import { Form } from "react-bootstrap";
import { useState } from "react";
import uuid from "react-uuid";

const EtapaCrimesEnvolvidosForm = ({ changeStep }) => {
  const [listaCrimesEnvolvidos, setListaCrimesEnvolvidos] = useState([
    { id: uuid(), crime: "", descricao: "" },
  ]);
  const onClickAdicionarCrime = () => {
    setListaCrimesEnvolvidos((current) => {
      if (current.length < 3) {
        return [...current, { id: uuid(), crime: "", descricao: "" }];
      }
      return current;
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mt-2">
        <h4>Crimes Envolvidos</h4>
        <ButtonIconSmall
          // text={"Adicionar Crime"}
          text={"Adicionar "}
          widthPixels={300}
          heightPixels={50}
          icon={false}
          onClick={onClickAdicionarCrime}
        />
      </div>
      <div className="row">
        <div className="col-6">
          <div className="mb-3 mt-4">
            <h6>Crime 1</h6>
            <Form.Select
              className="mt-3"
              onChange={(e) => console.log(e.target.value)}
            >
              <option value={null}>Selecione o crime 1 envolvido</option>
              <option value={"M"}>Crime A</option>
              <option value={"F"}>Crime B</option>
            </Form.Select>
          </div>
        </div>
        <div className="col-9">
          <div className="mb-1 mt-2">
            <h6>Descrição adicional do Crime 1</h6>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Descrição adicional do crime envolvido"
            />
          </div>
        </div>
        {listaCrimesEnvolvidos.length > 1 &&
          listaCrimesEnvolvidos
            .filter((value, index) => index != 0)
            .map((elemento, index) => {
              return (
                <>
                  <div className="col-12">
                    <hr></hr>
                  </div>
                  <div className="col-6">
                    <div className="mb-3 mt-2">
                      <h6>Crime {index + 2}</h6>
                      <Form.Select
                        className="mt-3"
                        onChange={(e) => console.log(e.target.value)}
                      >
                        <option value={null}>
                          Selecione o crime {index + 2} envolvido
                        </option>
                        <option value={"M"}>Crime A</option>
                        <option value={"F"}>Crime B</option>
                      </Form.Select>
                    </div>
                  </div>
                  <div className="col-12"></div>
                  <div className="col-9">
                    <div className="mb-1 mt-2">
                      <h6>Descrição adicional do Crime {index + 2}</h6>
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Descrição adicional do crime envolvido"
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="d-flex justify-content-end mt-4">
                      <ButtonIconSmall
                        text={"Excluir"}
                        widthPixels={220}
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
      <div className="d-flex justify-content-end mt-4">
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
          // onClick={() => changeStep(1)}
        />
      </div>
    </div>
  );
};
export default EtapaCrimesEnvolvidosForm;
