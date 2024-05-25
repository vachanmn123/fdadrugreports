"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Button } from "@/components/ui/button";

export function DataTable({ columns, url, toggleSort, sortStatus }) {
  const [processedData, setProcessedData] = React.useState([]);

  useEffect(() => {
    console.log("url", url);
  }, [url]);

  const fetchRecords = async (pageparam = 1) => {
    console.log("fetching", pageparam);
    const res = await fetch(`${url}&skip=${(pageparam - 1) * 25}`);
    if (res.status === 404) {
      return [];
    }
    return (await res.json())["results"];
  };

  const { data, isLoading, error, fetchNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["records", url],
      queryFn: ({ pageParam = 1 }) => fetchRecords(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < 10) {
          return undefined;
        }
        return allPages.length + 1;
      },
    });

  useEffect(() => {
    if (isLoading) return;
    let newData = [];
    for (let i = 0; i < data.pages.length; i++) {
      newData = newData.concat(data.pages[i]);
    }
    setProcessedData(newData);
  }, [data, isLoading]);

  const table = useReactTable({
    data: processedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={header.column.columnDef.meta?.className ?? ""}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.columnDef.meta?.sortable && (
                      <Button
                        variant="ghost"
                        onClick={() =>
                          toggleSort(header.column.columnDef.meta?.sortKey)
                        }
                      >
                        {sortStatus.column ===
                        header.column.columnDef.meta?.sortKey ? (
                          <span
                            className={`${
                              sortStatus.direction === "asc"
                                ? "transform rotate-180"
                                : ""
                            } inline-block`}
                          >
                            &#8593;
                          </span>
                        ) : (
                          <span>&#8597;</span>
                        )}
                      </Button>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, idx) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : isFetching ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length}>
              <Button
                onClick={fetchNextPage}
                className="w-full"
                disabled={isFetching}
              >
                {isFetching ? "Loading more..." : "Load more"}
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
