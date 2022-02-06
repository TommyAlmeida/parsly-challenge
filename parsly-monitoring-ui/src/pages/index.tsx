import React from "react";
import { PageProps } from "gatsby";
import LoginPage from "./login";
import DashboardPage from "./dashboard";

const IndexPage: React.FC<PageProps> = () => {
  const hasToken = localStorage.getItem("accessToken");

  return !hasToken ? <DashboardPage /> : <LoginPage />;
};

export default IndexPage;
