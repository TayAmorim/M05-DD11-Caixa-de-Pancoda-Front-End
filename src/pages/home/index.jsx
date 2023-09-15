import { Grid } from "@mui/material";
import TabPanel from "../../components/TabPanel";
import "./styles.css";
import { Route, Routes } from "react-router-dom";
import SummaryCharges from "../../components/SummaryCharges";
import CustomerList from "../../components/CustomerList";
import colors from "../../style/colors";
import ModalEditCustomer from '../../components/modalEditCustomer/index'
import { useState } from "react";

export default function Home() {
  const [openModalCustomer, setOpenModalCustomer] = useState(false)
  return (
    <>
    <Grid sx={{ background: colors.Grey.h, position:'relative' }} container>
      <Grid item xs={1} >
        <TabPanel />
      </Grid>
        <Routes>
          <Route path="/" element={<SummaryCharges />} />
          <Route path="clientes" element={<CustomerList setOpenModalCustomer={setOpenModalCustomer} />} />
          <Route path="cobranca" />
        </Routes>
        
      {openModalCustomer && <ModalEditCustomer setOpenModalCustomer={setOpenModalCustomer}/> }

      </Grid>

      </>
  );
}
