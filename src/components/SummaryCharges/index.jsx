import { Avatar, Grid, Stack } from "@mui/material";
import NavMenu from "../NavMenu";
import colors from "../../style/colors";
import { ReactComponent as ExpiredSvg } from "../../assets/Expired.svg";
import "./styles.css";

function SummaryCharges() {
  return (
    <>
      <Grid item xs={11}>
        <Stack
          direction="row"
          spacing={2}
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
        <Grid
          container
          sx={{ padding: "1.9em 5.4rem 2.4rem 5.4rem" }}
          spacing={2}
        >
          <Grid item xs={4}>
            <div className="charge-card paid">
              <ExpiredSvg />
              <h3>Cobrança Pagas</h3>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="charge-card expired">
              <ExpiredSvg />
              <h3>Cobranças Vencidas</h3>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="charge-card">
              <ExpiredSvg />
              <h3>Cobranças Previstas</h3>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default SummaryCharges;
