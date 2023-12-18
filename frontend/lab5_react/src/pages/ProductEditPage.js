/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import ProductEdit from "../components/ProductEdit";

const ProductEditPage = () => {
  // hook useParams z React Router wykorzystuje do pobrania parametrow z adresu URL, w tym przypadku identyfikatora produktu (productId).
  const params = useParams();

  const [details, setDetails] = useState(null); //stare szczegoly produktu
  const [newDetails, setNewDetails] = useState({}); //nowe szczegoly produktu
  const [updated, setUpdated] = useState(false); //czy zaktualizowano produkt

  const getDetails = async (productId) => {
    //pobranie z localStorage produktow spod klucza 'productsList'
    if (localStorage.getItem("productsList")) {
      const productsList = JSON.parse(localStorage.getItem("productsList"));
      //id sa unikalne wiec wystarczy filter
      const product = productsList?.filter(
        (item) => Number(item.id) === Number(productId)
      );
      setDetails(product[0]);
    } else {
      //jak cos sie wydarzylo to pobierz z api
      const query = await api.ApiCall({ url: `products/${productId}` });
      if (query) {
        setDetails(query);
      }
    }
  };

  const updateDetails = async (data) => {
    // Zapisanie zaktualizowanych danych produktu do localStorage
    localStorage.setItem("updatedProduct", JSON.stringify(data));
    setDetails(data);
    setNewDetails({});
    setUpdated(true);
    setTimeout(() => {
      setUpdated(false);
    }, 2000);
  };

  useEffect(() => {
    //po zmianie parametrów w adresie URL...
    if (params?.productId) {
      getDetails(params.productId);
    }
  }, [params?.productId]); //? null.productId -> null

  useEffect(() => {
    // po zmianie stanu newDetails...
    if (!!Object?.keys(newDetails)?.length) { //madrzejsze >0
      updateDetails(newDetails);
    }
  }, [newDetails]);

  return (
    <div className="page-container">
      <h1>Strona do modyfikacji produktu</h1>
      <Link to="/products/">wroc do listy produktow</Link>
      {updated && <h2 className="success">Zaktualizowano!</h2>}
      {details ? (
        //details gotowe -> render
        <ProductEdit details={details} setNewDetails={setNewDetails} />
      ) : (
        //details nie gotowe -> loading
        <div>Ladowanie...</div>
      )}
    </div>
  );
};

export default ProductEditPage;
