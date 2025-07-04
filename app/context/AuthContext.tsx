import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { getProfile, logoutUser } from "~/services/apiAuth";
import type { LoginData, User } from "~/types/auth";

type AuthProviderProps = {
  children: ReactNode;
};

enum ACTION_TYPE {
  LOGIN,
  LOGOUT,
  LOADING,
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type AuthAction =
  | { type: ACTION_TYPE.LOGIN; payload: { user: User } }
  | { type: ACTION_TYPE.LOGOUT }
  | { type: ACTION_TYPE.LOADING };

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case ACTION_TYPE.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case ACTION_TYPE.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case ACTION_TYPE.LOADING:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  console.log(user);

  const handleLogin = async (user: User) => {
    dispatch({ type: ACTION_TYPE.LOGIN, payload: { user } });
  };

  const handleLogout = async () => {
    await logoutUser();
    dispatch({ type: ACTION_TYPE.LOGOUT });
  };

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const result = await getProfile();

        if (result.succeeded) {
          dispatch({
            type: ACTION_TYPE.LOGIN,
            payload: { user: result.data.user },
          });
        } else {
          dispatch({ type: ACTION_TYPE.LOGOUT });
        }
      } catch (error) {
        dispatch({ type: ACTION_TYPE.LOGOUT });
      }
    };
    checkUserSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");

  return context;
}
