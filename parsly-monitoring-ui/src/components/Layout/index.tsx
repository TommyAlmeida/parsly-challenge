import React from "react";
import Helmet from "react-helmet";
import Header from "./Header";
import { motion } from "framer-motion";

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = props => {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header />
      <motion.main
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
        style={{ overflow: "hidden auto" }}
      >
        {props.children}
      </motion.main>
    </>
  );
};

export default Layout;
