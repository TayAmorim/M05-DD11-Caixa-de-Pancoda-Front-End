import { Avatar, Grid, Stack } from "@mui/material";
import NavMenu from "../NavMenu";
import colors from "../../style/colors";
import { ReactComponent as ExpiredSvg } from "../../assets/Expired.svg";
import { ReactComponent as PaidSvg } from "../../assets/Paid.svg";
import { ReactComponent as Billings } from "../../assets/billingYellow.svg";
import "./styles.css";
import TableCharge from "../TableCharges";
import TableChargeClients from "../TableChargesClients";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

function SummaryCharges() {
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const nameUser = userStorage.name;
  const words = nameUser.split(" ");
  const firstLetters = [];
  const [chargesReport, setChargesReport] = useState();
  const [customersReport, setCustomersReport] = useState();

  for (let i = 0; i < 2; i++) {
    if (words[i] && words[i].length > 0) {
      const first = words[i][0];
      firstLetters.push(first);
    }
  }

  useEffect(() => {
    async function getReportHome() {
      try {
        const response = await api.get("/customReport");
        setChargesReport(response.data.chargesReport);
        setCustomersReport(response.data.customersReport);
      } catch (error) {
        console.log(error?.message);
      }
    }
    getReportHome();
  }, []);

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
          <h1>Resumo das cobranças</h1>
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
        <div className="animation">
          <Grid container sx={{ padding: "1.9rem  5.4rem" }} spacing={6}>
            <Grid item xs={4}>
              <div className="charge-card paid">
                <PaidSvg />
                <div className="charge-texts">
                  <h3>Cobrança Pagas</h3>
                  <h2>
                    {(chargesReport?.paid.amount / 100).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  </h2>
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="charge-card expired">
                <ExpiredSvg />
                <div className="charge-texts">
                  <h3>Cobranças Vencidas</h3>
                  <h2>
                    {(chargesReport?.overdue.amount / 100).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  </h2>
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="charge-card expected">
                <Billings />
                <div className="charge-texts">
                  <h3>Cobranças Previstas</h3>
                  <h2>
                    {(chargesReport?.preview.amount / 100).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  </h2>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: "1.9rem  5.4rem" }} spacing={6}>
            <Grid item xs={4}>
              <TableCharge
                title="Cobranças Pagas"
                number={String(chargesReport?.paid.total).padStart(2, "0")}
                color="green"
              >
                {chargesReport?.paid.charges.map((charge) => (
                  <Stack
                    key={charge?.id_charge}
                    className="table-clients"
                    direction="row"
                    justifyContent="space-between"
                  >
                    <span>{charge?.name_client}</span>
                    <span>{charge?.id_charge}</span>
                    <span>
                      {(charge?.amount / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </Stack>
                ))}
                <Stack sx={{ margin: "0 auto", paddingBlock: "1rem" }}>
                  <Link to={"/cobranca?state=paid"}>
                    {" "}
                    <a className="btn-more">Ver Todos</a>
                  </Link>
                </Stack>
              </TableCharge>
            </Grid>
            <Grid item xs={4}>
              <TableCharge
                title="Cobranças Vencidas"
                number={String(chargesReport?.overdue.total).padStart(2, "0")}
                color="wine"
              >
                {chargesReport?.overdue.charges.map((charge) => (
                  <Stack
                    key={charge?.id_charge}
                    className="table-clients"
                    direction="row"
                    justifyContent="space-between"
                  >
                    <span>{charge?.name_client}</span>
                    <span>{charge?.id_charge}</span>
                    <span>
                      {(charge?.amount / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </Stack>
                ))}
                <Stack sx={{ margin: "0 auto", paddingBlock: "1rem" }}>
                  <Link to={"/cobranca?state=overdue"}>
                    {" "}
                    <a className="btn-more">Ver Todos</a>
                  </Link>
                </Stack>
              </TableCharge>
            </Grid>
            <Grid item xs={4}>
              <TableCharge
                title="Cobranças Previstas"
                number={String(chargesReport?.preview.total).padStart(2, "0")}
                color="yellow"
              >
                {chargesReport?.preview.charges.map((charge) => (
                  <Stack
                    key={charge?.id_charge}
                    className="table-clients"
                    direction="row"
                    justifyContent="space-between"
                  >
                    <span>{charge?.name_client}</span>
                    <span>{charge?.id_charge}</span>
                    <span>
                      {(charge?.amount / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </Stack>
                ))}
                <Stack sx={{ margin: "0 auto", paddingBlock: "1rem" }}>
                  <Link to={"/cobranca?state=preview"}>
                    {" "}
                    <a className="btn-more">Ver Todos</a>
                  </Link>
                </Stack>
              </TableCharge>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: "1.9rem  5.4rem" }} spacing={6}>
            <Grid item xs={6}>
              <TableChargeClients
                title="Clientes Inadimplentes"
                number={String(customersReport?.defaulters.total).padStart(
                  2,
                  "0"
                )}
                defaulter={true}
              >
                {customersReport?.defaulters.clients.map((customer) => (
                  <Stack
                    key={customer?.id}
                    className="customer-clients"
                    direction="row"
                    justifyContent="space-between"
                  >
                    <span>{customer?.name_client}</span>
                    <span>{customer?.id}</span>
                    <span>{customer?.cpf_client}</span>
                  </Stack>
                ))}
                <Stack sx={{ margin: "0 auto", paddingBlock: "1rem" }}>
                  <Link to={"/clientes?status=true"}>
                    <a className="btn-more">Ver Todos</a>
                  </Link>
                </Stack>
              </TableChargeClients>
            </Grid>
            <Grid item xs={6}>
              <TableChargeClients
                title="Clientes em dia"
                number={String(customersReport?.compliant.total).padStart(
                  2,
                  "0"
                )}
                defaulter={false}
              >
                {customersReport?.compliant.clients.map((customer) => (
                  <Stack
                    key={customer?.id}
                    className="customer-clients"
                    direction="row"
                    justifyContent="space-between"
                  >
                    <span>{customer?.name_client}</span>
                    <span>{customer?.id}</span>
                    <span>{customer?.cpf_client}</span>
                  </Stack>
                ))}
                <Stack sx={{ margin: "0 auto", paddingBlock: "1rem" }}>
                  <Link to={"/clientes?status=false"}>
                    <a className="btn-more">Ver Todos</a>
                  </Link>
                </Stack>
              </TableChargeClients>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
}

export default SummaryCharges;
