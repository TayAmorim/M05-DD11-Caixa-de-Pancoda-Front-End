import { Grid } from "@mui/material";
import TabPanel from "../../components/TabPanel";

import "./styles.css";

export default function Home() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        <TabPanel />
      </Grid>
      <Grid item xs={11}>
        <h1>oi</h1>
      </Grid>
    </Grid>
  );
}
