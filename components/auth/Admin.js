import React, { useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../../actions/auth.action";

const Admin = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    } else if (isAuth().role !== "admin") {
      Router.push("/");
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default Admin;
