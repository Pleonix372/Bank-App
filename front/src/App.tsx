// import React from "react";
// import Home from "./page/home";

// function App() {
//   return <Home />;
// }

//==========================================================

// return (
//   <AuthContext.Provider value={authContextData}>
//     <BrowserRouter>
//       <Routes>
//         <Route
//           index
//           element={
//             <AuthRoute>
//               <WellcomePage />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <AuthRoute>
//               <SignupPage />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/signup-confirm"
//           element={
//             <PrivateRoute>
//               <SignupConfirmPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/signin"
//           element={
//             <AuthRoute>
//               <SigninPage />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/recovery"
//           element={
//             <AuthRoute>
//               <RecoveryPage />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/recovery-confirm"
//           element={
//             <AuthRoute>
//               <RecoveryConfirmPage />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/balance"
//           element={
//             <PrivateRoute>
//               <BalancePage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/notifications"
//           element={
//             <PrivateRoute>
//               <NotificationsPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/settings"
//           element={
//             <PrivateRoute>
//               <SettingsPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/recive"
//           element={
//             <PrivateRoute>
//               <RecivePage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/send"
//           element={
//             <PrivateRoute>
//               <SendPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/transaction/:transactionId"
//           element={
//             <PrivateRoute>
//               <TransactionPage />
//             </PrivateRoute>
//           }
//         />
//         <Route path="*" Component={Error} />
//       </Routes>
//     </BrowserRouter>
//   </AuthContext.Provider>
// );

//======================================================================

// const ErrorPage: React.FC = () => {
//   return <div className="App-header">Error Page</div>;
// };

// type User = {
//   // Описати необхідні поля користувача
//   username: string;
//   // ...
// };

// type AuthState = {
//   token: string | null;
//   user: User | null;
// };

// type AuthAction =
//   | { type: "LOGIN"; payload: { token: string; user: User } }
//   | { type: "LOGOUT" };

// type AuthContextType = {
//   state: AuthState;
//   dispatch: Dispatch<AuthAction>;
// };

// const initialAuthState: AuthState = {
//   token: null,
//   user: null,
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         token: action.payload.token,
//         user: action.payload.user,
//       };
//     case "LOGOUT":
//       return {
//         token: null,
//         user: null,
//       };
//     default:
//       return state;
//   }
// };

// const AuthRoute: React.FC<{ path: string; element: React.ReactNode }> = ({
//   path,
//   element,
// }) => {
//   const authContext = useContext(AuthContext);

//   if (!authContext) {
//     return null;
//   }

//   return authContext.state.token ? (
//     <Route path={path} element={element} />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// // const PrivateRoute: React.FC<{ path: string; element: React.ReactNode }> = ({
// //   path,
// //   element,
// // }) => {
// //   const authContext = useContext(AuthContext);

// //   if (!authContext) return <ErrorPage />;

// //   return authContext.state.token ? (
// //     <Route path={path} element={element} />
// //   ) : (
// //     <Navigate to="/login" replace />
// //   );
// // };

// type AuthProviderProps = {
//   children: ReactNode;
// };

// const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialAuthState);

//   return (
//     <AuthContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // type ContextType = {
// //   isLogged: boolean;
// //   login: (status: boolean) => void;
// // };

// // const AuthContext = createContext<ContextType | null>(null);

// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const auth = useContext(AuthContext);

//   if (!auth) return <ErrorPage />;

//   return auth.isLogged ? <>{children}</> : <Navigate to="/login" replace />;
// };

// function App() {
//   const [isLogged, login] = React.useState(false);

