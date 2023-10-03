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
import MessageSearch from "../MessageSearch";

export default function ChargesList({
  setOpenModalDeleteCharges,
  setOpenModalEditCharges,
  setModalChargeDetails,
  openModalChargeDetails,
}) {
  const {
    setIdDelete,
    setDataCharges,
    fetchChargesList,
    setFetchChargesList,
    setIdEdit,
    setIdDetailsCharge,
    setDetailCharge,
    idDetailsCharge,
  } = useContext(AuthContext);
  const [dataResponse, setDataResponse] = useState([]);
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const nameUser = userStorage.name;
  const words = nameUser.split(" ");
  const firstLetters = [];
  const [infoListCharge, setInfoListCharge] = useState([]);
  const [sentenceSearch, setSentenceSearch] = useState("");
  const [inalteredListCharges, setInalteredListCharges] = useState([]);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [sortActive, setSortActive] = useState(false);
  const [queryParams, setQueryParams] = useState("");
  const [openMessageSearch, setOpenMessageSearch] = useState(false);

  for (let i = 0; i < 2; i++) {
    if (words[i] && words[i].length > 0) {
      const first = words[i][0];
      firstLetters.push(first);
    }
  }

  useEffect(() => {
    const getCharges = async () => {
      try {
        const response = await api.get(`/listcharges?page=${page}`);
        setDataResponse(response.data);
        setInfoListCharge(response.data.charges);
        setInalteredListCharges(response.data.charges);
        setTotalPage(response.data.totalPages);
        setFetchChargesList(false);
        setSearchIsActive(false);
        setSortActive(false);
      } catch (error) {
        console.log(error);
      }
    };

    getCharges();
    if (!searchIsActive) {
      if (fetchChargesList) {
        getCharges();
      }
    }
  }, [fetchChargesList]);

  useEffect(() => {
    if (!searchIsActive) {
      setDataCharges(dataResponse);
    }
  }, [dataResponse]);

  function handlePreviousPage() {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
    }
  }

  function handleNextPage() {
    const newPage = page + 1;
    setPage(newPage);
  }

  const detailsCharges = async () => {
    try {
      const response = await api.get(`/detailcharge/${idDetailsCharge}`);
      setDetailCharge(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    detailsCharges();
  }, [openModalChargeDetails, idDetailsCharge]);

  const handleSearch = async () => {
    let queryParam = "";
    try {
      let idExpression = /^[0-9]+$/;

      if (idExpression.test(sentenceSearch)) {
        queryParam = "id_charges";
        setQueryParams("id_charges");
      } else {
        queryParam = "name_client";
        setQueryParams("name_client");
      }
      const response = await api.get(
        `/listcharges?${queryParam}=${sentenceSearch}`
      );
      if (response.data.length < 1) {
        setOpenMessageSearch(true);
        return;
      }
      setInfoListCharge(response.data);
      setInalteredListCharges(response.data);
      setSearchIsActive(true);
      setOpenMessageSearch(false);
      return;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSort = async (typeSort) => {
    if (typeSort === sortActive) {
      setSortActive(undefined);
      return setInfoListCharge(inalteredListCharges);
    }

    if (typeSort == "byName") {
      const chargesListOrdened = [...inalteredListCharges];
      chargesListOrdened.sort((a, b) => {
        const nomeA = a.name_client[0].toUpperCase();
        const nomeB = b.name_client[0].toUpperCase();

        if (nomeA < nomeB) {
          return -1;
        }
        if (nomeA > nomeB) {
          return 1;
        }
        return 0;
      });
      setInfoListCharge(chargesListOrdened);
      setSortActive("byName");
      return;
    }
    if (typeSort == "byId") {
      const chargesListOrdened = [...inalteredListCharges];
      chargesListOrdened.sort((a, b) => {
        const idA = a.id_charges;
        const idB = b.id_charges;

        if (idA < idB) {
          return -1;
        }
        if (idA > idB) {
          return 1;
        }
        return 0;
      });
      setInfoListCharge(chargesListOrdened);
      setSortActive("byId");
      return;
    }
  };
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
                      name="search"
                      value={sentenceSearch}
                      onChange={(event) => {
                        setSentenceSearch(event.target.value);
                      }}
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
                            onClick={() => {
                              handleSearch();
                            }}
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

            {openMessageSearch ? (
              <MessageSearch />
            ) : (
              <div>
                <div className="box-table-billings ">
                  <div className="table-header-customer charges-table">
                    <ul>
                      <li>
                        <img
                          src={sortIconHeaders}
                          alt="Sort Icon"
                          name="byName"
                          onClick={(event) => {
                            setInfoListCharge(true),
                              handleSort(event.target.name);
                          }}
                        />
                        Cliente
                      </li>
                      <li>
                        <img
                          src={sortIconHeaders}
                          alt="Sort Icon"
                          name="byId"
                          onClick={(event) => {
                            setInfoListCharge(true),
                              handleSort(event.target.name);
                          }}
                        />
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
                      const day = format(
                        new Date(charges.due_date),
                        "dd/MM/yyy",
                        {
                          locale: ptBr,
                        }
                      );
                      const dueDate = new Date(charges.due_date);
                      const isExpired = charges.status && dueDate < new Date();
                      return (
                        <ul key={`${charges.id_customer}-${index}`}>
                          <li
                            className="name-charge"
                            onClick={() => {
                              setModalChargeDetails(true);
                              setIdDetailsCharge(charges.id_charges);
                              detailsCharges();
                            }}
                          >
                            {charges.name_client}
                          </li>
                          <li
                            className="name-charge"
                            onClick={() => {
                              setModalChargeDetails(true);
                              setIdDetailsCharge(charges.id_charges);
                              detailsCharges();
                            }}
                          >
                            {charges.id_charges}
                          </li>
                          <li
                            className="name-charge"
                            onClick={() => {
                              setModalChargeDetails(true);
                              setIdDetailsCharge(charges.id_charges);
                              detailsCharges();
                            }}
                          >{`R$: ${(charges.amount / 100)
                            .toFixed(2)
                            .replace(".", ",")}`}</li>
                          <li
                            className="name-charge"
                            onClick={() => {
                              setModalChargeDetails(true);
                              setIdDetailsCharge(charges.id_charges);
                              detailsCharges();
                            }}
                          >
                            {String(Number(day.slice(0, 2)) + 1) +
                              "/" +
                              day.slice(3, 5) +
                              "/" +
                              day.slice(6)}
                          </li>
                          <li
                            onClick={() => {
                              setModalChargeDetails(true);
                              setIdDetailsCharge(charges.id_charges);
                              detailsCharges();
                            }}
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

                          <li
                            onClick={() => {
                              setModalChargeDetails(true);
                              setIdDetailsCharge(charges.id_charges);
                              detailsCharges();
                            }}
                          >
                            {charges.description}
                          </li>
                          <li></li>
                          <li className="edit-delete">
                            <div
                              onClick={() => {
                                setOpenModalEditCharges(true);
                                setIdEdit(charges.id_charges);
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
                      {searchIsActive ? (
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
                          onClick={() => {
                            setFetchChargesList(true),
                              setSearchIsActive(false),
                              setSortActive(false),
                              setSentenceSearch("");
                          }}
                        >
                          Voltar
                        </Button>
                      ) : (
                        <>
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
                        </>
                      )}
                    </Stack>
                  </div>
                </div>
              </div>
            )}
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
