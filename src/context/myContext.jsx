import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");
  const [userData, setUserData] = useState([]);
  const [idDelete, setIdDelete] = useState("");
  const [dataCharges, setDataCharges] = useState([]);
  const [dataChargesById, setDataChargesById] = useState([]);
  const [idEdit, setIdEdit] = useState("");
  const [customerData, setCustomerData] = useState(false);
  const [isClientUpdated, setIsClientUpdated] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        alert,
        setAlert,
        name,
        setName,
        userData,
        setUserData,
        idDelete,
        setIdDelete,
        dataCharges,
        setDataCharges,
        dataChargesById,
        setDataChargesById,
        setIdEdit,
        idEdit,
        customerData,
        setCustomerData,
        isClientUpdated,
        setIsClientUpdated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
