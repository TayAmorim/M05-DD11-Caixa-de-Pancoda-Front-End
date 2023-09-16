import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [paidValue, setPaidValue] = useState(0);
  const [pendingValue, setPendingValue] = useState(0);
  const [expiredValue, setExpiredValue] = useState(0);
  const [paidClient, setPaidClient] = useState([]);
  const [pendingClient, setPendingClient] = useState([]);
  const [expiredClient, setExpiredClient] = useState([]);
  const [shareDataBillings, setShareDataBillings] = useState([]);
  const [data, setData] = useState([]);
  const [idDelete, setIdDelete] = useState("");

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
        confirmPassword,
        setConfirmPassword,
        paidValue,
        setPaidValue,
        pendingValue,
        setPendingValue,
        expiredValue,
        setExpiredValue,
        paidClient,
        setPaidClient,
        pendingClient,
        setPendingClient,
        expiredClient,
        setExpiredClient,
        shareDataBillings,
        setShareDataBillings,
        idDelete,
        setIdDelete,
        data,
        setData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
