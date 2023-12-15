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
      <h1>Protected Page</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {auth ? (
            <>
              <h2>You can see protected view</h2>
              <img src="/images/sarnie_zniwo.png" alt="Pan Andrzej i Pan Blazej" />
              <h3>Current user: {loggedInAs}</h3>
              <button
                onClick={() => {
                  setAuth(false);
                  window.localStorage.removeItem("token");
                }}
                className="button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <h2>You are not logged in!</h2>
              <Link to="/login">Login</Link>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProtectedPage;
