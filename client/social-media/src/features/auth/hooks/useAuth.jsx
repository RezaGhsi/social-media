import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/authStore";
import { registerRequest } from "../api/authApi";

export const useAuth = () => {
  const { state, dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = useCallback(
    async (credentials, redirectTo) => {
      setLoading(true);
      setError(null);
      dispatch({ type: "AUTH_LOADING" });
      try {
        const data = await registerRequest(credentials);

        dispatch({ type: "AUTH_SUCCESS", payload: data.user });
        redirectTo = `/${data.user.username}`;
        navigate(redirectTo, { replace: true });
      } catch (error) {
        const message =
          error.response?.data?.message || "Error Accrued While Registering";

        setError(message);

        dispatch({ type: "AUTH_FAILURE", payload: message });
      } finally {
        setLoading(false);
      }
    },
    [dispatch, navigate],
  );

  return {
    user: state.user,
    isAuthenticated: state.status === "authenticated",
    isInitializing: state.state === "idle" || state.status === "loading",

    register,

    loading,
    error,
    clearError: () => setError(null),
  };
};
