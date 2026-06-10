<<<<<<< HEAD
=======
import React from "react";
>>>>>>> c840a297ac145680b3dbc05157d1664c0f0c8710
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
