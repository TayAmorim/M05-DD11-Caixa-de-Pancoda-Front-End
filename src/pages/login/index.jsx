import "./index.css";

import FormLogin from "../../components/Login/loginMUI";

export default function login() {
  return (
    <div className="container-login">
      <div className="left-login-box">
        <h3>Gerencie todos os pagamentos da sua empresa em um só lugar.</h3>
      </div>
      <div className="login-area">
        <div className="box-inputs">
          <h1>Faça seu login</h1>
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
