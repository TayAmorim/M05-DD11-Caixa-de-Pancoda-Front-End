import { Chip } from "@mui/material";
import { Stack } from "@mui/system";
import { ReactComponent as DefaultingSvg } from "../../assets/defaultingCustomer.svg";
import { ReactComponent as CompliantSvg } from "../../assets/compliant.svg";
import "./styles.css";
import colors from "../../style/colors";
import {Link} from 'react-router-dom'

function TableChargeClients({ title, defaulter, number }) {
  const backgroundChip = defaulter
    ? colors.Wine.light
    : colors.GreenSupport.light;
  const colorChip = defaulter ? colors.Wine.normal : colors.GreenSupport.normal;
  return (
    <Stack className="table-container customer">
      <Stack
        className="table-title"
        direction="row"
        justifyContent="space-between"
        alignContent="center"
        spacing={4}
      >
        <div className="group-text-svg">
          {defaulter ? <DefaultingSvg /> : <CompliantSvg />}
          <h3>{title}</h3>
        </div>
        <Chip
          label={number}
          sx={{
            fontSize: "1.6rem",
            background: backgroundChip,
            color: colorChip,
            fontWeight: "bold",
          }}
        />
      </Stack>
      <Stack
        className="customer-header"
        direction="row"
        justifyContent="space-between"
      >
        <span>Clientes</span>
        <span>ID do clie.</span>
        <span>CPF</span>
      </Stack>
      <Stack
        className="customer-clients"
        direction="row"
        justifyContent="space-between"
      >
        <span>Cameron Williamson</span>
        <span>223456787</span>
        <span>041.477.456-56</span>
      </Stack>
      <Stack
        className="customer-clients"
        direction="row"
        justifyContent="space-between"
      >
        <span>Savannah Nguyen</span>
        <span>223456787</span>
        <span>041.477.456-56</span>
      </Stack>
      <Stack
        className="customer-clients"
        direction="row"
        justifyContent="space-between"
      >
        <span>Darlene Robertson</span>
        <span>223456787</span>
        <span>041.477.456-56</span>
      </Stack>
      <Stack
        className="customer-clients"
        direction="row"
        justifyContent="space-between"
      >
        <span>Marvin McKinney</span>
        <span>223456787</span>
        <span>041.477.456-56</span>
      </Stack>
      <Stack sx={{ margin: "0 auto", paddingBlock: "1rem" }}>
        <Link to={'/cobranca'}><a className="btn-more">Ver Todos</a></Link>
      </Stack>
    </Stack>
  );
}

export default TableChargeClients;
