import React, { useState, useEffect } from "react";
import { ProductList } from "../components/ProductList";

import "../styles/productPage.css";

const ProductPage = () => {
    const [fetchedDataObj, setFetchedDataObj] = useState(null);

    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then(res => {
                return res.json();
            })
            .then( data => {
                // console.log(data);
                setFetchedDataObj(data);
            });

    }, []);

    return (
        <>
            <h1>This is Products List Page</h1>;
            {fetchedDataObj && <ProductList list={fetchedDataObj.products} />}
        </>
        )
};

export default ProductPage;