import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/index";
import SignUp from "./pages/signUp/index";
import Home from "./pages/home/index";
import NotFoundPage from "./pages/notFound";
import { ModalProvider } from "./context/modalContext";

export default function MyRoutes() {
  return (
    <>
      <ModalProvider>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ModalProvider>
    </>
  );
}
