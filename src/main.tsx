import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { VaultWrapper } from "./components/vaultWrapper";
import { DataProvider } from "./components/dataProvider";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <DataProvider>
        <VaultWrapper>
          <RouterProvider router={router} />
        </VaultWrapper>
      </DataProvider>
    </StrictMode>
  );
}
