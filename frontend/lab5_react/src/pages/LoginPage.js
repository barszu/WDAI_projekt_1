/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/localhost";
const LoginPage = () => {
  const [values, setValues] = useState({ username: "", password: "" });

  const [validation, setValidation] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [backendError, setBackendError] = useState("");

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
      loginApiCall();
    }
  };

  const loginApiCall = async () => {
    setLoading(true);
    const query = await api.ApiCall({
      url: "login",
      method: "POST",
      data: { ...values },
    });
    setLoading(false);
    if (query) {
      window.localStorage.setItem("token", query?.token);
      setLoggedIn(true);
      setValues({ username: "", password: "" });
    } else {
      setBackendError("Bad username or password");
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="page-container">
      <h1>Login Page</h1>
      {loggedIn ? (
        <>
          <h2>You are logged in</h2>
          <Link to="/protected">Go to Protected Page</Link>
          <br />
          <br />
          <button
            onClick={() => {
              setLoggedIn(false);
              window.localStorage.removeItem("token");
            }}
            className="button"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="product">
          <h3>Login</h3>
          {!String(values?.username)?.length && validation && (
            <p className="error">This field is required</p>
          )}
          <input
            disabled={loading}
            className="input"
            type="text"
            placeholder=""
            value={values?.username}
            onChange={(e) => onChangeHandler(e.target.value.trim(), "username")}
          />

          <h3>Password</h3>
          {!String(values?.password)?.length && validation && (
            <p className="error">This field is required</p>
          )}
          <input
            disabled={loading}
            className="input"
            type="password"
            placeholder=""
            value={values?.password}
            onChange={(e) => onChangeHandler(e.target.value, "password")}
          />

          <button
            disabled={loading}
            onClick={() => onClickHandler()}
            className="button"
          >
            Login
          </button>
          {backendError && <p className="error">{backendError}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
