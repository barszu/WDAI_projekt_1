/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/localhost";

import "../styles/main.css";

const ProtectedPage = () => {
  const [auth, setAuth] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loggedInAs, setLoggedInAs] = useState("");

  const checkProtected = async () => {
    if (window.localStorage.getItem("token")) {
      const query = await api.ApiCallAuth({
        url: "protected",
      });

      if (query) {
        setAuth(true);
        setLoading(false);
        setLoggedInAs(query?.logged_in_as);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkProtected();
  }, []);

  return (
    <div className="page-container">
      <h1>Protected</h1>
      {loading ? (
        <div>Ladowanie...</div>
      ) : (
        <>
          {auth ? (
            <>
              <h2>Masz dostep do super hiper tajnej strony!</h2>
              <h1>UDALO CI SIE!</h1>
              <br/>
              <img src="/images/sarnie_zniwo.png" alt="Pan Andrzej i Pan Blazej" />
              <h3>Uzytkownik: {loggedInAs}</h3>
              <button
                onClick={() => {
                  setAuth(false);
                  window.localStorage.removeItem("token");
                }}
                className="button"
              >
                Wyloguj!
              </button>
            </>
          ) : (
            <>
              <h2>Nie no nie jestes zalogowany to nie mozesz tego widziec</h2>
              <h1>Musisz sie zalogowac!</h1>
              <Link to="/login">idz i sie zaloguj!</Link>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProtectedPage;
