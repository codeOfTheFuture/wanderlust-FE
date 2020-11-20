import React, { useEffect } from "react";
import { Redirect } from "react-router";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("firebase_jwt");
  }, []);

  return <Redirect to='/signin' />;
};

export default Logout;
