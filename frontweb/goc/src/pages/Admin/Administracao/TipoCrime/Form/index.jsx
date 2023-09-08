import { useState } from "react";
import ButtonIconSmall from "../../../../../components/ButtonIconSmall";
import { requestBackend } from "../../../../../util/requests";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const TipoCrimeForm = () => {
  const [tipoCrime, setTipoCrime] = useState([]);
  const [filtroTipoCrime, setFiltroTipoCrime] = useState("");
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onClickCancelar = () => {
    navigate("/admin/administracao/tipocrime");
  };

  const onSubmit = (data, event) => {
    const params = {
      method: "POST",
      url: "/crime",
      data: {
        descricao: data.descricao,
      },
      withCredentials: true,
    };
    requestBackend(params).then((response) => {
      // toast.success("Cadastrado com sucesso!");
      navigate("/admin/administracao/tipocrime", {
        state: {
          mensagem: { texto: "Cadastrado com sucesso!", tipo: "success" },
        },
      });
    });
  };

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
        <h2 className="card-title text-center">Cadastro - Tipo de Crime</h2>
        <div className="container mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <p>
                <b>Nome do Tipo de Crime</b>
              </p>
              <input
                {...register("descricao", {
                  required: "Campo obrigatório",
                  minLength: {
                    value: 3,
                    message: "Tamanho mínimo de 3 caracteres",
                  },
                })}
                type="text"
                className={`form-control base-input ${
                  errors.descricao ? "is-invalid" : ""
                }`}
                name="descricao"
              />
              <div className="invalid-feedback d-block">
                {errors.descricao?.message}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <ButtonIconSmall
                text="Cancelar"
                widthPixels={220}
                heightPixels={50}
                onClick={onClickCancelar}
              />
              <ButtonIconSmall
                text="Salvar"
                widthPixels={210}
                heightPixels={50}
                icon={true}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TipoCrimeForm;
