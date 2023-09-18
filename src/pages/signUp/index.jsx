import "./index.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import SignUpComponents from "../../components/SignUp/SignUp";
import SignUpComponentPassword from "../../components/SignUp/SignUpPassword";
import whiteCircle from "../../assets/whiteCircle.png";
import greenCircle from "../../assets/greenCircle.png";
import checkIcon from "../../assets/check-icon.svg";
import bar from "../../assets/bar.png";
import { AuthProvider } from "../../context/myContext";

export default function SignUp() {
  const navigate = useNavigate();
  const [sucess, setSucess] = useState(false);
  const [pagePassword, setPagePassword] = useState(false);

  return (
    <div className="container-signUp">
      <div className="status-box">
        <div className="status">
          <img
            src={greenCircle}
            className="circle-status"
            alt="Icon status active"
            onClick={() => {
              setSucess(false), setPagePassword(false);
            }}
          />
          <img src={bar} className="bar" alt="Bar Icon" />
          <img
            src={pagePassword ? greenCircle : whiteCircle}
            className="circle-status"
            alt="Icon status inactive"
          />
          <img src={bar} className="bar" alt="Bar Icon" />
          <img
            src={sucess ? greenCircle : whiteCircle}
            className="circle-status"
            alt="Icon status inactive"
          />
        </div>
        <div className="title-status">
          <h3>Cadastre-se</h3>
          <span>Por favor, informe seu nome e email</span>
          <h3>Escolha sua senha</h3>
          <span>Por favor, escolhe sua senha</span>
          <h3>Pronto!</h3>
          <span>Cadastro realizado com sucesso</span>
        </div>
      </div>
      <div className="login-area-signUp">
        {!pagePassword ? (
          <>
            <div className="box-inputs-signUp">
              <h1>Adicione seus dados</h1>
              <AuthProvider>
                <SignUpComponents setPagePassword={setPagePassword} />
              </AuthProvider>
            </div>
            <div className="status-bar">
              <div className=" status-bar-div active" />
              <div className="status-bar-div" />
              <div className="status-bar-div" />
            </div>
          </>
        ) : !sucess ? (
          <>
            <div className="box-inputs-signUp">
              <h1>Escolha sua senha</h1>
              <AuthProvider>
                <SignUpComponentPassword setSucess={setSucess} />
              </AuthProvider>
            </div>

            <div className="status-bar">
              <div className=" status-bar-div active" />
              <div className="status-bar-div active" />
              <div className="status-bar-div" />
            </div>
          </>
        ) : (
          <>
            <div className="box-inputs">
              <div className="box-sucess">
                <img src={checkIcon} alt="Check Icon" />
                <h1>Cadastro Realizado com sucesso</h1>
              </div>

              <Stack
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "4rem",
                }}
                direction="row"
                spacing={2}
              >
                <Button
                  sx={{
                    width: "20rem",
                    height: "4.4rem",
                    borderRadius: ".8rem",
                    backgroundColor: "#DA0175",
                    "&:hover": {
                      backgroundColor: "#790342",
                    },
                    fontSize: "1.4rem",
                  }}
                  variant="contained"
                  onClick={() => navigate("/")}
                  type="button"
                >
                  Ir para Login
                </Button>
              </Stack>
            </div>
            <div className="status-bar">
              <div className=" status-bar-div active" />
              <div className="status-bar-div active" />
              <div className="status-bar-div active" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
