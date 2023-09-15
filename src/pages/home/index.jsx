import { useState } from "react";
import "./index.css";
import ModalEditUser from "../../components/modalEdituser";
import { Button } from "@mui/base";

export default function Home() {
  const [openModalEditUser, setOpenModaEditUser] = useState(false);

  return (
    <>
      <h1>Home</h1>
      <Button onClick={() => setOpenModaEditUser(true)}>Abrir</Button>
      {openModalEditUser && (
        <ModalEditUser
          setOpenModaEditUser={setOpenModaEditUser}
          openModalEditUser={openModalEditUser}
        />
      )}
    </>
  );
}
