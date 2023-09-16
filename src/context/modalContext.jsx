import { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [OpenModalEditUser, setOpenModalEditUser] = useState(false);

  return (
    <ModalContext.Provider value={{ OpenModalEditUser, setOpenModalEditUser }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
