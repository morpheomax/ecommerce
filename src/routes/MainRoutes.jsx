import { Route, Routes } from "react-router-dom";

// Import Publicos
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { CategoriesPage } from "../pages/CategoriesPage";
import { ContactPage } from "../pages/ContactPage";
import { Registro } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";

// Import Cliente registrado

import { CustomerPage } from "../pages/user/CustomerPage";

// import Administracion
import { AdminPage } from "../pages/admin/AdminPage";
import { UserPage } from "../pages/admin/UsersPage";
import { CategoryPage } from "../pages/admin/CategoryPage";
import { VendorPage } from "../pages/admin/VendorPage";

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

        {/* Ruta Cliente logueado */}
        <Route path="user" element={<CustomerPage />} />

        {/* Ruta Administracion */}

        <Route path="admin" element={<AdminPage />} />
        <Route path="useradmin" element={<UserPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="vendor" element={<VendorPage />} />
      </Routes>
    </>
  );
};
