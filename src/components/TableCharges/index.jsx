import { Chip } from "@mui/material";
import "./styles.css";
import { Stack } from "@mui/system";
import colors from "../../style/colors";
import { Link } from "react-router-dom";

export default function TableCharge({ title, color, number, children }) {
  let backgroundChip;
  let colorChip;
  switch (color) {
    case "green":
      backgroundChip = colors.GreenSupport.light;
      colorChip = colors.GreenSupport.normal;
      break;
    case "wine":
      backgroundChip = colors.Wine.light;
      colorChip = colors.Wine.normal;
      break;
    case "yellow":
      backgroundChip = colors.Yellow.light;
      colorChip = colors.Yellow.normal;
      break;
  }
  return (
    <Stack className="table-container">
      <Stack
        className="table-title"
        direction="row"
        justifyContent="center"
        alignContent="center"
        spacing={4}
      >
        <h3>{title}</h3>
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
        className="table-header"
        direction="row"
        justifyContent="space-between"
      >
        <span>Cliente</span>
        <span>ID da cob.</span>
        <span>Valor</span>
      </Stack>

      {children}
    </Stack>
  );
}
