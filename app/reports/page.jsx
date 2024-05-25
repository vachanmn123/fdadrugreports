"use client";
import React, { useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [search, setSearch] = React.useState("");
  const [url, setUrl] = React.useState(
    `https://api.fda.gov/drug/event.json?limit=25&sort=receivedate:desc`
  );
  const [sort, setSort] = React.useState({
    column: "receivedate",
    direction: "desc",
  });

  const toggleSort = (column) => {
    if (sort.column === column) {
      setSort((curr) => ({
        ...curr,
        direction: curr.direction === "asc" ? "desc" : "asc",
      }));
    } else {
      setSort((curr) => ({
        column,
        direction: "asc",
      }));
    }
    startSearch();
  };

  const startSearch = () => {
    if (search === "") {
      setUrl(
        (curr) =>
          `https://api.fda.gov/drug/event.json?limit=25&sort=${sort.column}:${sort.direction}`
      );
    } else {
      setUrl(
        (curr) =>
          `https://api.fda.gov/drug/event.json?limit=25&search=patient.drug.medicinalproduct:${search}&sort=${sort.column}:${sort.direction}`
      );
    }
  };

  return (
    <main className="min-h-screen w-full">
      <h1 className="text-4xl font-bold">Recent Reports</h1>
      <p className="text-md mt-1">
        Here are a list of the recent reports in drugs
      </p>
      <div className="mt-4">
        <>
          <form className="flex w-full gap-5 mb-3" action={startSearch}>
            <Input
              placeholder="Search drug"
              onInput={(e) => setSearch(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>
          <DataTable
            columns={columns}
            url={url}
            toggleSort={toggleSort}
            sortStatus={sort}
          />
        </>
      </div>
    </main>
  );
}
