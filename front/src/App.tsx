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

import React, {
  useContext,
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";
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
import CardListPage from "./container/card-list";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

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

const ErrorPage: React.FC = () => {
  return <div className="App-header">Error Page</div>;
};

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

//================

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

//===================================

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

function App() {
  // const [isLogged, login] = React.useState(false);
  // const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  // const authContextData = {
  //   state: authState,
  //   dispatch: authDispatch,
  // };

  // const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  // const authContextData = { state: authState, dispatch };

  return (
    // <AuthContext.Provider value={authContextData}>
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            // <AuthRoute>
            <WellcomePage />
            // </AuthRoute>
          }
        />
        <Route
          path="/card-list"
          element={
            // <AuthRoute>
            <CardListPage />
            // </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            // <AuthRoute>
            <SignupPage />
            // </AuthRoute>
          }
        />
        <Route
          path="/signup-confirm"
          element={
            // <PrivateRoute>
            <SignupConfirmPage />
            // </PrivateRoute>
          }
        />
        <Route
          path="/signin"
          element={
            // <AuthRoute>
            <SigninPage />
            // </AuthRoute>
          }
        />
        <Route
          path="/recovery"
          element={
            // <AuthRoute>
            <RecoveryPage />
            // </AuthRoute>
          }
        />
        <Route
          path="/recovery-confirm"
          element={
            // <AuthRoute>
            <RecoveryConfirmPage />
            // </AuthRoute>
          }
        />
        <Route
          path="/balance"
          element={
            // <PrivateRoute>
            <BalancePage />
            // </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            // <PrivateRoute>
            <NotificationsPage />
            // </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            // <PrivateRoute>
            <SettingsPage />
            // </PrivateRoute>
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
            // <PrivateRoute>
            <SendPage />
            // </PrivateRoute>
          }
        />
        <Route
          path="/transaction/:transactionId"
          element={
            // <PrivateRoute>
            <TransactionPage />
            // </PrivateRoute>
          }
        />
        <Route path="*" Component={ErrorPage} />
      </Routes>
    </BrowserRouter>
    // </AuthContext.Provider>
  );
}

export default App;
