import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/dashboard/index";
import { Toaster } from "react-hot-toast";
import { VaultWrapper } from "./components/vaultWrapper";
import { DataProvider } from "./components/dataProvider";
import { PasswordsPage } from "./pages/dashboard/passwords";
import { CardsPage } from "./pages/dashboard/cards";
import { OtpPage } from "./pages/dashboard/otp";
import styles from "./App.module.scss";
import { SettingsPage } from "./pages/dashboard/settings";

function App() {
  return (
    <>
      <DataProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "rgb(23,23,23)",
              color: "white",
              borderRadius: "10px",
              paddingLeft: "20px",
              marginLeft: "5px",
              marginBottom: "5px",
              height: "44px",
            },
            duration: 2000,
          }}
        />
        <VaultWrapper>
          <div className={styles.routerContainer}>
            <Router>
              <Routes>
                <Route path="/" element={<MainPage />}>
                  <Route path="passwords" element={<PasswordsPage />} />
                  <Route path="cards" element={<CardsPage />} />
                  <Route path="otp" element={<OtpPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Routes>
            </Router>
          </div>
        </VaultWrapper>
      </DataProvider>
    </>
  );
}

export default App;
