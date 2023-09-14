import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import colors from "../../style/colors";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavMenu from "../NavMenu";

export default function MenuHome() {
  const [title, setTitle] = useState("");
  const [changeElement, setChangeElement] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case "/home":
        setChangeElement(true);
        setTitle("Resumo das cobranças");
        break;
      case "/home/clientes":
        setChangeElement(false);
        setTitle("Clientes");
    }
  }, [location]);

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        padding: "5.4rem 5.4rem 2.4rem",
        borderBottom: "1px solid" + colors.Green.light,
      }}
      justifyContent="space-between"
    >
      {changeElement ? <h1>{title}</h1> : <span>{title}</span>}
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          sx={{
            bgcolor: colors.Grey.f,
            color: colors.Green.dark,
            fontSize: "2.2rem",
          }}
        >
          L
        </Avatar>
        <NavMenu />
      </Stack>
    </Stack>
  );
}
