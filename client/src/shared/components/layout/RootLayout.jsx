import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const RootLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
