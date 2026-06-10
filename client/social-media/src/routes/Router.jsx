import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../features/auth/pages/RegisterPage";
import HomePage from "../pages/HomePage";
import RootLayout from "../shared/components/layout/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  { path: "/register", element: <RegisterPage /> },
]);
