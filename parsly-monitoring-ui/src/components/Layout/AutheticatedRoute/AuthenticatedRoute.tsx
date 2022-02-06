import { navigate } from "gatsby";
import React from "react";

const asAuthenticatedRoute = (Component: React.FC) => (props: any) => {
  if (!localStorage.getItem("accessToken")) {
    navigate("/login");
    return null;
  }
  return <Component {...props} />;
};

export default asAuthenticatedRoute;
