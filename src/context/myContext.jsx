import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");
  const [userData, setUserData] = useState([]);
  const [customerDetailsActive, setCustomerDetailsActive] = useState(false);


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
        customerDetailsActive,
        setCustomerDetailsActive
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
