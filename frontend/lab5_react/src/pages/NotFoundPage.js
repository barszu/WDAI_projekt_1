import React from "react";
import { Navigate } from "react-router-dom";

const NotFoundPage = () => {
  //przekierowanie do "/"
  return <Navigate to={"/"} replace={true} />;
};

export default NotFoundPage;
