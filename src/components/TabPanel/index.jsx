import "./styles.css";
import HomeSvg from "../../assets/home.svg";
import { Box } from "@mui/material";

export default function VerticalTabs() {
  return (
    <Box className="container-tabs">
      <Box component="button" className="button-tabs">
        <img src={HomeSvg} alt="" />
        Home
      </Box>
      <Box component="button" className="button-tabs">
        <img src={HomeSvg} alt="" />
        Clientes
      </Box>
      <Box component="button" className="button-tabs">
        <img src={HomeSvg} alt="" />
        Cobranças
      </Box>
    </Box>
  );
}
