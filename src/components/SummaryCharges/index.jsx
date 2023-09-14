import { Avatar, Grid, Stack } from "@mui/material";
import NavMenu from "../NavMenu";
import colors from "../../style/colors";
import { ReactComponent as ExpiredSvg } from "../../assets/Expired.svg";
import { ReactComponent as PaidSvg } from "../../assets/Paid.svg";
import "./styles.css";

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
        <Grid container sx={{ padding: "1.9em 5.4rem 2.4rem" }} spacing={6}>
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
              <ExpiredSvg />
              <div className="charge-texts">
                <h3>Cobranças Previstas</h3>
                <h2>R$ 10.000</h2>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: "1.9em 5.4rem 2.4rem" }} spacing={2}>
          <Grid item xs={4}>
            <div className="">
              <div className="charge-table">
                <h3>Cobrança Pagas</h3>
                <h2>R$ 30.000</h2>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="">
              <div className="charge-table">
                <h3>Cobrança Pagas</h3>
                <h2>R$ 30.000</h2>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="">
              <div className="charge-table">
                <h3>Cobrança Pagas</h3>
                <h2>R$ 30.000</h2>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default SummaryCharges;
