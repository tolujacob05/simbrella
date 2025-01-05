import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface User {
  createdAt: string;
  name: string;
  account_balance: string;
  recent_transaction: string;
  transaction_type: boolean;
  debit: string;
  credit: string;
  id: string;
}

interface UserContextValue {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://6779319f482f42b62e90a739.mockapi.io/api/v1/users"
      );
      setUsers(response.data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, loading, error, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
