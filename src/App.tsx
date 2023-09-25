import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/dashboard/index";
import { Toaster } from "react-hot-toast";
import { NewAccountPage } from "./pages/dashboard/newAccount";
import { Accounts } from "./pages/dashboard/accounts";
import { ExportPage } from "./pages/qrcodes/export";
import { ImportPage } from "./pages/qrcodes/import";
import { VaultWrapper } from "./components/vaultWrapper";
import { DataProvider } from "./components/dataProvider";

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
          <div className="h-[100dvh]">
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
          </div>
        </VaultWrapper>
      </DataProvider>
    </>
  );
}

export default App;
