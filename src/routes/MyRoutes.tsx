import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../utils/theam";
import App from "../App";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import FrecuentQuestions from "../pages/FrecuentQuestions";
import Login from "../pages/Login";
import ManagementSection from "../pages/ManagementSection";
import Product from "../pages/Product";
import SearchResults from "../pages/SearchResults";
import Stores from "../pages/Stores";
import SellerProfile from "../pages/SellerProfile";
import UserProfile from "../pages/UserProfile";

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="contacto" element={<Contact />} />
            <Route path="preguntasfrecuentes" element={<FrecuentQuestions />} />
            <Route path="login" element={<Login />} />
            <Route path="administracion" element={<ManagementSection />} />
            <Route path="producto/:productoId" element={<Product />} />
            <Route path="resultados/:busqueda" element={<SearchResults />} />
            <Route path="tiendas" element={<Stores />}>
              <Route path=":idTienda" element={<SellerProfile />} />
            </Route>
            <Route path="perfil" element={<UserProfile />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