//   return (
//     <AuthContext.Provider value={authContextData}>
//       <BrowserRouter>
//         <Routes>
//           <Route
//             index
//             element={
//               <AuthRoute>
//                 <WellcomePage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/signup"
//             element={
//               <AuthRoute>
//                 <SignupPage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/signup-confirm"
//             element={
//               <PrivateRoute>
//                 <SignupConfirmPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/signin"
//             element={
//               <AuthRoute>
//                 <SigninPage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/recovery"
//             element={
//               <AuthRoute>
//                 <RecoveryPage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/recovery-confirm"
//             element={
//               <AuthRoute>
//                 <RecoveryConfirmPage />
//               </AuthRoute>
//             }
//           />
//           <Route
//             path="/balance"
//             element={
//               <PrivateRoute>
//                 <BalancePage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/notifications"
//             element={
//               <PrivateRoute>
//                 <NotificationsPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/settings"
//             element={
//               <PrivateRoute>
//                 <SettingsPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/receive"
//             element={
//               <PrivateRoute>
//                 <ReceivePage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/send"
//             element={
//               <PrivateRoute>
//                 <SendPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/transaction/:transactionId"
//             element={
//               <PrivateRoute>
//                 <TransactionPage />
//               </PrivateRoute>
//             }
//           />
//           <Route path="*" Component={ErrorPage} />
//         </Routes>
//       </BrowserRouter>
//     </AuthContext.Provider>
//   );
// }

//==========================================================

// type ContextType = {
//   isLogged: boolean;
//   login: (status: boolean) => void;
// };

// const AuthContext = createContext<ContextType | null>(null);

// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const auth = useContext(AuthContext);

//   if (!auth) return <Error />;

//   return auth.isLogged ? <>{children}</> : <Navigate to="/login" replace />;
// };

// const Profile: React.FC = () => {
//   const { profileId, menuId } = useParams();

//   React.useEffect(() => {
//     alert(`Завантаження даниї для ID: ${profileId}`);
//   }, [profileId]);

//   return (
//     <div className="App-header">
//       Profile Page ID: {profileId} Menu: {menuId}
//     </div>
//   );
// };

// ================

// type ContextType = {
//   isLogged: boolean;
//   login: (status: boolean) => void;
// };

// const AuthContext = createContext<ContextType | null>(null);

// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const auth = useContext(AuthContext);

//   if (!auth) return <ErrorPage />;

//   return auth.isLogged ? <>{children}</> : <Navigate to="/" replace />;
// };

// ===================================

// type User = {
//   username: string;
//   // інші поля користувача, які вам потрібні
// };

// type AuthState = {
//   token: string | null;
//   user: User | null;
// };

// type AuthAction =
//   | { type: "LOGIN"; payload: { token: string; user: User } }
//   | { type: "LOGOUT" };

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         token: action.payload.token,
//         user: action.payload.user,
//       };
//     case "LOGOUT":
//       return {
//         token: null,
//         user: null,
//       };
//     default:
//       return state;
//   }
// };

// const AuthContext = createContext<{
//   state: AuthState;
//   dispatch: Dispatch<AuthAction>;
// } | null>(null);

// const initialAuthState: AuthState = {
//   token: null,
//   user: null,
// };

//=======================================================
//=======================================================
//=======================================================

// const AuthContext = createContext();

// const initialState = {
//   token: null,
//   user: null,
// };

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         ...state,
//         token: action.token,
//         user: action.user,
//       };
//     case "LOGOUT":
//       return initialState;
//     default:
//       return state;
//   }
// };

// const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   return (
//     <AuthContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// interface AuthState {
//   token: string | null;
//   user: any | null; // Замініть `any` на ваш тип користувача
// }

// type AuthAction =
//   | { type: "LOGIN"; token: string; user: any }
//   | { type: "LOGOUT" };

// interface AuthContextProps {
//   state: AuthState;
//   dispatch: React.Dispatch<AuthAction>;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// const initialState: AuthState = {
//   token: null,
//   user: null,
// };

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         ...state,
//         token: action.token,
//         user: action.user,
//       };
//     case "LOGOUT":
//       return initialState;
//     default:
//       return state;
//   }
// };

// const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   return (
//     <AuthContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = (): AuthContextProps => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// //=======================================================

// // const AuthRoute = ({ element }) => {
// //   const { state } = useAuth();

// //   return state.token ? element : <Navigate to="/signin" />;
// // };

// interface AuthRouteProps {
//   element: React.ReactNode;
// }

