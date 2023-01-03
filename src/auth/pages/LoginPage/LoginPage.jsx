import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../../shared/hooks";
import "./LoginPage.css";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const signInFormFields = {
  signinName: "",
  signinEmail: "",
  signinPassword: "",
  signinPassword2: "",
};

export const LoginPage = () => {
  const { startLogin, errorMessage, startSignin } = useAuthStore();
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);
  const {
    signinName,
    signinEmail,
    signinPassword,
    signinPassword2,
    onInputChange: onSigninInputChange,
  } = useForm(signInFormFields);

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error", errorMessage, "error");
    }
  }, [errorMessage]);

  const loginSubmit = (e) => {
    e.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const signinSubmite = (e) => {
    e.preventDefault();
    if (signinPassword !== signinPassword2) {
      Swal.fire("Error on Signin", "Passwords are not the same", "error");
      return;
    }
    startSignin({
      name: signinName,
      email: signinEmail,
      password: signinPassword,
    })
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={signinSubmite}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="signinName"
                value={signinName}
                onChange={onSigninInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="signinEmail"
                value={signinEmail}
                onChange={onSigninInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="signinPassword"
                value={signinPassword}
                onChange={onSigninInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="signinPassword2"
                value={signinPassword2}
                onChange={onSigninInputChange}
              />
            </div>

            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
