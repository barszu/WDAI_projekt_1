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
    // Sprawdzenie, czy obiekt 'values' istnieje i ma jakieś klucze
    // oraz czy któraś z wartości w obiekcie 'values' ma długość równą zero
    if (
      !!Object.keys(values)?.length &&
      Object.values(values)
        ?.map((item) => !String(item)?.length)
        .includes(true)
    ) {
      setValidation(true);
    }
    else {
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
    //czy zapytanie cos zwrocilo
    if (query) {
      // Zapisanie tokena do lokalnego magazynu (localStorage) przeglądarki
      window.localStorage.setItem("token", query?.token);
      setLoggedIn(true);
      // Ustawienie stanu 'values' na puste wartości (czyszczenie pól formularza)
      setValues({ username: "", password: "" });
    } else {
      // Jeśli zapytanie nie zwróciło danych, ustawienie błędu na poziomie backendu
      setBackendError("Bad username or password albo serwer nie dziala :)")
    }
  };

  useEffect(() => {
    // czy token jest obecny w localStorage? -> tak -> ustawia loggedIn na true.
    if (window.localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="page-container">
      <h1>Strona do logowania</h1>
      {loggedIn ? (
        // ZALOGOWANY
        <>
          <h2>Jestes juz zalogowany</h2>
          <Link to="/protected">Mozesz juz przejsc do super hiper tajnej podstrony</Link>
          <br />
          <br />
          <button
            onClick={() => {
              setLoggedIn(false);
              window.localStorage.removeItem("token");
            }}
            className="button"
          >
            Wyloguj!
          </button>
        </>
      ) : (
        // NIEZALOGOWANY
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

          <h3>Haslo</h3>
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
            Zaloguj!
          </button>
          {backendError && <p className="error">{backendError}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
