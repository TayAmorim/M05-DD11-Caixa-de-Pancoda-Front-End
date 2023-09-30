import "./style.css";
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
import chargeIcon from "../../assets/billingsIcon.svg";
import searchControler from "../../assets/customersSettings.svg";
import sortIconHeaders from "../../assets/sortIconHeaders.svg";
import editIcon from "../../assets/editIcon.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import api from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/myContext";
import { format } from "../../../node_modules/date-fns";
import ptBr from "date-fns/locale/pt-BR";

export default function ChargesList({
  setOpenModalDeleteCharges,
  setOpenModalEditCharges,
}) {
  const currentDate = new Date();
  const currentDateFormat = format(new Date(currentDate), "dd/MM/yyyy", {
    locale: ptBr,
  });
  const {
    setIdDelete,
    dataCharges,
    setDataCharges,
    setIdEdit,
    infoListCharge,
    setInfoListCharge,
    fetchChargesList,
    setFetchChargesList,
  } = useContext(AuthContext);
  const [dataResponse, setDataResponse] = useState([]);
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const nameUser = userStorage.name;
  const words = nameUser.split(" ");
  const firstLetters = [];

  for (let i = 0; i < 2; i++) {
    if (words[i] && words[i].length > 0) {
      const first = words[i][0];
      firstLetters.push(first);
    }
  }

  useEffect(() => {
    const getCharges = async (newPage) => {
      try {
        const response = await api.get(`/listcharges?page=${newPage}`);
        setDataResponse(response.data);
        setInfoListCharge(response.data.charges);
        setTotalPage(response.data.totalPages);
        setFetchChargesList(false);
      } catch (error) {
        console.log(error);
      }
    };

    getCharges();
    if (fetchChargesList) {
      getCharges();
    }
  }, [fetchChargesList]);

  useEffect(() => {
    setDataCharges(dataResponse);
  }, [dataResponse]);

  function handlePreviousPage() {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      getCharges(newPage);
    }
  }

  function handleNextPage() {
    const newPage = page + 1;
    setPage(newPage);
    getCharges(newPage);
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
            Cobrança
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
        {infoListCharge.length > 0 ? (
          <div className="container-billingMain">
            <div className="billing-box-header">
              <div className="title-billing">
                <img src={chargeIcon} alt="Charge Icon" />
                <h1>Cobrança</h1>
              </div>
              <div className="search-box-users charges">
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
            <div className="box-table-billings ">
              <div className="table-header-customer charges-table">
                <ul>
                  <li>
                    <img src={sortIconHeaders} alt="Sort Icon" />
                    Cliente
                  </li>
                  <li>
                    <img src={sortIconHeaders} alt="Sort Icon" />
                    ID Cob.
                  </li>
                  <li>Valor</li>
                  <li>Data de Venc.</li>
                  <li>Status</li>
                  <li>Descrição</li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div className="body-table-customer charges-table">
                {infoListCharge.map((charges, index) => {
                  const day = format(new Date(charges.due_date), "dd/MM/yyy", {
                    locale: ptBr,
                  });
                  const dueDate = new Date(charges.due_date);
                  const isExpired = charges.status && dueDate < new Date();
                  return (
                    <ul key={`${charges.id_customer}-${index}`}>
                      <li>{charges.name_client}</li>
                      <li>{charges.id_charges}</li>
                      <li>{`R$: ${(charges.amount / 100)
                        .toFixed(2)
                        .replace(".", ",")}`}</li>
                      <li>
                        {String(Number(day.slice(0, 2)) + 1) +
                          "/" +
                          day.slice(3, 5) +
                          "/" +
                          day.slice(6)}
                      </li>
                      <li
                        className={
                          charges.status
                            ? isExpired
                              ? "expired-client"
                              : "pending-client"
                            : "paid-client"
                        }
                      >
                        {charges.status
                          ? isExpired
                            ? "Vencido"
                            : "Pendente"
                          : "Pago"}
                      </li>

                      <li>{charges.description}</li>
                      <li></li>
                      <li className="edit-delete">
                        <div
                          onClick={() => {
                            setOpenModalEditCharges(true);
                            setIdEdit(charges.id_customer);
                          }}
                        >
                          <img src={editIcon} alt="Edit Icon" />
                          <span>Editar</span>
                        </div>
                        <div
                          onClick={() => {
                            setOpenModalDeleteCharges(true);
                            setIdDelete(charges.id_charges);
                          }}
                        >
                          <img src={deleteIcon} alt="Delete Icon" />
                          <span>Deletar</span>
                        </div>
                      </li>
                    </ul>
                  );
                })}
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
                    disabled={page === 1}
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
