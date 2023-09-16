import "./styles.css";
import { ReactComponent as HomeSvg } from "../../assets/home.svg";
import { ReactComponent as ClientsSvg } from "../../assets/clients.svg";
import { ReactComponent as BillingsSvg } from "../../assets/billingsIcon.svg";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function VerticalTabs() {
  return (
    <Box className="container-tabs">
      <NavLink to="/" className="button-tabs" end>
        <HomeSvg />
        Home
      </NavLink>
      <NavLink to="/clientes" className="button-tabs">
        <ClientsSvg />
        Clientes
      </NavLink>
      <NavLink to="/cobranca" className="button-tabs">
        <BillingsSvg />
        Cobranças
      </NavLink>
    </Box>
  );
}
