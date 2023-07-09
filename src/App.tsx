import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { LoginPage } from "./pages/loginPage";
import { RegisterPage } from "./pages/registerPage";
import { AuthProvider } from "./components/authProvider";
import { Titlebar } from "./components/titlebar";
import { useAuth } from "./hooks/useAuth";

function App() {
  return (
    <>
      <Titlebar />
      <AuthProvider>
        <Router>
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
