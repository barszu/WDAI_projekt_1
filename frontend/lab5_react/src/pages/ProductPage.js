import React, { useState, useEffect } from "react";
import { ProductList } from "../components/ProductList";

import "../styles/productPage.css";

const ProductPage = () => {
    const [fetchedList, setFetchedList] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("null");


    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then(res => {
                return res.json();
            })
            .then( data => {
                // console.log("fetchowanie");
                setFetchedList( prevList =>   data.products);
                setFetchedList( prevList => sortHandler( prevList , sortOption ) );
                setFetchedList( prevList => handleSearch( prevList , searchTerm ) );
            });

    }, [searchTerm , sortOption]);

    const sortHandler = (list , sOption) => {
        let res;
        if (sOption === "asc") {
            res = list.slice().sort((a, b) => a.title.localeCompare(b.title));
        } else if (sOption === "desc") {
            res = list.slice().sort((a, b) => b.title.localeCompare(a.title));
        } else {
            res = list.slice();
        }
        return res;
    };

    const handleSearch = (list , term) => {
        const res = list.slice().filter((product) =>
            product.title.toLowerCase().includes(term.toLowerCase()) ||
            product.description.toLowerCase().includes(term.toLowerCase())
        );
        return res;
    };


    return (
        <>
            <h1>This is Products List Page</h1>;

            <select id="sortSelect" onChange={(e) => setSortOption(e.target.value)}>
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
            {fetchedList && <ProductList list={fetchedList} />}
        </>
        )
};

export default ProductPage;