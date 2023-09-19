import "./style.css";
import closeIcon from "../../assets/closeIcon.svg";
import clientsIcon from "../../assets/clients.svg";
import { Box, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import api from "../../api/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function modalEditCustomer({ setOpenModalCustomer }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [cep, setCep] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [alertName, setAlertName] = useState("");
  const [alertEmail, setAlertEmail] = useState("");
  const [alertCpf, setAlertCpf] = useState("");
  const [alertPhone, setAlertPhone] = useState("");
  const [alertCep, setAlertCep] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      return setAlertName("Este campo deve ser preenchido");
    }
    if (!email) {
      return setAlertEmail("Este campo deve ser preenchido");
    }
    if (!cpf) {
      return setAlertCpf("Campo obrigatório");
    }
    if (!phone) {
      return setAlertPhone("Campo obrigatório");
    }
    if (isNaN(cpf) || cpf.length < 11) {
      return setAlertCpf("Formato de cpf Inválido");
    }
    if (isNaN(phone)) {
      return setAlertPhone("Formato de Telefone Inválido");
    }
    const newClient = {
      name_client: name,
      email_client: email,
      cpf_client: cpf,
      phone_client: phone,
      cep,
      address,
      complement,
      neighborhood,
      city,
      state,
    };

    try {
      await api.post("clients", newClient);

      toast.success("Cliente adicionado com sucesso!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setOpenModalCustomer(false);
    } catch (error) {
      toast.error(`${error.response.data.mensagem}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(error.message);
    }
  };

  const getAddress = async (cep) => {
    if (cep.length == 8) {
      try {
        const responseCep = await fetch(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        const dataCep = await responseCep.json();
        if (dataCep.erro) {
          setAddress("");
          setCity("");
          setState("");
          setNeighborhood("");
          setAlertCep("Cep inválido");
        } else {
          setAddress(dataCep.logradouro);
          setCity(dataCep.localidade);
          setState(dataCep.uf);
          setNeighborhood(dataCep.bairro);
          setAlertCep("");
        }
      } catch (error) {
        setAlertCep(`${error}`);
      }
    } else {
      setAlertCep("O cep precisa ter 8 números");
    }
  };

  const cancelSubmit = () => {
    setName("");
    setEmail("");
    setCpf("");
    setPhone("");
    setAddress("");
    setComplement("");
    setCep("");
    setNeighborhood("");
    setCity("");
    setState("");
    setAlertCep("");
  };

  return (
    <div className="container-modal-customer">
      <div className="box-modal-customer">
        <div className="main-box">
          <div className="close-icon">
            <img
              onClick={() => setOpenModalCustomer(false)}
              src={closeIcon}
              alt="Close Icon"
            />
          </div>
          <div className="box-inputs">
            <div className="box-title">
              <img src={clientsIcon} alt="Clients Icon" />
              <h1>Cadastro do Cliente</h1>
            </div>
            <Box
              onSubmit={handleSubmit}
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                "& > :not(style)": {
                  margin: "1.5rem 0",
                  width: "36.8rem",
                  height: "4.4rem",
                  position: "relative",
                },
              }}
              autoComplete="off"
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    fontFamily: "Nunito",
                    color: "#344054",
                    fontWeight: "500",
                  }}
                >
                  Nome*
                </label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  placeholder="Digite o nome"
                  value={name}
                  name="name"
                  onChange={(event) => {
                    setName(event.target.value);
                    setAlertName("");
                  }}
                  InputProps={{
                    style: {
                      fontSize: "1.6rem",
                      color: "#343447",
                      borderRadius: ".8rem",
                      height: "3.8rem",
                    },
                    className: alertName ? "redOutline" : "",
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: "1.6rem",
                      color: "gray",
                      transform: "none",
                      height: "3.8rem",
                    },
                  }}
                />
                {alertName && <span>{alertName}</span>}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    fontFamily: "Nunito",
                    color: "#344054",
                    fontWeight: "500",
                  }}
                >
                  Email*
                </label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="email"
                  placeholder="Digite o email"
                  value={email}
                  name="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setAlertEmail("");
                  }}
                  InputProps={{
                    style: {
                      fontSize: "1.6rem",
                      color: "#343447",
                      borderRadius: ".8rem",
                      height: "3.8rem",
                    },
                    className: alertEmail ? "redOutline" : "",
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: "1.6rem",
                      color: "gray",
                      transform: "none",
                      height: "3.8rem",
                    },
                  }}
                />
                {alertEmail && <span>{alertEmail}</span>}
              </Box>

              <div style={{ display: "flex", gap: "1.5rem" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{
                      fontFamily: "Nunito",
                      color: "#344054",
                      fontWeight: "500",
                    }}
                  >
                    CPF*
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    mask="999.999.999-99"
                    type="text"
                    placeholder="Digite o CPF"
                    value={cpf}
                    name="cpf"
                    onChange={(event) => {
                      setCpf(event.target.value);
                      setAlertCpf("");
                    }}
                    InputProps={{
                      style: {
                        fontSize: "1.6rem",
                        color: "#343447",
                        borderRadius: ".8rem",
                        height: "3.8rem",
                      },
                      className: alertCpf ? "redOutline" : "",
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "1.6rem",
                        color: "gray",
                        transform: "none",
                        height: "3.8rem",
                      },
                    }}
                  />
                  {alertCpf && <span>{alertCpf}</span>}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{
                      fontFamily: "Nunito",
                      color: "#344054",
                      fontWeight: "500",
                    }}
                  >
                    Telefone*
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="phone"
                    placeholder="Digite o telefone"
                    value={phone}
                    name="phone"
                    onChange={(event) => {
                      setPhone(event.target.value), setAlertPhone("");
                    }}
                    InputProps={{
                      style: {
                        fontSize: "1.6rem",
                        color: "#343447",
                        borderRadius: ".8rem",
                        height: "3.8rem",
                      },
                      className: alertPhone ? "redOutline" : "",
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "1.6rem",
                        color: "gray",
                        transform: "none",
                        height: "3.8rem",
                      },
                    }}
                  />
                  {alertPhone && <span>{alertPhone}</span>}
                </Box>
              </div>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    fontFamily: "Nunito",
                    color: "#344054",
                    fontWeight: "500",
                  }}
                >
                  Endereço
                </label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="address"
                  placeholder="Digite o endereço"
                  value={address}
                  name="address"
                  onChange={(event) => setAddress(event.target.value)}
                  InputProps={{
                    style: {
                      fontSize: "1.6rem",
                      color: "#343447",
                      borderRadius: ".8rem",
                      height: "3.8rem",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: "1.6rem",
                      color: "gray",
                      transform: "none",
                      height: "3.8rem",
                    },
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    fontFamily: "Nunito",
                    color: "#344054",
                    fontWeight: "500",
                  }}
                >
                  Complemento
                </label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  placeholder="Digite o complemento"
                  value={complement}
                  name="complement"
                  onChange={(event) => setComplement(event.target.value)}
                  InputProps={{
                    style: {
                      fontSize: "1.6rem",
                      color: "#343447",
                      borderRadius: ".8rem",
                      height: "3.8rem",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: "1.6rem",
                      color: "gray",
                      transform: "none",
                      height: "3.8rem",
                    },
                  }}
                />
              </Box>

              <div style={{ display: "flex", gap: "1.5rem" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{
                      fontFamily: "Nunito",
                      color: "#344054",
                      fontWeight: "500",
                    }}
                  >
                    CEP
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    placeholder="Digite o CEP"
                    value={cep}
                    name="cep"
                    onChange={(event) => setCep(event.target.value)}
                    onBlur={() => getAddress(cep)}
                    InputProps={{
                      style: {
                        fontSize: "1.6rem",
                        color: "#343447",
                        borderRadius: ".8rem",
                        height: "3.8rem",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "1.6rem",
                        color: "gray",
                        transform: "none",
                        height: "3.8rem",
                      },
                      className: alertCep ? "redOutline" : "",
                    }}
                  />
                  {alertCep && <span>{alertCep}</span>}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{
                      fontFamily: "Nunito",
                      color: "#344054",
                      fontWeight: "500",
                    }}
                  >
                    Bairro
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    placeholder="Digite o bairro"
                    value={neighborhood}
                    name="neighborhood"
                    onChange={(event) => setNeighborhood(event.target.value)}
                    InputProps={{
                      style: {
                        fontSize: "1.6rem",
                        color: "#343447",
                        borderRadius: ".8rem",
                        height: "3.8rem",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "1.6rem",
                        color: "gray",
                        transform: "none",
                        height: "3.8rem",
                      },
                    }}
                  />
                </Box>
              </div>

              <div style={{ display: "flex", gap: "1.5rem" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{
                      fontFamily: "Nunito",
                      color: "#344054",
                      fontWeight: "500",
                    }}
                  >
                    Cidade
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    placeholder="Digite a cidade"
                    value={city}
                    name="city"
                    onChange={(event) => setCity(event.target.value)}
                    InputProps={{
                      style: {
                        fontSize: "1.6rem",
                        color: "#343447",
                        borderRadius: ".8rem",
                        width: "25rem",
                        height: "3.8rem",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "1.6rem",
                        color: "gray",
                        transform: "none",
                        height: "3.8rem",
                      },
                    }}
                  />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{
                      fontFamily: "Nunito",
                      color: "#344054",
                      fontWeight: "500",
                    }}
                  >
                    UF
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    placeholder="Digite a UF"
                    value={state}
                    name="state"
                    onChange={(event) => setState(event.target.value)}
                    InputProps={{
                      style: {
                        fontSize: "1.6rem",
                        color: "#343447",
                        borderRadius: ".8rem",
                        height: "3.8rem",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "1.6rem",
                        color: "gray",
                        transform: "none",
                        height: "3.8rem",
                      },
                    }}
                  />
                </Box>
              </div>
              <div style={{ marginTop: "3rem", alignItems: "center" }}>
                <Stack
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  direction="row"
                  spacing={2}
                >
                  <Button
                    sx={{
                      width: "16rem",
                      height: "3.5rem",
                      borderRadius: "1rem",
                      backgroundColor: "#F8F8F9",
                      color: "#0E8750",
                      "&:hover": {
                        backgroundColor: "#CDCDCD",
                      },
                      fontSize: "1.4rem",
                    }}
                    variant="contained"
                    onClick={cancelSubmit}
                    type="button"
                  >
                    Cancelar
                  </Button>

                  <Button
                    sx={{
                      width: "16rem",
                      height: "3.5rem",
                      borderRadius: "1rem",
                      backgroundColor: "#DA0175",
                      "&:hover": {
                        backgroundColor: "#790342",
                      },
                      fontSize: "1.4rem",
                    }}
                    variant="contained"
                    type="submit"
                  >
                    Aplicar
                  </Button>
                </Stack>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
