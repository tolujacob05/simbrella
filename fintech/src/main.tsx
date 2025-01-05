import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./context/usersContext.tsx";
import { LoanProvider } from "./context/loanContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <LoanProvider>
        <App />
      </LoanProvider>
    </UserProvider>
  </StrictMode>
);
