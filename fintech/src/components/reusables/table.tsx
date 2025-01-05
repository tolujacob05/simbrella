// components/TableComponent.tsx
import React, { useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Lottie from "react-lottie-player";
import lottieJson from "../../../public/json/empty-state.json";

import SkeletonLoader from "./skeleton";
import { useLottieAnimation } from "@/hooks/lottie-animation";

interface TableComponentProps<T> {
  columns: string[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  isLoading: boolean;
  totalRecords?: number;
}

const TableComponent = <T extends object>({
  columns,
  data,
  renderRow,
  isLoading,
  totalRecords,
}: TableComponentProps<T>) => {
  const lottieRef = useRef(null);
  const { isPlaying, handleMouseEnter, handleMouseLeave } =
    useLottieAnimation(12000);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index} className="text-left dark:text-white">
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="w-full text-left">
                <SkeletonLoader
                  count={20}
                  itemHeight="20px"
                  itemWidth="w-full"
                />
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((item, index) => renderRow(item, index))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="p-0">
                <div
                  className="flex items-center justify-center w-full h-[400px] p-4"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Lottie
                    loop={isPlaying}
                    animationData={lottieJson}
                    play={isPlaying}
                    ref={lottieRef}
                    className="w-full max-w-[600px] h-auto"
                  />
                </div>

                <p className="text-base text-center text-gray-500">
                  No data available yet
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {totalRecords && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length - 1}>Total Records</TableCell>
              <TableCell className="text-right">{totalRecords}</TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </>
  );
};

export default TableComponent;
