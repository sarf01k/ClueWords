import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CacheProvider } from "./context/CacheContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CacheProvider>
        <App />
      </CacheProvider>
    </BrowserRouter>
  </StrictMode>
);
