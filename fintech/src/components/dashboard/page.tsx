import { AppSidebar } from "@/components/app-sidebar";
import ThemeToggle from "@/components/theme-toggle";

import { Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Outlet, useLocation } from "react-router-dom";

function Page() {
  const location = useLocation();

  const getHeaderText = (path: string) => {
    switch (path) {
      case "/":
        return "Users";
      case "/transactions":
        return "Transaction Management";
      case "/loans":
        return "Loan Management";
      // Add other routes here as needed
      default:
        return "Inventory"; // Default route
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 mr-2" />
          </div>

          <h4 className="text-xl font-semibold text-gray-800 dark:text-[#F4F6FF]">
            {getHeaderText(location.pathname)}
          </h4>

          <Button
            size="icon"
            variant={"ghost"}
            className="w-8 h-8 ml-auto shadow-none bg-inherit"
          >
            <Bell className="w-5 h-5" color="#333333" />
            <span className="sr-only">Toggle notifications</span>
          </Button>

          <Separator className="h-8" orientation="vertical" />

          <ThemeToggle />
          <Separator className="h-8" orientation="vertical" />
        </header>

        <div className="w-full gap-4 p-4 mt-4 ">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Page;