// const AuthRoute: React.FC<AuthRouteProps> = ({ element }) => {
//   const { state } = useAuth();

//   return state.token ? (
//     (element as React.ReactElement)
//   ) : (
//     <Navigate to="/signin" />
//   );
// };

// //=======================================================

// // const PrivateRoute = ({ element }) => {
// //   const { state } = useAuth();

// //   return state.token ? element : <Navigate to="/signin" />;
// // };

// interface PrivateRouteProps {
//   element: React.ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
//   const { state } = useAuth();

//   return state.token ? (
//     (element as React.ReactElement)
//   ) : (
//     <Navigate to="/signin" />
//   );
// };

//=======================================================

// const handleConfirmation = async () => {
//   // Логіка підтвердження акаунту на бекенді

//   // Після успішного підтвердження, викликати dispatch для оновлення стану аутентифікації
//   dispatch({ type: "LOGIN", token: "yourToken", user: "yourUser" });
// };

//=======================================================

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // ========== AuthContext ==========
// type AuthState = {
//   token: string | null;
//   user: {
//     // власні властивості користувача
//   } | null;
// };

// type AuthAction =
//   | { type: "LOGIN"; token: string; user: object }
//   | { type: "LOGOUT" };

// // Початковий стан
// const initialAuthState: AuthState = {
//   token: null,
//   user: null,
// };

// // Редуктор
// function authReducer(state: AuthState, action: AuthAction): AuthState {
//   switch (action.type) {
//     case "LOGIN":
//       return { ...state, token: action.token, user: action.user };
//     case "LOGOUT":
//       return { ...state, token: null, user: null };
//     default:
//       return state;
//   }
// }

// // Створення контексту
// const AuthContext = createContext<
//   | {
//       state: AuthState;
//       dispatch: React.Dispatch<AuthAction>;
//     }
//   | undefined
// >(undefined);

// // Власний хук для спрощеного використання контексту
// function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }

// Компонент-обгортка, який надає контекст

// // ====================================

// // ========== AuthRoute ==========
// interface AuthRouteProps {
//   children: React.ReactNode;
// }

// const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
//   const { state } = useAuth();

//   return state.token ? <>{children}</> : <Navigate to="/signin" />;
// };
// // ====================================

// // ========== PrivateRoute ==========
// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const { state } = useAuth();

//   return state.token ? <>{children}</> : <Navigate to="/signin" replace />;
// };

//=====================================================
//=====================================================

// function AuthRoute({ children }: { children: React.ReactNode }) {
//   const { state } = useAuth();
//   return state.token ? <>{children}</> : <Navigate to="/signin" />;
// }

// function PrivateRoute({ children }: { children: React.ReactNode }) {
//   const { state } = useAuth();
//   return state.token ? <>{children}</> : <Navigate to="/signin" replace />;
// }

// type ContextType = {
//   isLogged: boolean;
//   login: (status: boolean) => void;
// };

// const AuthContext = createContext<ContextType | null>(null);

// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const auth = useContext(AuthContext);

//   if (!auth) return <ErrorPage />;

//   return auth.isLogged ? <>{children}</> : <Navigate to="/" replace />;
// };

// // ========== AuthContext ==========
// type AuthState = {
//   token: string | null;
//   user: {
//     // власні властивості користувача
//   } | null;
// };

// type AuthAction =
//   | { type: "LOGIN"; token: string; user: object }
//   | { type: "LOGOUT" };

// // Початковий стан
// const initialAuthState: AuthState = {
//   token: null,
//   user: null,
// };

// // Редуктор
// function authReducer(state: AuthState, action: AuthAction): AuthState {
//   switch (action.type) {
//     case "LOGIN":
//       return { ...state, token: action.token, user: action.user };
//     case "LOGOUT":
//       return { ...state, token: null, user: null };
//     default:
//       return state;
//   }
// }

// // Створення контексту
// const AuthContext = createContext<
//   | {
//       state: AuthState;
//       dispatch: React.Dispatch<AuthAction>;
//     }
//   | undefined
// >(undefined);

// // Власний хук для спрощеного використання контексту
// function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }

