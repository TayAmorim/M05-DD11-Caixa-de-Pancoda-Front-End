import { Button, Grid, Stack } from "@mui/material";
import TabPanel from "../../components/TabPanel";
import "./styles.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SummaryCharges from "../../components/SummaryCharges";
import CustomerList from "../../components/CustomerList";
import ChargesList from "../../components/ChargesList";
import colors from "../../style/colors";
import ModalEditCustomer from "../../components/modalEditCustomer/index";
import { useContext, useState } from "react";

import ModalEditUser from "../../components/modalEdituser";
import { ModalContext } from "../../context/modalContext";
import ModalSucess from "../../components/modalSucess";
import ModalDelete from "../../components/ModalDeleteCharges";
import ModalEditCharges from "../../components/modalEditCharges/index";
import ModalCreateCharges from "../../components/ModalCreateCharges/index";
import CustomerDetails from "../../components/CustomerDetails/index";

export default function Home() {
  const [openModalCustomer, setOpenModalCustomer] = useState(false);
  const [openModalDeleteCharges, setOpenModalDeleteCharges] = useState(false);
  const [openModalEditCharges, setOpenModalEditCharges] = useState(false);
  const [openModalCreateCharges, setOpenModalCreateCharges] = useState(false);
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
            path="clientes"
            element={
              <CustomerList
                setOpenModalCustomer={setOpenModalCustomer}
                setOpenModalCreateCharges={setOpenModalCreateCharges}
              />
            }
          />
          <Route
            path="cobranca"
            element={
              <ChargesList
                setOpenModalDeleteCharges={setOpenModalDeleteCharges}
                setOpenModalEditCharges={setOpenModalEditCharges}
              />
            }
          />
          <Route path="clientes/detalhes" element={<CustomerDetails />} />
        </Routes>

        {OpenModalEditUser && (
          <ModalEditUser setOpenModalEditUser={setOpenModalEditUser} />
        )}

        {openModalCustomer && (
          <ModalEditCustomer setOpenModalCustomer={setOpenModalCustomer} />
        )}

        {sucess && <ModalSucess />}

        {openModalDeleteCharges && (
          <ModalDelete setOpenModalDeleteCharges={setOpenModalDeleteCharges} />
        )}
        {openModalEditCharges && (
          <ModalEditCharges
            setOpenModalEditCharges={setOpenModalEditCharges}
            openModalEditCharges={openModalEditCharges}
          />
        )}
        {openModalCreateCharges && (
          <ModalCreateCharges
            setOpenModalCreateCharges={setOpenModalCreateCharges}
          />
        )}
      </Grid>
    </>
  );
}
