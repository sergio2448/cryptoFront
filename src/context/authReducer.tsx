export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  auth_token: string | null;
  id: number | null;
  email: string | null;
  username: string | null;
  btc: number | null;
  usd: number | null;
  errorMessage: string;
}

type AuthAction =
  | {
      type: "signUp";
      payload: {
        id: number;
        email: string;
        username: string;
        btc: number;
        usd: number;
        auth_token: string;
      };
    }
  | { type: "addError"; payload: string }
  | { type: "removeError" }
  | { type: "notAuthenticated" }
  | { type: "logout" };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "addError":
      return {
        ...state,
        status: "not-authenticated",
        auth_token: null,
        errorMessage: action.payload,
      };

    case "removeError":
      return {
        ...state,
        errorMessage: "",
      };

    case "signUp":
      return {
        ...state,
        errorMessage: "",
        status: "authenticated",
        auth_token: action.payload.auth_token,
        id: action.payload.id,
        email: action.payload.email,
        username: action.payload.username,
        btc: action.payload.btc,
        usd: action.payload.usd,
      };
    case "logout":
    case "notAuthenticated":
      return {
        ...state,
        status: "not-authenticated",
        auth_token: null,
      };

    default:
      return state;
  }
};