// // ========== AuthContext.ts ==========
// type AuthState = {
//   token: string | null;
//   user: {
//     id: number;
//     email: string;
//     isConfirm: boolean;
//   } | null;
// };

// type User = {
//   id: number;
//   email: string;
//   isConfirm: boolean;
// };

// type AuthAction =
//   | { type: "LOGIN"; token: string; user: User }
//   | { type: "LOGOUT" };

// const initialAuthState: AuthState = {
//   token: null,
//   user: null,
// };

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         ...state,
//         token: action.token,
//         user: {
//           id: Number(action.user.id),
//           email: action.user.email || "",
//           isConfirm: Boolean(action.user.isConfirm),
//         },
//       };
//     case "LOGOUT":
//       return { ...state, token: null, user: null };
//     default:
//       return state;
//   }
// };

// export const AuthContext = createContext<
//   | {
//       state: AuthState;
//       dispatch: React.Dispatch<AuthAction>;
//     }
//   | undefined
// >(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // ========== AuthRoute.tsx ==========
// // interface AuthRouteProps {
// //   children: React.ReactNode;
// // }

// // const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
// //   const { state } = useAuth();

// //   return state.token ? <Navigate to="/balance" replace /> : <>{children}</>;
// // };

// interface AuthRouteProps {
//   children: React.ReactNode;
// }

// const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
//   const { state } = useAuth();
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   // Перевірка, чи користувач не підтвердив аккаунт
//   //   if (state.token && !state.user?.isConfirm) {
//   //     // Якщо не підтверджено, перенаправляємо на сторінку підтвердження
//   //     navigate("/signup-confirm");
//   //   }
//   // }, [state.token, state.user, navigate]);

//   useEffect(() => {
//     if (state.token && state.user?.isConfirm === false) {
//       navigate("/signup-confirm");
//     }
//   }, [state.token, state.user, navigate]);

//   // Перевірка, чи користувач авторизований
//   if (!state.token) {
//     return <Navigate to="/" replace />;
//   }

//   // Якщо користувач авторизований і підтвердив аккаунт, дозволяємо доступ
//   return <>{children}</>;
// };

// // interface AuthRouteProps {
// //   children: React.ReactNode;
// //   allowUnauthorized?: boolean; // Додайте новий пропс
// // }

// // const AuthRoute: React.FC<AuthRouteProps> = ({
// //   children,
// //   allowUnauthorized = false,
// // }) => {
// //   const { state } = useAuth();

// //   // Перевірка, чи користувач авторизований, якщо allowUnauthorized=false
// //   if (!allowUnauthorized && state.token) {
// //     return <Navigate to="/" replace />;
// //   }

// //   return <>{children}</>;
// // };

// // ========== PrivateRoute.tsx ==========
// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const { state } = useAuth();

//   return state.token ? <>{children}</> : <Navigate to="/" replace />;
// };

// // ========== AuthContext.ts ==========
// type AuthState = {
//   token: string | null;
//   user: {
//     // ваші властивості користувача
//   } | null;
// };

// type AuthAction =
//   | { type: "LOGIN"; token: string; user: object }
//   | { type: "LOGOUT" };

// const initialAuthState: AuthState = {
//   token: null,
//   user: null,
// };

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case "LOGIN":
//       return { ...state, token: action.token, user: action.user };
//     case "LOGOUT":
//       return { ...state, token: null, user: null };
//     default:
//       return state;
//   }
// };

// export const AuthContext = createContext<
//   | {
//       state: AuthState;
//       dispatch: React.Dispatch<AuthAction>;
//     }
//   | undefined
// >(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // ========== AuthRoute.tsx ==========
// interface AuthRouteProps {
//   children: React.ReactNode;
// }

// const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
//   const { state } = useAuth();

//   return state.token ? <>{children}</> : <Navigate to="/" replace />;
// };

// // ========== PrivateRoute.tsx ==========
// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const { state } = useAuth();

//   return state.token ? <>{children}</> : <Navigate to="/" replace />;
// };

//===============================================

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
