import React from "react";
import ReactDOM from "react-dom/client";
import MyRoutes from "./Routes.jsx";
import { BrowserRouter } from "react-router-dom";
import initColor from "./style/stylesRoot.js";
import "./index.css";
import { AuthProvider } from "./context/myContext.jsx";

initColor();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
