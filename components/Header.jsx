"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 w-screen flex items-center gap-12 z-50 px-12 py-3 bg-secondary">
      <Link href="/">
        <Button variant="ghost" className="text-3xl font-bold">
          FDA Reports
        </Button>
        {/* <h1 className="text-3xl font-bold">Home</h1> */}
      </Link>
      <Link href="/about">About</Link>
      <Link href="/reports">Reports</Link>
    </header>
  );
}
