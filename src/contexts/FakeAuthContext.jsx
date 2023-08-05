import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Kailash",
  email: "ksuthar937@gmail.com",
  password: "ksuthar",
  avatar:
    "https://lh3.googleusercontent.com/Zq-BfIsIFPlph1MytU2_8REVkCx5b_oOGP-5sTz_Fs4czUVpzRhwfCuReJ9wWMA1jMYqgw=s85",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used otside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
