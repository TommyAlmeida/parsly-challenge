import Login from "components/Auth/Login";
import { navigate } from "gatsby";
import * as React from "react";

const LoginPage = () => {
  React.useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
