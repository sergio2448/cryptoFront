import React, { createContext, useReducer, useEffect } from "react";
import walletApi from "../api/walletApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginResponse, LoginData } from "../interfaces/appInterfaces";
import { authReducer, AuthState } from "./authReducer";

type AuthContextProps = {
  errorMessage: string;
  auth_token: string | null;
  status: "checking" | "authenticated" | "not-authenticated";
  signUp: () => void;
  signIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
  id: any;
  usd: any;
  btc: any;
};

const authInicialState: AuthState = {
  status: "checking",
  auth_token: null,
  id: null,
  email: null,
  username: null,
  btc: null,
  usd: null,
  errorMessage: "",
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const auth_token = AsyncStorage.getItem("auth_token");
    if (!auth_token) return dispatch({ type: "notAuthenticated" });
  };

  const signIn = async ({ email, password }: LoginData) => {
    try {
      const { data } = await walletApi.post<LoginResponse>("/user/show", {
        email,
        password,
      });
      dispatch({
        type: "signUp",
        payload: {
          id: data.id,
          email: data.email,
          username: data.username,
          btc: data.btc,
          usd: data.usd,
          auth_token: data.auth_token,
        },
      });

      await AsyncStorage.setItem("auth_token", data.auth_token);
    } catch (error) {
      console.log({ error });
      dispatch({
        type: "addError",
        payload: "Información incorrecta",
      });
    }
  };

  const signUp = () => {};
  const logOut = () => {};
  const removeError = () => {
    dispatch({ type: "removeError" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
