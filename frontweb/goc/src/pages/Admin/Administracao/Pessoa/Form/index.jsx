import { useState, useEffect } from "react";
import ButtonIconSmall from "../../../../../components/ButtonIconSmall";
import { requestBackend } from "../../../../../util/requests";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePickerComponent from "../../../../../components/Datepicker";

const PessoaForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [dataNascimentoForm, setDataNascimentoForm] = useState(null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      idPessoa: state && state.pessoa ? state.pessoa.idPessoa : "",
      nome: state && state.pessoa ? state.pessoa.nome : "",
      dataNascimento: state && state.pessoa ? state.pessoa.dataNascimento : "",
      cpf: state && state.pessoa ? state.pessoa.cpf : "",
      email: state && state.pessoa ? state.pessoa.email : "",
      sexo: state && state.pessoa ? state.pessoa.sexo : "",
      telefone1: state && state.pessoa ? state.pessoa.telefone1 : "",
      telefone2: state && state.pessoa ? state.pessoa.telefone2 : "",
    },
  });
  const onClickCancelar = () => {
    navigate("/goc/admin/administracao/pessoa");
  };

  const onSubmit = (data, event) => {
    if (isEditMode) {
      const params = {
        method: "PUT",
        url: `/pessoa/${data.idPessoa}`,
        data: {
          idPessoa: data.idPessoa,
          dataNascimento: data.dataNascimento,
          nome: data.nome,
          cpf: data.cpf,
          email: data.email,
          sexo: data.sexo,
          telefone1: data.telefone1,
          telefone2: data.telefone2,
        },
        withCredentials: true,
      };
      requestBackend(params).then((response) => {
        navigate("/goc/admin/administracao/pessoa", {
          state: {
            mensagem: { texto: "Alterado com sucesso!", tipo: "success" },
          },
        });
      });
    } else {
      const params = {
        method: "POST",
        url: "/pessoa",
        data: {
          idPessoa: null,
          dataNascimento: data.dataNascimento,
          nome: data.nome,
          cpf: data.cpf,
          email: data.email,
          sexo: data.sexo,
          telefone1: data.telefone1,
          telefone2: data.telefone2,
        },
        withCredentials: true,
      };
      requestBackend(params).then((response) => {
        navigate("/goc/admin/administracao/pessoa", {
          state: {
            mensagem: { texto: "Cadastrado com sucesso!", tipo: "success" },
          },
        });
      });
    }
  };

  useEffect(() => {
    if (state != null && state.pessoa != null) {
      setIsEditMode(true);
      setDataNascimentoForm(new Date(state.pessoa.dataNascimento));
    }
  }, []);

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
        <h2 className="card-title text-center">Cadastro - Pessoa</h2>
        <div className="container mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="mb-4">
                <input
                  readOnly
                  {...register("idPessoa")}
                  type="hidden"
                  className={`form-control base-input`}
                  name="idPessoa"
                />
              </div>
              <div className="mb-4">
                <p>
                  <b>Nome da Pessoa</b>
                </p>
                <input
                  {...register("nome", {
                    required: "Campo obrigatório",
                    minLength: {
                      value: 3,
                      message: "Tamanho mínimo de 3 caracteres",
                    },
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.nome ? "is-invalid" : ""
                  }`}
                  name="nome"
                />
                <div className="invalid-feedback d-block">
                  {errors.nome?.message}
                </div>
              </div>
              <div className="mb-4 col-6">
                <p>
                  <b>Data de Nascimento</b>
                </p>
                <DatePickerComponent
                  onChangeDate={(date) => {
                    setValue("dataNascimento", date);
                    setDataNascimentoForm(date);
                  }}
                  name="dataNascimento"
                  error={errors.dataNascimento}
                  selectedDateComponent={dataNascimentoForm}
                  {...register("dataNascimento", {
                    required: "Campo obrigatório",
                  })}
                />
                <div className="invalid-feedback d-block">
                  {errors.dataNascimento?.message}
                </div>
              </div>
              <div className="mb-4 col-6">
                <p>
                  <b>CPF</b>
                </p>
                <input
                  {...register("cpf", {
                    required: "Campo obrigatório",
                    pattern: {
                      value: /[\d]{11}/,
                      message:
                        "Somente números com 11 caracteres, sem pontuação",
                    },
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.cpf ? "is-invalid" : ""
                  }`}
                  disabled={isEditMode}
                  name="cpf"
                />
                <div className="invalid-feedback d-block">
                  {errors.cpf?.message}
                </div>
              </div>
              <div className="mb-4 col-6">
                <p>
                  <b>E-mail</b>
                </p>
                <input
                  {...register("email", {
                    required: "Campo obrigatório",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "E-mail inválido.",
                    },
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  name="email"
                />
                <div className="invalid-feedback d-block">
                  {errors.email?.message}
                </div>
              </div>
              <div className="mb-4 col-6">
                <p>
                  <b>Sexo</b>
                </p>
                <select
                  className={`mt-3 form-select ${
                    errors.sexo ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setValue("sexo", e.target.value)}
                  name="sexo"
                  {...register("sexo", { required: "Campo obrigatório" })}
                >
                  <option value={""}>Selecione o sexo da Pessoa</option>
                  <option value={"M"}>Masculino</option>
                  <option value={"F"}>Feminino</option>
                </select>
                <div className={`invalid-feedback d-block`}>
                  {errors.sexo?.message}
                </div>
              </div>
              <div className="mb-4 col-6">
                <p>
                  <b>Telefone 1</b>
                </p>
                <input
                  {...register("telefone1", {
                    required: "Campo obrigatório",
                    minLength: {
                      value: 9,
                      message: "Telefone inválido",
                    },
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.telefone1 ? "is-invalid" : ""
                  }`}
                  name="telefone1"
                />
                <div className="invalid-feedback d-block">
                  {errors.telefone1?.message}
                </div>
              </div>
              <div className="mb-4 col-6">
                <p>
                  <b>Telefone 2</b>
                </p>
                <input
                  {...register("telefone2", {
                    // required: "Campo obrigatório",
                    minLength: {
                      value: 9,
                      message: "Telefone inválido",
                    },
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.telefone2 ? "is-invalid" : ""
                  }`}
                  name="telefone2"
                />
                <div className="invalid-feedback d-block">
                  {errors.telefone2?.message}
                </div>
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
                text={isEditMode ? "Alterar" : "Salvar"}
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

export default PessoaForm;
