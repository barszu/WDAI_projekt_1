/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ProductsList from "../components/ProductsList";
import api from "../api";
import "../styles/productPage.css";

const ProductsPage = () => {
  const [list, setList] = useState([]);
  const [defaultList, setDefaultList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("");

  const setLists = (values) => {
    setList(values);
    setDefaultList(values);
    // sortHandler(list , defaultList);
    // searchHandler(list, defaultList);
  };

  const getList = async () => {
    if (localStorage.getItem("productsList")) {
      const productsList = JSON.parse(localStorage.getItem("productsList"));
      if (localStorage.getItem("updatedProduct")) {
        const updatedProduct = JSON.parse(
          localStorage.getItem("updatedProduct")
        );

        //dla kazdego obj z productsList
        const newProductsList = productsList.map((obj) => {
          if (Number(obj.id) === Number(updatedProduct.id)) { //madre porownywanie dla id
            return { ...obj, ...updatedProduct }; //nowy obiekt sklejka tych dwoch
          }

          return obj; //zostaw nieruszony
        });

        localStorage.removeItem("updatedProduct");
        setLists(newProductsList);
        localStorage.setItem("productsList", JSON.stringify(newProductsList));
      }
      else {
        setLists(productsList);
        localStorage.setItem("productsList", JSON.stringify(productsList));
      }
    }
    else { //zaciagnij dane
      const query = await api.ApiCall({ url: "products" });
      if (query) {
        setLists(query?.products);
        localStorage.setItem("productsList", JSON.stringify(query?.products));
      }
    }
  };

  useEffect(() => {
    //przy starcie wez liste
    getList();
  }, []);

  const handleSort = (list , sOption) => {
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

  const searchANDsortProducts = (list , term , sOption) => {
    let res = handleSearch(list , term);
    res = handleSort(res , sOption);
    setList(res);
  }

  return (
    <div className="page-container">
      <h1>Strona z produktami</h1>
      <select
        id="sortSelect"
        className="select"
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Brak sortowania po nazwie</option>
        <option value="asc">Sortuj rosnąco po nazwie</option>
        <option value="desc">Sortuj malejąco po nazwie</option>
      </select>
      <input
        id="searchInput"
        className="input"
        type="search"
        placeholder="wyszukaj po nazwie produktu"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="searchButton"
          onClick={(e) => {
            searchANDsortProducts(defaultList , searchValue , sortOption)
          }}>
        Szukaj...
      </button >
      {!!list.length ? <ProductsList list={list} /> : <div>Loading...</div>}
    </div>
  );
};

export default ProductsPage;
