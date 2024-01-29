import React, { useContext, createContext, useReducer, useEffect } from "react";
import WellcomePage from "./page/home";
import SignupPage from "./page/signup";
import SignupConfirmPage from "./page/signup-confirm";
import SigninPage from "./page/signin";
import RecoveryPage from "./page/recovery";
import RecoveryConfirmPage from "./page/recovery-confirm";
import BalancePage from "./page/balance";
import NotificationsPage from "./page/notifications";
import SettingsPage from "./page/settings";
import ReceivePage from "./page/receive";
import SendPage from "./page/send";
import TransactionPage from "./page/transaction";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { getTokenSession, getUserSession } from "./script/session";

const ErrorPage: React.FC = () => {
  return <div className="App-header">Error Page</div>;
};

// ========== AuthContext.ts ==========
type AuthState = {
  token: string | null;
  user: {
    id: number;
    email: string;
    isConfirm: boolean;
  } | null;
};

type User = {
  id: number;
  email: string;
  isConfirm: boolean;
};

type AuthAction =
  | { type: "LOGIN"; token: string; user: User }
  | { type: "LOGOUT" };

const initialAuthState: AuthState = {
  token: null,
  user: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.token,
        user: {
          id: Number(action.user.id),
          email: action.user.email || "",
          isConfirm: Boolean(action.user.isConfirm),
        },
      };
    case "LOGOUT":
      return { ...state, token: null, user: null };
    default:
      return state;
  }
};

export const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: React.Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.token && !state.user?.isConfirm) {
      // Якщо не підтверджено, перенаправляємо на сторінку підтвердження
      navigate("/signup-confirm");
    }
  }, [state.token, state.user, navigate]);

  // useEffect(() => {
  //   if (!state.token) {
  //     // Якщо користувач не авторизований, перенаправляємо його на сторінку авторизації
  //     navigate("/");
  //   } else if (state.user?.isConfirm === false) {
  //     // Якщо користувач не підтвердив аккаунт, перенаправляємо його на сторінку підтвердження
  //     navigate("/signup-confirm");
  //   }
  // }, [state.token, state.user, navigate]);
  // Якщо користувач авторизований і підтвердив аккаунт, дозволяємо доступ
  return <>{children}</>;
};

// ========== PrivateRoute.tsx ==========
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { state } = useAuth();

  return state.token ? <>{children}</> : <Navigate to="/" replace />;
};

// ====================================
function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  const authContextData = {
    state: authState,
    dispatch: authDispatch,
  };

  // сonst [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    // Отримуємо токен з сесії та користувача
    const token = getTokenSession();
    const userId = getUserSession();
    // const userId = getSession()?.user?.id;

    console.log("Token:", token);
    console.log("UserId:", userId);

    // Перевіряємо, чи є токен та користувач
    if (token && userId) {
      // Встановлюємо стан аутентифікації, якщо токен і користувач існують
      authDispatch({
        type: "LOGIN",
        token,
        user: { id: userId, email: "", isConfirm: false },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={authContextData}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <WellcomePage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element={
              <PrivateRoute>
                <SignupConfirmPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SigninPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <RecoveryPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm"
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
              </AuthRoute>
            }
          />
          <Route
            path="/balance"
            element={
              <PrivateRoute>
                <BalancePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/receive"
            element={
              // <PrivateRoute>
              <ReceivePage />
              // </PrivateRoute>
            }
          />
          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transaction/:id"
            element={
              <PrivateRoute>
                <TransactionPage />
              </PrivateRoute>
            }
          />
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
