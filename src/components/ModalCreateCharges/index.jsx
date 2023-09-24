import "./style.css";
import * as React from 'react';
import closeIcon from "../../assets/closeIcon.svg";
import chargeIcon from "../../assets/billingsIcon.svg";
import { Box, TextField, Button, Stack } from "@mui/material";
import { useState, useContext } from "react";
import {AuthContext} from '../../context/myContext'
import api from "../../api/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function modalEditCustomer({ setOpenModalCreateCharges, openModalCreateCharges }) {
  const { setDataCharges, nameModalCreateCharge, idModalCreateCharge } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [alertName, setAlertName] = useState('')
  const [description, setDescription] = useState('')
  const [alertDescription, setAlertDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [alertDueDate, setAlertDueDate] = useState('')
  const [amount, setAmount] = useState('')
  const [alertAmount, setAlertAmount] = useState('')
  const [radioSelected, setRadioSelected] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!description) {
      return setAlertDescription("Este campo deve ser preenchido");
    }
    if (!dueDate) {
      return setAlertDueDate("Campo obrigatório");
    }
    if (!amount) {
      return setAlertAmount("Campo obrigatório");
    }
    try {
      const response = await api.post('/charges', {
        "id_customer": String(idModalCreateCharge),
        "name_client": nameModalCreateCharge,
        "amount": Number(amount),
        "due_date": dueDate,
        "status": radioSelected,
        "description": description
      })

      toast.success("Cobrança criada com sucesso!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dataValuesCharges()
      setOpenModalCreateCharges(false)
    } catch (error) {
      console.log(error.message)
    }
  }
  const dataValuesCharges = async () => {
    try {
       
        const response = await api.get('/listcharges');
        setDataCharges(response.data)
    } catch (error) {
        console.log(error)
    }
}
  const cancelSubmit = () => {
    setDescription("");
    setDueDate("");
    setAmount("");
  };

  return (
    <div className="container-modal-customer charges-form">
      <div className="box-modal-customer">
        <div className="main-box">
          <div className="close-icon">
            <img
              onClick={() => setOpenModalCreateCharges(false)}
              src={closeIcon}
              alt="Close Icon"
            />
          </div>
          <div className="box-inputs">
            <div style={{ marginTop: '2rem' }} className="box-title">
              <img src={chargeIcon} alt="Charges Icon" />
              <h1>Cadastro de Cobrança</h1>
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
                  Nome
                </label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  placeholder="Digite o nome"
                  value={nameModalCreateCharge}
                  name="name"
                  disabled
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
                  Descrição*
                </label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  placeholder="Digite a descrição"
                  value={description}
                  name="description"
                  onChange={(event) => {
                    setDescription(event.target.value);
                    setAlertDescription("");
                  }}
                  InputProps={{
                    style: {
                      fontSize: "1.6rem",
                      color: "#343447",
                      borderRadius: ".8rem",
                      height: "8rem",
                    },
                    className: alertDescription ? "redOutline" : "",
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: "1.6rem",
                      color: "gray",
                      transform: "none",
                      height: "8rem",
                    },
                  }}
                />
                {alertDescription && <span>{alertDescription}</span>}
              </Box>

              <div style={{ display: "flex", gap: "1.5rem", marginTop: "5.5rem" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{
                      fontFamily: "Nunito",
                      color: "#344054",
                      fontWeight: "500",
                    }}
                  >
                    Vencimento*
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="Date"
                    placeholder="Digite o CPF"
                    value={dueDate}
                    name="due_date"
                    onChange={(event) => {
                      setDueDate(event.target.value);
                      setAlertDueDate("");
                    }}
                    InputProps={{
                      style: {
                        fontSize: "1.6rem",
                        color: "#343447",
                        borderRadius: ".8rem",
                        height: "3.8rem",
                      },
                      className: alertDueDate ? "redOutline" : "",
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
                  {alertDueDate && <span>{alertDueDate}</span>}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{
                      fontFamily: "Nunito",
                      color: "#344054",
                      fontWeight: "500",
                    }}
                  >
                    Valor*
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="number"
                    placeholder="Digite o valor"
                    value={amount}
                    name="amount"
                    onChange={(event) => {
                      setAmount(event.target.value), setAlertAmount("");
                    }}
                    InputProps={{
                      style: {
                        fontSize: "1.6rem",
                        color: "#343447",
                        borderRadius: ".8rem",
                        height: "3.8rem",
                      },
                      className: alertAmount ? "redOutline" : "",
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
                  {alertAmount && <span>{alertAmount}</span>}
                </Box>
              </div>

              <div className="input-radio-box" >
                <label>Status</label>
                <div>
                  <input onChange={() => setRadioSelected(false)} type="radio" value='false' name="status_charge" label="Cobrança Paga" checked={!radioSelected} /><label>Cobrança Paga</label>
                </div>
                <div>
                  <input onChange={() => setRadioSelected(true)} type="radio" value='true' name="status_charge" label="Cobrança Pendente" checked={radioSelected} /><label>Cobrança Pendente</label>
                </div>
              </div>

              <div style={{ marginTop: "15rem", alignItems: "center" }}>
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
                    Cadastrar
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
