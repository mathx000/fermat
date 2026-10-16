import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import CatalogPage from "./pages/CatalogPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalogo" element={<CatalogPage />} />
        <Route path="produtos/:ref" element={<ProductPage />} />
        <Route path="formulario" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
