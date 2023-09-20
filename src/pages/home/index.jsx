import { Button, Grid, Stack } from "@mui/material";
import TabPanel from "../../components/TabPanel";
import "./styles.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SummaryCharges from "../../components/SummaryCharges";
import CustomerList from "../../components/CustomerList";
import colors from "../../style/colors";
import ModalEditCustomer from "../../components/modalEditCustomer/index";
import { useContext, useState } from "react";

import ModalEditUser from "../../components/modalEdituser";
import { ModalContext } from "../../context/modalContext";
import ModalSucess from "../../components/modalSucess";

export default function Home() {
  const [openModalCustomer, setOpenModalCustomer] = useState(false);
  const { OpenModalEditUser, setOpenModalEditUser, sucess, setSucess } =
    useContext(ModalContext);

  return (
    <>
      <Grid sx={{ background: colors.Grey.h, position: "relative" }} container>
        <Grid item xs={1}>
          <TabPanel />
        </Grid>
        <Routes>
          <Route path="/" element={<SummaryCharges />} />
          <Route
            path="clientes/*"
            element={
              <CustomerList setOpenModalCustomer={setOpenModalCustomer} />
            }
          />

          <Route path="cobranca" />
        </Routes>
        {OpenModalEditUser && (
          <ModalEditUser setOpenModalEditUser={setOpenModalEditUser} />
        )}

        {openModalCustomer && (
          <ModalEditCustomer setOpenModalCustomer={setOpenModalCustomer} />
        )}

        {sucess && <ModalSucess />}
      </Grid>
    </>
  );
}
