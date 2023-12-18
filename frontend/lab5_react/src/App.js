import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsPage from "./pages/ProductsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductEditPage from "./pages/ProductEditPage";
import ProtectedPage from "./pages/ProtectedPage";
import Menu from "./Menu";

// tylko routery do stron
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product/edit/:productId" element={<ProductEditPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="protected" element={<ProtectedPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
