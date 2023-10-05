import { Chip } from "@mui/material";
import { Stack } from "@mui/system";
import { ReactComponent as DefaultingSvg } from "../../assets/defaultingCustomer.svg";
import { ReactComponent as CompliantSvg } from "../../assets/compliant.svg";
import "./styles.css";
import colors from "../../style/colors";

function TableChargeClients({ title, defaulter, number, children }) {
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
      {children}
    </Stack>
  );
}

export default TableChargeClients;
