/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import ProductEdit from "../components/ProductEdit";

const ProductEditPage = () => {
  const params = useParams();

  const [details, setDetails] = useState(null);
  const [newDetails, setNewDetails] = useState({});
  const [updated, setUpdated] = useState(false);

  const getDetails = async (productId) => {
    if (localStorage.getItem("productsList")) {
      const productsList = JSON.parse(localStorage.getItem("productsList"));
      const product = productsList?.filter(
        (item) => Number(item.id) === Number(productId)
      );
      setDetails(product[0]);
    } else {
      const query = await api.ApiCall({ url: `products/${productId}` });
      if (query) {
        setDetails(query);
      }
    }
  };

  const updateDetails = async (data) => {
    localStorage.setItem("updatedProduct", JSON.stringify(data));
    setDetails(data);
    setNewDetails({});
    setUpdated(true);
    setTimeout(() => {
      setUpdated(false);
    }, 2000);
  };

  useEffect(() => {
    if (params?.productId) {
      getDetails(params.productId);
    }
  }, [params?.productId]);

  useEffect(() => {
    if (!!Object?.keys(newDetails)?.length) {
      updateDetails(newDetails);
    }
  }, [newDetails]);

  return (
    <div className="page-container">
      <h1>Edit Product Page</h1>
      <Link to="/products/">Back to Products List Page</Link>
      {updated && <h2 className="success">Product updated</h2>}
      {details ? (
        <ProductEdit details={details} setNewDetails={setNewDetails} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProductEditPage;
