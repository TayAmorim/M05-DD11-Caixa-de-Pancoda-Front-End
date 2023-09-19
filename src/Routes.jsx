import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/index";
import SignUp from "./pages/signUp/index";
import Home from "./pages/home/index";
import NotFoundPage from "./pages/notFound";
import { ModalProvider } from "./context/modalContext";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import LoginRoutes from "./components/LoginRoutes/LoginRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyRoutes() {
  return (
    <>
      <ModalProvider>
        <Routes>
          <Route element={<LoginRoutes redirectTo={"/"} />}>
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
          <Route element={<ProtectedRoutes redirectTo={"/login"} />}>
            <Route path="/*" element={<Home />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ModalProvider>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
