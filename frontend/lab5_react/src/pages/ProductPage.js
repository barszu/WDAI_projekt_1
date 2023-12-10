import React, { useState, useEffect } from "react";
import { ProductList } from "../components/ProductList";

import "../styles/productPage.css";

const ProductPage = () => {
    const [fetchedList, setFetchedList] = useState(null);

    const [resultList, setResultList] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        console.log("useEffect dupa");
        fetch("https://dummyjson.com/products")
            .then(res => {
                return res.json();
            })
            .then( data => {
                // console.log(data);
                setFetchedList(data.products);
                setResultList(data.products)
            });

    }, []);

    const sortHandler = (sortOption) => {
        let res;
        if (sortOption === "asc") {
            res = resultList.slice().sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "desc") {
            res = resultList.slice().sort((a, b) => b.title.localeCompare(a.title));
        } else {
            res = resultList.slice();
        }
        setResultList(res);
    };

    const handleSearch = () => {
        const res = fetchedList.slice().filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResultList(res);
    };


    return (
        <>
            <h1>This is Products List Page</h1>;
            {fetchedList && <ProductList list={fetchedList} />}

            <h1>dupa</h1>

            <select id="sortSelect" onChange={(e) => sortHandler(e.target.value)}>
                <option value="null">Brak sortowania po nazwie</option>
                <option value="asc">Sortuj rosnąco po nazwie</option>
                <option value="desc">Sortuj malejąco po nazwie</option>
            </select>
            <input
                id="searchInput"
                type="search"
                placeholder="wyszukaj po nazwie produktu"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search Products</button>

            {resultList && <ProductList list={resultList} />}
        </>
        )
};

export default ProductPage;