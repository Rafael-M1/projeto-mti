import { Link, useNavigate, useLocation, redirect } from "react-router-dom";
import ButtonIcon from "./../../../../components/ButtonIcon";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { requestBackendLogin } from "../../../../util/requests";
import toast, { Toaster } from "react-hot-toast";
import { saveAuthData } from "../../../../util/storage";

import "./styles.css";

const Login = () => {
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/admin" } };

  // const { setAuthContextData } = useContext(null);
  // const { setAuthContextData } = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (formData) => {
    requestBackendLogin(formData)
      .then((response) => {
        console.log(response);
        saveAuthData(response.data);
        setHasError(false);
        // setAuthContextData({
        //   authenticated: true,
        //   tokenData: getTokenData(),
        // });
        setHasError(false);
        navigate("/admin");
      })
      .catch((error) => {
        toast.error("Credenciais inválidas");
        setHasError(true);
        console.log("ERRO", error);
      });
  };

  return (
    <div className="base-card login-card">
      <Toaster position="top-right" />
      <h1>
        <b>LOGIN</b>
      </h1>
      {hasError && (
        <div className="alert alert-danger">Erro ao tentar efetuar o login</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <p>
            <b>CPF</b>
          </p>
          <input
            {...register("username", {
              required: "Campo obrigatório",
              // pattern: {
              //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              //   message: "Email inválido",
              // },
            })}
            type="text"
            className={`form-control base-input ${
              errors.username ? "is-invalid" : ""
            }`}
            placeholder="Digite seu CPF"
            name="username"
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-2">
          <p>
            <b>Senha</b>
          </p>
          <input
            {...register("password", {
              required: "Campo obrigatório",
            })}
            type="password"
            className={`form-control base-input ${
              errors.password ? "is-invalid" : ""
            }`}
            placeholder="Digite sua Senha"
            name="password"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>
        <Link to="/admin/auth/recover" className="login-link-recover">
          Esqueci a senha
        </Link>
        <div className="login-submit">
          <ButtonIcon text="Fazer login" />
        </div>
        <div className="signup-container">
          <span className="not-registered">Não tem Cadastro?</span>
          <Link to="/admin/auth/register" className="login-link-register">
            CADASTRAR
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
