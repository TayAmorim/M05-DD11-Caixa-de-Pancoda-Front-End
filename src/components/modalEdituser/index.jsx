import "./index.css";
import { useContext, useState, useEffect } from "react";
import closeIcon from "../../assets/closeIcon.svg";
import { Box, Button, Stack, IconButton } from "@mui/material";
import api from "../../api/api";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputMask from "react-input-mask";
import { AuthContext } from "../../context/myContext.jsx";
import { ModalContext } from "../../context/modalContext";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    top: "8px",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "150",
    padding: "10px 12px",
    top: "10px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function modalEditUser({ setOpenModalEditUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { name, setName, email, setEmail, userData, setUserData } =
    useContext(AuthContext);
  const { OpenModalEditUser, setSucess, sucess } = useContext(ModalContext);

  const [alert, setAlert] = useState();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const userStorage = JSON.parse(localStorage.getItem("user"));

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    if (!name) {
      setAlert("Nome é um campo obrigatório");
      return;
    }
    if (!email) {
      setAlert("Email é um campo obrigatório");
      return;
    }

    if (newPassword) {
      if (!newPassword) {
        setAlert("Senha é um campo obrigátorio");
        return;
      }
      if (!confirmNewPassword) {
        setAlert("Confirmar senha é um campo obrigatório");
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setAlert("As senhas não são compativeis");
        return;
      }
    }

    try {
      const password = newPassword;
      // TODO: trasnformar em regex
      let editedCpf = cpf
        ? cpf.replaceAll(".", "").replaceAll("-", "").replaceAll("_", "")
        : "";
      let phoneClearMask = phone
        ? phone
            .replaceAll("_", "")
            .replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll("-", "")
            .replaceAll(" ", "")
        : "";
      if (cpf.length >= 1 && cpf.length < 11) {
        setAlert("O cpf Precisa ter 11 numeros");
        return;
      }
      if (phone.length >= 1 && phone.length < 11) {
        setAlert("O phone Precisa ter de 10 a 11 numeros");
        return;
      }
      let updateUser;
      if (password) {
        updateUser = {
          name,
          email,
          cpf: editedCpf,
          phone,
          password,
        };
        const userNotPassword = {
          name: updateUser.name,
          email: updateUser.email,
          cpf: updateUser.cpf,
          phone: updateUser.phone,
        };
        localStorage.setItem("user", JSON.stringify(userNotPassword));
      } else {
        updateUser = {
          name,
          email,
          cpf: editedCpf,
          phone,
        };
        localStorage.setItem("user", JSON.stringify(updateUser));
      }

      const response = await api.put(`updateUser`, updateUser);

      if (response.status == 204) {
        setAlert("Usuário atualizado com sucesso!");
        setUserData({ name, email, cpf: editedCpf, phone, password });

        setOpenModalEditUser(false);
        setSucess(true);
      }
    } catch (error) {
      setAlert(String(error.response.data.mensagem));
    }
  };
  useEffect(() => {
    setName(userStorage.name);
    setEmail(userStorage.email);
    setPhone(userStorage.phone ? userStorage.phone : "");
    setCpf(userStorage.cpf);
  }, [OpenModalEditUser, setSucess]);

  return (
    <div className="container-modalEditUser">
      <div className="box-modalEditUser">
        <div className="closeIcon-box">
          <img
            onClick={() => setOpenModalEditUser(false)}
            src={closeIcon}
            alt="Close Icon"
          />
        </div>
        <h1>Edite o seu cadastro</h1>

        <Box
          component="form"
          sx={{
            outline: "red",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "3rem",
            "& > :not(style)": {
              m: 0,
              width: "36.8rem",
              height: "4.4rem",
              position: "relative",
            },
          }}
          autoComplete="off"
          onSubmit={handleUpdateUser}
        >
          <FormControl variant="standard">
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ fontSize: "20px" }}
              type="text"
              required
            >
              Nome
            </InputLabel>
            <BootstrapInput
              defaultValue={name}
              placeholder="Digite o seu nome"
              value={name}
              onChange={(event) => setName(event.target.value)}
              name="name"
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ fontSize: "20px" }}
              type="text"
              required
              name="email"
            >
              Email
            </InputLabel>
            <BootstrapInput
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Digite o seu e-mail"
            />
          </FormControl>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              "& > :not(style)": {
                width: "100%",
                height: "4.4rem",
                position: "relative",
              },
            }}
          >
            <FormControl variant="standard">
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                style={{ fontSize: "20px" }}
              >
                Cpf
              </InputLabel>
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                defaultValue={cpf}
                onChange={(event) => setCpf(event.target.value)}
              >
                {() => (
                  <BootstrapInput
                    defaultValue={cpf}
                    value={cpf}
                    name="cpf"
                    type="tel"
                    placeholder="Digite o seu cpf"
                  />
                )}
              </InputMask>
            </FormControl>

            <FormControl variant="standard">
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                style={{ fontSize: "20px" }}
              >
                Telefone
              </InputLabel>
              <InputMask
                mask="(99) 99999-9999"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              >
                {() => (
                  <BootstrapInput
                    defaultValue={phone}
                    name="phone"
                    type="tel"
                    value={phone}
                    placeholder="Digite o seu telefone"
                  />
                )}
              </InputMask>
            </FormControl>
          </Box>

          <FormControl variant="standard">
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ fontSize: "20px" }}
              type="text"
              required
            >
              Nova senha
            </InputLabel>
            <BootstrapInput
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    value={newPassword}
                    name="newPassword"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{
                      position: "absolute",
                      right: "2rem",
                      top: "3.2rem",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              type={showPassword ? "text" : "password"}
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ fontSize: "20px" }}
              type="text"
              required
            >
              Confirmação senha
            </InputLabel>
            <BootstrapInput
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{
                      position: "absolute",
                      right: "2rem",
                      top: "3.2rem",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={confirmNewPassword}
              name="confirmNewPassword"
              onChange={(event) => setConfirmNewPassword(event.target.value)}
              type={showPassword ? "text" : "password"}
            />
          </FormControl>

          <Stack
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "3rem",
            }}
            direction="row"
            spacing={2}
          >
            <div style={{ marginTop: "1rem" }}>
              <Button
                sx={{
                  width: "16rem",
                  height: "4rem",
                  borderRadius: ".8rem",
                  backgroundColor: "#DA0175",

                  "&:hover": {
                    backgroundColor: "#790342",
                  },
                  fontSize: "1.4rem",
                }}
                variant="contained"
                type="submit"
              >
                Atualizar
              </Button>
            </div>
          </Stack>
        </Box>
        {alert && (
          <span
            style={{
              color: "#DA0175",
              width: "100%",
              left: "2rem",
              marginBlock: "2rem",
            }}
          >
            {alert}
          </span>
        )}
      </div>
    </div>
  );
}
