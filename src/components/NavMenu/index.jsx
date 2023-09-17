import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import colors from "../../style/colors";
import { Stack } from "@mui/material";
import editIcon from "../../assets/editIcon.svg";
import logOut from "../../assets/logOut.svg";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../context/modalContext";
import { AuthContext } from "../../context/myContext";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function NavMenu() {
  const { setOpenModalEditUser } = React.useContext(ModalContext);
  const { userData } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const nameUser = userData.name;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutFunction = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  function openModal() {
    setOpenModalEditUser(true);
  }

  return (
    <>
      <div>
        <Button
          sx={{
            fontSize: "1.8rem",
            textTransform: "capitalize",
            fontWeight: "bold",
            color: colors.Green.normal,
          }}
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="text"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {nameUser.length > 7 ? nameUser.slice(0, 7) + "..." : nameUser}
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <MenuItem
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "90%",
              }}
              onClick={handleClose}
              disableRipple
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={openModal}
              >
                <img
                  style={{ marginBottom: "0.6rem" }}
                  src={editIcon}
                  alt="Edit Icon"
                />
                Editar
              </div>
            </MenuItem>
            <MenuItem
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "3px",
              }}
              onClick={() => {
                handleClose();
                logOutFunction();
              }}
              disableRipple
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={logOut} alt="Logout Icon" />
                Sair
              </div>
            </MenuItem>
          </Stack>
        </StyledMenu>
      </div>
    </>
  );
}
