import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { CategoriesPage } from "../pages/CategoriesPage";

import { ContactPage } from "../pages/ContactPage";
import { Registro } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";

export const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="nosotros" element={<AboutPage />} />

        <Route path="categorias/:category" element={<CategoriesPage />} />

        <Route path="contacto" element={<ContactPage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="registro" element={<Registro />} />
      </Routes>
    </>
  );
};
