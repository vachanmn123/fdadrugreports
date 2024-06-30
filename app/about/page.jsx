import React from "react";

export default function Page() {
  return (
    <main className="flex flex-col my-14 justify-center items-center">
      <h2 className="text-3xl">About This Project</h2>
      <p className="mt-4">
        This project was built by{" "}
        <a href="https://vachanmn.tech" className="underline">
          Vachan MN
        </a>{" "}
      </p>
    </main>
  );
}
