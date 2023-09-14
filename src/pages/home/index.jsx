import { Grid } from "@mui/material";
import TabPanel from "../../components/TabPanel";

import "./styles.css";
import { Route, Routes } from "react-router-dom";
import SummaryCharges from "../../components/SummaryCharges";

export default function Home() {
  return (
    <Grid container>
      <Grid item xs={1}>
        <TabPanel />
      </Grid>
      <Routes>
        <Route path="/" element={<SummaryCharges />} />
        <Route path="clientes" element={<SummaryCharges />} />
        <Route path="cobranca" />
      </Routes>
    </Grid>
  );
}
