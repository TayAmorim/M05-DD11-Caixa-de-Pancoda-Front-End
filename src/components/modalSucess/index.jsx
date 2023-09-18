import { useContext } from "react";
import checkIcon from "../../assets/check-icon.svg";
import { Stack } from "@mui/material";
import "./styles.css";
import { ModalContext } from "../../context/modalContext";

function ModalSucess() {
  const { setSucess } = useContext(ModalContext);
  setTimeout(() => {
    setSucess(false);
  }, 2000);
  return (
    <div className="container-success">
      <div className="box-input">
        <div className="box-sucess box-success">
          <img src={checkIcon} alt="Check Icon" />
          <h1>Cadastro Atualizado com sucesso</h1>
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
        ></Stack>
      </div>
    </div>
  );
}

export default ModalSucess;
