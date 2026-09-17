import LoginPage from "./pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import Otp from "./pages/Otp";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./context/AppContext";

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("access_token");

  return accessToken ? children : <Navigate to="/login-register" replace />;
};

const App = () => {
  return (
    <AppProvider>
      <Toaster />
      <Routes>
        <Route path="/login-register" element={<LoginPage />} />
        <Route path="/otp" element={<Otp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/app/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/*"
          element={
            <ProtectedRoute>
              <AppRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
};

export default App;