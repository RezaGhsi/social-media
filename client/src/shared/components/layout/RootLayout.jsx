import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const RootLayout = ({ children }) => {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex flex-col flex-1">
        <Outlet />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
