import React from "react";
import Dashboard from "components/Dashboard/Dashboard";
import asAuthenticatedRoute from "components/Layout/AutheticatedRoute/AuthenticatedRoute";

const DashboardPage = () => {
  return <Dashboard />;
};

export default asAuthenticatedRoute(DashboardPage);
