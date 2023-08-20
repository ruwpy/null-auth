import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/dashboard/index";
import { Titlebar } from "./components/titlebar";
import { Toaster } from "react-hot-toast";
import { NewAccountPage } from "./pages/dashboard/newAccount";
import { Accounts } from "./pages/dashboard/accounts";
import { ExportPage } from "./pages/qrcodes/export";
import { ImportPage } from "./pages/qrcodes/import";
import { VaultRegisterPage } from "./pages/vault/vaultRegister";
import { useZustandStore } from "./store/useZustandStore";
import { VaultWrapper } from "./components/vaultWrapper";

function App() {
  const { passphrase } = useZustandStore();

  return (
    <>
      <Titlebar />
      <VaultWrapper>
        <Toaster
          position="bottom-center"
          toastOptions={{
            className:
              "bg-neutral-900 text-white rounded-[10px] pl-[20px] ml-[5px] mb-[5px] h-[44px]",
            duration: 2000,
          }}
        />
        <div className="h-[100dvh]">
          {passphrase ? (
            <Router>
              <Routes>
                <Route path="/" element={<MainPage />}>
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/newaccount" element={<NewAccountPage />} />
                  <Route path="/export" element={<ExportPage />} />
                  <Route path="/import" element={<ImportPage />} />
                  <Route path="/settings" element={<Accounts />} />
                </Route>
              </Routes>
            </Router>
          ) : (
            <VaultRegisterPage />
          )}
        </div>
      </VaultWrapper>
    </>
  );
}

export default App;
