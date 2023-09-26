import "./style.css";
import * as React from "react";
import {
  Avatar,
  Grid,
  Stack,
  Box,
  TextField,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import NavMenu from "../NavMenu";
import colors from "../../style/colors";
import SearchIcon from "@mui/icons-material/Search";
import clients from "../../assets/clients.svg";
import searchControler from "../../assets/customersSettings.svg";
import sortIconHeaders from "../../assets/sortIconHeaders.svg";
import addBilling from "../../assets/addBilling.svg";
import { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/myContext";

export default function CustomerList({
  setOpenModalCustomer,
  setOpenModalCreateCharges,
}) {
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const {
    setCustomerData,
    setNameModalCreateCharge,
    setIdModalCreateCharge,
    fetchClientList,
    setFetchClientList,
  } = useContext(AuthContext);
  const [customersList, setCustomersList] = useState([]);
  const nameUser = userStorage.name;
  const words = nameUser.split(" ");
  const firstLetters = [];
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");

  for (let i = 0; i < 2; i++) {
    if (words[i] && words[i].length > 0) {
      const first = words[i][0];
      firstLetters.push(first);
    }
  }

  useEffect(() => {
    if (fetchClientList) {
      gettingCustomerList();
    }
    setFetchClientList(false);
  }, [fetchClientList]);

  async function gettingCustomerList(newPage) {
    try {
      const response = await api.get(`/listclients?page=${newPage}`);

      const listCustomer = await response.data;
      setTotalPage(listCustomer.totalPages);
      setCustomersList(
        listCustomer.clientsWithStatus.map((customer) => {
          const newCpf = customer.cpf_client.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            "$1.$2.$3-$4"
          );
          const formattedPhoneNumber = customer.phone_client.replace(
            /(\d{2})(\d{4})(\d{4})/,
            "($1) $2-$3"
          );
          customer.cpf_client = newCpf;
          customer.phone_client = formattedPhoneNumber;
          return customer;
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    gettingCustomerList();
  }, []);

  async function detailCustomer(id) {
    const response = await api.get(`/detailclient/${id}`);
    navigate("/clientes/detalhes");
    setCustomerData(response.data);
    localStorage.setItem("idClient", JSON.stringify(id));
    sessionStorage.setItem("customerDataSession", JSON.stringify(response.data));
  }

  function createBilling(idCustomer, nameCustomer) {
    setNameModalCreateCharge(nameCustomer);
    setIdModalCreateCharge(idCustomer);
  }

  function handlePreviousPage() {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      gettingCustomerList(newPage);
    }
  }

  function handleNextPage() {
    const newPage = page + 1;
    setPage(newPage);
    gettingCustomerList(newPage);
  }

  return (
    <>
      <Grid item xs={11}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            padding: "5.4rem 5.4rem 2.4rem",
            borderBottom: "1px solid" + colors.Green.light,
          }}
          justifyContent="space-between"
        >
          <h1
            style={{
              fontSize: "1.6rem",
              color: "#0E8750",
              alignSelf: "flex-end",
              marginBottom: "-2rem",
            }}
          >
            Clientes
          </h1>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              sx={{
                bgcolor: colors.Grey.f,
                color: colors.Green.normal,
                fontSize: "2rem",
                fontFamily: "Nunito",
              }}
            >
              {firstLetters}
            </Avatar>
            <NavMenu />
          </Stack>
        </Stack>
        {customersList.length > 0 ? (
          <div className="container-billingMain">
            <div className="billing-box-header">
              <div className="title-billing">
                <img src={clients} alt="Billins Icon" />
                <h1>Clientes</h1>
              </div>
              <div className="search-box-users">
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
                      width: "25rem",
                      height: "3.5rem",
                      borderRadius: "1rem",
                      backgroundColor: "#DA0175",
                      "&:hover": {
                        backgroundColor: "#790342",
                      },
                      fontSize: "1.4rem",
                    }}
                    onClick={() => setOpenModalCustomer(true)}
                    variant="contained"
                    type="button"
                  >
                    + Adicionar Cliente
                  </Button>
                </Stack>
                <img
                  className="searchControlerIcon"
                  src={searchControler}
                  alt="Search controller Icon"
                />
                <div className="set-search-input-img">
                  <Box>
                    <TextField
                      id="outlined-basic"
                      label="Pesquisa"
                      variant="outlined"
                      type="text"
                      name="senha"
                      InputProps={{
                        style: {
                          fontSize: "1.6rem",
                          color: "#343447",
                          borderRadius: ".8rem",
                          backgroundColor: "#fff",
                          width: "30rem",
                          height: "3.8rem",
                          lineHeight: "1.8rem",
                        },
                        endAdornment: (
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            sx={{
                              position: "absolute",
                              right: "1.5rem",
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          >
                            <SearchIcon style={{ fontSize: "3rem" }} />
                          </IconButton>
                        ),
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: "1.6rem",
                          color: "gray",
                          width: "30rem",
                          height: "3.8rem",
                          lineHeight: "1.3rem",
                        },
                      }}
                    />
                  </Box>
                </div>
              </div>
            </div>

            <div className="box-table-billings">
              <div className="table-header-customer">
                <ul>
                  <li>
                    <img src={sortIconHeaders} alt="Sort Icon" />
                    Cliente
                  </li>
                  <li>CPF</li>
                  <li>E-mail</li>
                  <li>Telefone</li>
                  <li>Status</li>
                  <li>Criar Cobrança</li>
                </ul>
              </div>
              <div className="body-table-customer">
                {customersList.map((customer) => (
                  <ul key={customer.id}>
                    <li
                      className="link-detail-customer"
                      onClick={() => detailCustomer(customer.id)}
                    >
                      {customer.name_client.length < 12
                        ? customer.name_client
                        : customer.name_client.slice(0, 12) + "..."}
                    </li>
                    <li>{customer.cpf_client}</li>
                    <li>
                      {customer.email_client.length < 15
                        ? customer.email_client
                        : customer.email_client.slice(0, 15) + "..."}
                    </li>
                    <li>{customer.phone_client}</li>
                    <li
                      className={
                        !customer.status
                          ? "up-to-date-client"
                          : "expired-client"
                      }
                    >
                      {!customer.status ? "Em dia" : "Inadimplente"}
                    </li>
                    <li>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          onClick={() => {
                            createBilling(customer.id, customer.name_client);
                            setOpenModalCreateCharges(true);
                          }}
                          src={addBilling}
                          alt="Add Billing Icon"
                        />
                        <span
                          style={{
                            color: "#DA0175",
                            fontSize: "1.1rem",
                            marginTop: ".5rem",
                          }}
                        >
                          Cobrança
                        </span>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>

              <div style={{ margin: "5rem 0" }}>
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
                      height: "4.4rem",
                      borderRadius: ".8rem",
                      backgroundColor: "#DA0175",
                      "&:hover": {
                        backgroundColor: "#790342",
                      },
                      fontSize: "1.4rem",
                    }}
                    variant="contained"
                    type="button"
                    onClick={() => handlePreviousPage()}
                    disabled={page == 1}
                  >
                    Anterior
                  </Button>
                  <Button
                    sx={{
                      width: "16rem",
                      height: "4.4rem",
                      borderRadius: ".8rem",
                      backgroundColor: "#DA0175",
                      "&:hover": {
                        backgroundColor: "#790342",
                      },
                      fontSize: "1.4rem",
                    }}
                    variant="contained"
                    type="button"
                    onClick={() => handleNextPage()}
                    disabled={page >= totalPage}
                  >
                    Proximo
                  </Button>
                </Stack>
              </div>
            </div>
          </div>
        ) : (
          <Box
            sx={{
              display: "flex",
              width: "90vw",
              height: "calc(100vh - 130px)",
              alignItems: "center",
              justifyContent: "center",
              color: "secondary",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </>
  );
}
