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
  const [idDetailsCharge, setIdDetailsCharge] = useState("");
  const [detailCharge, setDetailCharge] = useState([]);
  const [customerData, setCustomerData] = useState(false);
  const [isClientUpdated, setIsClientUpdated] = useState(false);
  const [fetchClientList, setFetchClientList] = useState(false);
  const [fetchChargesList, setFetchChargesList] = useState(false);
  const [nameModalCreateCharge, setNameModalCreateCharge] = useState("");
  const [idModalCreateCharge, setIdModalCreateCharge] = useState("");
  const [createdChargeStatus, setCreatedChargeStatus] = useState(false);
  const [infoListCharge, setInfoListCharge] = useState([]);
  const [shareSessionStorage, setShareSessionStorage] = useState([]);

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
        setIsClientUpdated,
        nameModalCreateCharge,
        setNameModalCreateCharge,
        idModalCreateCharge,
        setIdModalCreateCharge,
        fetchClientList,
        setFetchClientList,
        fetchChargesList,
        setFetchChargesList,
        createdChargeStatus,
        setCreatedChargeStatus,
        idDetailsCharge,
        setIdDetailsCharge,
        detailCharge,
        setDetailCharge,
        infoListCharge,
        setInfoListCharge,
        shareSessionStorage,
        setShareSessionStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
