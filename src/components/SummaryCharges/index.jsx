import { Avatar, Grid, Stack } from "@mui/material";
import NavMenu from "../NavMenu";
import colors from "../../style/colors";
import { ReactComponent as ExpiredSvg } from "../../assets/Expired.svg";
import { ReactComponent as PaidSvg } from "../../assets/Paid.svg";
import { ReactComponent as Billings } from "../../assets/billingYellow.svg";
import "./styles.css";
import TableCharge from "../TableCharges";
import TableChargeClients from "../TableChargesClients";

function SummaryCharges() {
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
                color: colors.Green.dark,
                fontSize: "2.2rem",
              }}
            >
              L
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
                  <h2>R$ 30.000</h2>
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="charge-card expired">
                <ExpiredSvg />
                <div className="charge-texts">
                  <h3>Cobranças Vencidas</h3>
                  <h2>R$ 7.000</h2>
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="charge-card expected">
                <Billings />
                <div className="charge-texts">
                  <h3>Cobranças Previstas</h3>
                  <h2>R$ 10.000</h2>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: "1.9rem  5.4rem" }} spacing={6}>
            <Grid item xs={4}>
              <TableCharge title="Cobranças Pagas" number="08" color="green" />
            </Grid>
            <Grid item xs={4}>
              <TableCharge
                title="Cobranças Vencidas"
                number="05"
                color="wine"
              />
            </Grid>
            <Grid item xs={4}>
              <TableCharge
                title="Cobranças Previstas"
                number="10"
                color="yellow"
              />
            </Grid>
          </Grid>
          <Grid container sx={{ padding: "1.9rem  5.4rem" }} spacing={6}>
            <Grid item xs={6}>
              <TableChargeClients
                title="Clientes Inadimplentes"
                number="08"
                defaulter={true}
              />
            </Grid>
            <Grid item xs={6}>
              <TableChargeClients
                title="Clientes em dia"
                number="08"
                defaulter={false}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
}

export default SummaryCharges;
