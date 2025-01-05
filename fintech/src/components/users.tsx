import { TableCell, TableRow } from "@/components/ui/table";
import TableComponent from "./reusables/table";
import { User, useUserContext } from "@/context/usersContext";
import { formatCurrency } from "@/helpers/helper";
import Pagination from "./reusables/pagination";
import { useState, useMemo } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

function Users() {
  const { users, loading, error } = useUserContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const pageSize = 10; // Number of users per page

  // Filter users based on the search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return users; // Return all users if no search term
    }
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Calculate total pages based on filtered users
  const totalPages = useMemo(() => {
    return Math.ceil(filteredUsers.length / pageSize);
  }, [filteredUsers, pageSize]);

  // Get current page data
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, pageSize]);

  // Handle search input change
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const columns = ["Name", "Account balance", "Recent transactions", "Action"];

  const renderRow = (user: User, index: number) => (
    <TableRow key={index}>
      <TableCell className="text-left dark:text-white">{user.name}</TableCell>
      <TableCell className="text-left dark:text-white">
        {formatCurrency(user.account_balance)}
      </TableCell>
      <TableCell className="text-left dark:text-white">
        {formatCurrency(user.recent_transaction)}
      </TableCell>
      <TableCell className="text-left">
        <button className="text-blue-500 hover:underline">View Details</button>
      </TableCell>
    </TableRow>
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {/* Search Input */}
      <form className="mb-6">
        <div className="relative flex w-56 gap-2 md:gap-20">
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            className="relative shadow-none appearance-none bg-background"
          />
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-blue-400" />
        </div>
      </form>

      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Table Component */}
      <TableComponent
        columns={columns}
        data={paginatedUsers} // Use paginated and filtered data
        renderRow={renderRow}
        isLoading={loading}
        totalRecords={filteredUsers.length} // Total filtered records
      />

      {/* Pagination */}
      <div className="mb-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default Users;
