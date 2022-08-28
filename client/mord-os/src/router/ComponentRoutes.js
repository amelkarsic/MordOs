import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "../components/layout/MainPage";
import { Login } from "../components/Login";
import { PrivateRoute } from "./PrivateRoute";

export const ComponentRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<MainPage />} />
        </Route>
        <Route path="*" element={<>ERROR</>} />
      </Routes>
    </BrowserRouter>
  );
};
