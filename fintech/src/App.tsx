import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page from "./components/dashboard/page";
import Users from "./components/users";
import Transactions from "./components/transactions";
import Loans from "./components/loan";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Router>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route index element={<Users />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="loans" element={<Loans />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
