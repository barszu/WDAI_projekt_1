import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductPage from './pages/ProductPage';
import Home from './pages/Home';
import Navigation from './Navigation';
import FancyProductPage from "./pages/FancyProductPage";




const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<ProductPage />} />
                    <Route path="fancyProducts" element={<FancyProductPage />} />
                    {/*<Route path="*" element={<NoPage />} />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
