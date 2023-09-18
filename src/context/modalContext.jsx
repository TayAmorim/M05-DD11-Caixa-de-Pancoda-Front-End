import { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [OpenModalEditUser, setOpenModalEditUser] = useState(false);
  const [sucess, setSucess] = useState(false);

  return (
    <ModalContext.Provider value={{ OpenModalEditUser, setOpenModalEditUser, setSucess, sucess }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
