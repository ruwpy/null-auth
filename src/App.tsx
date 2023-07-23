import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./pages/dashboard/index";
import { LoginPage } from "./pages/auth/loginPage";
import { RegisterPage } from "./pages/auth/registerPage";
import { AuthWrapper } from "./components/authWrapper";
import { Titlebar } from "./components/titlebar";
import { useAuth } from "./hooks/useAuth";
import { Toaster } from "react-hot-toast";

function App() {
  const { session } = useAuth();
  const isAuth = !!session;

  return (
    <>
      <Titlebar />
      <Toaster
        position="bottom-center"
        toastOptions={{
          className:
            "bg-neutral-900 text-white rounded-[10px] pl-[20px] ml-[5px] mb-[5px] h-[44px]",
          duration: 2000,
        }}
      />
      <div className="h-[100dvh]">
        <Router>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <AuthWrapper boolean={isAuth} redirectTo="/login">
                  <MainPage />
                </AuthWrapper>
              }
            >
              <Route path="/dashboard/import" />
              <Route path="/dashboard/export" />
            </Route>
            <Route
              path="/login"
              element={
                <AuthWrapper boolean={!isAuth} redirectTo="/">
                  <LoginPage />
                </AuthWrapper>
              }
            />
            <Route
              path="/register"
              element={
                <AuthWrapper boolean={!isAuth} redirectTo="/">
                  <RegisterPage />
                </AuthWrapper>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
