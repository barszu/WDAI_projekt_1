/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const ProductEdit = ({ details, setNewDetails }) => {
  const [values, setValues] = useState({});

  const [validation, setValidation] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (value, key) => {
    setValues({ ...values, [key]: value });
  };

  const onClickHandler = () => {
    setValidation(false);

    if (
      !!Object.keys(values)?.length &&
      Object.values(values)
        ?.map((item) => !String(item)?.length)
        .includes(true)
    ) {
      setValidation(true);
    } else {
      setLoading(true);
      setNewDetails(values);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setValues(details);
  }, [details]);

  return (
    <>
      {!!Object.keys(values).length ? (
        <div className="product">
          <h3>Product id: {values?.id}</h3>
          <h3>Title</h3>
          {!String(values?.title)?.length && validation && (
            <p className="error">This field is required</p>
          )}
          <input
            disabled={loading}
            className="input"
            type="text"
            placeholder=""
            value={values?.title}
            onChange={(e) => onChangeHandler(e.target.value, "title")}
          />

          <h3>Description</h3>
          {!String(values?.description)?.length && validation && (
            <p className="error">This field is required</p>
          )}
          <textarea
            disabled={loading}
            style={{ resize: "none" }}
            rows="5"
            className="input"
            value={values?.description}
            onChange={(e) =>
              onChangeHandler(e.target.value, "description")
            }
          />

          <h3>Price</h3>
          {!String(values?.price)?.length && validation && (
            <p className="error">This field is required</p>
          )}
          <input
            disabled={loading}
            className="input"
            type="number"
            placeholder=""
            value={values?.price}
            onChange={(e) => onChangeHandler(Number(e.target.value), "price")}
          />

          <button
            disabled={loading}
            onClick={() => onClickHandler()}
            className="button"
          >
            Update product
          </button>
        </div>
      ) : (
        <h3>Empty data</h3>
      )}
    </>
  );
};

export default ProductEdit;
