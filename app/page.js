import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 w-full min-h-screen p-24">
      <h2 className="text-3xl">Home</h2>
      <p>Click on Reports from the Navbar to start</p>
    </div>
  );
}
