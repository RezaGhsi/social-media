import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../features/auth/pages/RegisterPage";
import HomePage from "../pages/HomePage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/register", element: <RegisterPage /> },
]);
