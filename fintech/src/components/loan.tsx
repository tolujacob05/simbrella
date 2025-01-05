import { TableCell, TableRow } from "@/components/ui/table";
import TableComponent from "./reusables/table";
import { formatCurrency, formatDate } from "@/helpers/helper";
import Pagination from "./reusables/pagination";
import { useState, useEffect } from "react";
import { Loan, useLoanContext } from "@/context/loanContext";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search } from "lucide-react";

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  amount: z.string().nonempty({ message: "Amount is required." }),
  purpose: z.string().nonempty({ message: "Purpose is required." }),
  tenure: z.date({
    required_error: "Tenure is required.",
    invalid_type_error: "Invalid date format.",
  }),
});

function Loans() {
  const { loans, loading, error, createLoan } = useLoanContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>(loans);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of loans per page
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Filter loans based on search query
    const query = searchQuery.toLowerCase();
    const filtered = loans.filter(
      (loan) =>
        loan.name.toLowerCase().includes(query) ||
        loan.purpose.toLowerCase().includes(query)
    );
    setFilteredLoans(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize));
    setCurrentPage(1); // Reset to first page on new search
  }, [searchQuery, loans]);

  const paginatedLoans = filteredLoans.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    "Name",
    "Active loan",
    "Settled loan",
    "Total loan",
    "Purpose",
    "Tenure",
    "Action",
  ];

  const renderRow = (loan: Loan, index: number) => (
    <TableRow key={index}>
      <TableCell className="text-left dark:text-white">{loan.name}</TableCell>
      <TableCell className="text-left dark:text-white">
        {formatCurrency(loan.active_loan)}
      </TableCell>
      <TableCell className="text-left dark:text-white">
        {formatCurrency(loan.settled_loan)}
      </TableCell>
      <TableCell className="text-left dark:text-white">
        {formatCurrency(loan.total_amount)}
      </TableCell>
      <TableCell className="text-left dark:text-white">
        {loan.purpose}
      </TableCell>
      <TableCell className="text-left dark:text-white">
        {formatDate(loan.tenure)}
      </TableCell>
      <TableCell className="text-left">
        <button className="text-blue-500 hover:underline">View Details</button>
      </TableCell>
    </TableRow>
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      amount: "",
      purpose: "",
      tenure: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newLoan = {
      name: `${values.firstname} ${values.lastname}`,
      active_loan: values.amount,
      settled_loan: "0", // Set default or calculated values as needed
      total_amount: values.amount,
      purpose: values.purpose,
      tenure: values.tenure.toISOString(),
    };

    await createLoan(newLoan);
    form.reset();
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <form>
          <div className="relative flex w-full max-w-md">
            <Input
              type="search"
              placeholder="Search loans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative shadow-none appearance-none bg-background"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-blue-400" />
          </div>
        </form>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <Button className="">Request Loan</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle onClick={() => setIsDialogOpen(true)}>
                Request Loan
              </DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <Input placeholder="NGN 20,000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="purpose"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Purpose</FormLabel>
                          <FormControl>
                            <Input placeholder="Business" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tenure"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col space-y-2">
                            <FormLabel>Tenure</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="w-4 h-4 mr-2" />
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(date) => field.onChange(date)}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={loading}>
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {error && <p className="text-red-500">Error: {error}</p>}
      <TableComponent
        columns={columns}
        data={paginatedLoans} // Use paginated data
        renderRow={renderRow}
        isLoading={loading}
        totalRecords={filteredLoans.length}
      />

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

export default Loans;
