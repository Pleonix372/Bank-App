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

import React, { useContext, createContext } from "react";
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
// import Page from "./component/page";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";

// const Home: React.FC = () => {
//   return (
//     <div className="App-header">
//       <div>
//         <Link className="App-link" to="/dashboard">
//           Dashboard
//         </Link>
//       </div>
//       <div>
//         <Link className="App-link" to="/login">
//           Login
//         </Link>
//       </div>
//     </div>
//   );
// };

// const Login: React.FC = () => {
//   const auth = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleClick = () => {
//     if (auth) {
//       auth.login(true);
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div onClick={handleClick} className="App-header">
//       Login
//     </div>
//   );
// };

// const Dashboard: React.FC = () => {
//   return <div className="App-header">Dashboard Page</div>;
// };

const Error: React.FC = () => {
  return <div className="App-header">Error Page</div>;
};

type ContextType = {
  isLogged: boolean;
  login: (status: boolean) => void;
};

const AuthContext = createContext<ContextType | null>(null);

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useContext(AuthContext);

  if (!auth) return <Error />;

  return auth.isLogged ? <>{children}</> : <Navigate to="/login" replace />;
};

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

function App() {
  // const [isLogged, login] = React.useState(false);

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
        <Route path="*" Component={Error} />
      </Routes>
    </BrowserRouter>
    // </AuthContext.Provider>
  );
}

//==========================================================

export default App;
