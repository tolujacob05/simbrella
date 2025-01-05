import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface Loan {
  createdAt: string;
  name: string;
  active_loan: string;
  settled_loan: string;
  total_amount: string;
  purpose: string;
  tenure: string;
  id: string;
}

interface LoanContextValue {
  loans: Loan[];
  loading: boolean;
  error: string | null;
  fetchLoans: () => void;
  createLoan: (newLoan: Omit<Loan, "id" | "createdAt">) => Promise<void>;
}

const LoanContext = createContext<LoanContextValue | undefined>(undefined);

export const LoanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLoans = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://6779319f482f42b62e90a739.mockapi.io/api/v1/loan"
      );
      setLoans(response.data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching loans.");
    } finally {
      setLoading(false);
    }
  };

  const createLoan = async (newLoan: Omit<Loan, "id" | "createdAt">) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://6779319f482f42b62e90a739.mockapi.io/api/v1/loan",
        newLoan
      );
      const createdLoan = response.data;
      setLoans((prevLoans) => [...prevLoans, createdLoan]);
      localStorage.setItem("createdLoan", JSON.stringify(createdLoan));

      // Show success toast
      toast.success("Loan requested successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the loan.");

      // Show error toast
      toast.error("Failed to create the loan.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <LoanContext.Provider
      value={{ loans, loading, error, fetchLoans, createLoan }}
    >
      {children}
    </LoanContext.Provider>
  );
};

export const useLoanContext = (): LoanContextValue => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error("useLoanContext must be used within a LoanProvider");
  }
  return context;
};
