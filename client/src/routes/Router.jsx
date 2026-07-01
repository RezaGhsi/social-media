import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import HomePage from "../pages/HomePage";
import RootLayout from "../shared/components/layout/RootLayout";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "./../features/users/pages/ProfilePage";
import UploadPage from "../features/posts/pages/UploadPage";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },

  // routes with no layout
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },

  // protected routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/:username",
        element: (
          <RootLayout>
            <ProfilePage />
          </RootLayout>
        ),
      },
      { path: "/upload", element: <UploadPage /> },
    ],
  },
  { path: "/*", element: <NotFound /> },
]);
