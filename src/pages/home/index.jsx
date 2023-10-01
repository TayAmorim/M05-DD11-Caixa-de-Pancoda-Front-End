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
import ModalChargeDetails from "../../components/ModalChargeDetails"
import CustomerDetails from "../../components/CustomerDetails/index";
import ModalEditCustomers from "../../components/ModalEditCustomers";
import { AuthContext } from "../../context/myContext";

export default function Home() {
  const [openModalCustomer, setOpenModalCustomer] = useState(false);
  const [openModalDeleteCharges, setOpenModalDeleteCharges] = useState(false);
  const [openModalEditCharges, setOpenModalEditCharges] = useState(false);
  const [openModalCreateCharges, setOpenModalCreateCharges] = useState(false);
  const [openModalCustomers, setOpenModalCustomers] = useState(false);
  const [openModalChargeDetails, setModalChargeDetails] = useState(false);
  const { customerData, setCustomerData } = useContext(AuthContext);
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
                setModalChargeDetails={setModalChargeDetails}
                openModalChargeDetails={openModalChargeDetails}
              />
            }
          />
          <Route path="clientes/detalhes" element={
            <CustomerDetails
              setOpenModalCreateCharges={setOpenModalCreateCharges}
              setOpenModalCustomers={setOpenModalCustomers} 
              setModalChargeDetails={setModalChargeDetails}
              openModalChargeDetails={openModalChargeDetails}
              />}
              />
        </Routes>

        {OpenModalEditUser && (
          <ModalEditUser setOpenModalEditUser={setOpenModalEditUser} />
        )}

        {openModalCustomer && (
          <ModalEditCustomer setOpenModalCustomer={setOpenModalCustomer} />
        )}

        {openModalCustomers && (
          <ModalEditCustomers setOpenModalCustomers={setOpenModalCustomers} customerData={customerData} />
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
            openModalCreateCharges={openModalCreateCharges}
          />
        )}
        {openModalChargeDetails && (
          <ModalChargeDetails setModalChargeDetails={setModalChargeDetails}/>
        )}
      </Grid>
    </>
  );
}
