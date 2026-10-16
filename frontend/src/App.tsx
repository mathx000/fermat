import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import CatalogPage from "./pages/CatalogPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalogo" element={<CatalogPage />} />
        <Route path="formulario" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
