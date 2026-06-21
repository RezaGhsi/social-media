import { createContext, useContext, useEffect, useReducer } from "react";
import { getMeRequest } from "../api/authApi";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "AUTH_LOADING":
      return { ...state, status: "loading", error: null };

    case "AUTH_SUCCESS":
      return { user: action.payload, status: "authenticated", error: null };

    case "AUTH_FAILURE":
      return { user: null, status: "unauthenticated", error: action.payload };

    case "LOGOUT":
      return { user: null, status: "unauthenticated", error: null };

    default:
      return state;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkSession = async () => {
      dispatch({ type: "AUTH_LOADING" });
      try {
        const { data } = await getMeRequest();
        dispatch({ type: "AUTH_SUCCESS", payload: data.user });
      } catch (error) {
        console.error(error);
        console.log("error status:", error?.response?.status);
        console.log("error message:", error?.message);
        dispatch({ type: "AUTH_FAILURE", payload: null });
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    const handleForcedLogOut = () => dispatch({ type: "LOGOUT" });
    window.addEventListener("auth:logout", handleForcedLogOut);

    return () => window.removeEventListener("auth:logout", handleForcedLogOut);
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used inside <AuthProvider>");
  return context;
}
