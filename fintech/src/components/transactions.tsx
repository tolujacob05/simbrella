import { TableCell, TableRow } from "@/components/ui/table";
import TableComponent from "./reusables/table";
import { User, useUserContext } from "@/context/usersContext";
import { formatCurrency, formatDate } from "@/helpers/helper";
import Pagination from "./reusables/pagination";
import { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

function Transactions() {
  const { users, loading, error } = useUserContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKey, setFilterKey] = useState<
    "date" | "account_balance" | "credit" | "debit" | null
  >(null);
  const pageSize = 10; // Number of users per page

  // Filter and search users based on filterKey and searchTerm
  const filteredUsers = useMemo(() => {
    let result = [...users];

    // Apply search
    if (searchTerm) {
      result = result.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filter
    if (filterKey) {
      result.sort((a, b) => {
        if (filterKey === "date") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return (
          Number(b[filterKey as keyof User]) -
          Number(a[filterKey as keyof User])
        );
      });
    }

    return result;
  }, [users, searchTerm, filterKey]);

  // Calculate total pages dynamically based on filtered users
  const totalPages = useMemo(() => {
    return Math.ceil(filteredUsers.length / pageSize);
  }, [filteredUsers, pageSize]);

  // Get the current page data
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredUsers.slice(start, end);
  }, [filteredUsers, currentPage, pageSize]);

  // Handle search input
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to the first page on new search
  };

  // Handle filtering
  const handleFilter = (
    key: "date" | "account_balance" | "credit" | "debit"
  ) => {
    setFilterKey(key);
    setCurrentPage(1); // Reset to the first page on new filter
  };

  const columns = ["Name", "Debit", "Credit", "Balance", "Date", "Action"];

  const renderRow = (user: User, index: number) => (
    <TableRow key={index}>
      <TableCell className="text-left dark:text-white">{user.name}</TableCell>
      <TableCell className="text-left dark:text-white">
        {formatCurrency(user.debit)}
      </TableCell>
      <TableCell className="text-left dark:text-white">
        {formatCurrency(user.credit)}
      </TableCell>
      <TableCell className="text-left dark:text-white">
        {formatCurrency(user.account_balance)}
      </TableCell>
      <TableCell className="text-left dark:text-white">
        {formatDate(user.createdAt)}
      </TableCell>
      <TableCell className="text-left">
        <button className="text-blue-500 hover:underline">View Details</button>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {/* Search and Dropdown for Filter */}
      <div className="flex items-center justify-between mb-6 ">
        <div className="relative flex w-56 gap-2 md:gap-20">
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name..."
            className="relative shadow-none appearance-none bg-background"
          />
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-blue-400" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>Filter</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleFilter("date")}>
              Date
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilter("account_balance")}>
              Balance
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilter("credit")}>
              Credit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilter("debit")}>
              Debit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {error && <p className="text-red-500">Error: {error}</p>}

      <TableComponent
        columns={columns}
        data={paginatedUsers} // Use paginated data
        renderRow={renderRow}
        isLoading={loading}
        totalRecords={filteredUsers.length}
      />

      <div className="mb-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}

export default Transactions;
