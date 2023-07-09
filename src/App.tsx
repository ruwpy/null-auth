import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { LoginPage } from "./pages/loginPage";
import { RegisterPage } from "./pages/registerPage";
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
        position="bottom-left"
        toastOptions={{
          className:
            "bg-neutral-900 text-white rounded-[10px] pl-[20px] ml-[5px] mb-[5px] h-[44px]",
          duration: 2000,
        }}
      />
      <Router>
        <Routes>
          <Route
            index
            element={
              <AuthWrapper boolean={isAuth} redirectTo="/login">
                <MainPage />
              </AuthWrapper>
            }
          />
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
    </>
  );
}

export default App;
