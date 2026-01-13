import Link from 'next/link';
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr] items-center justify-items-center min-h-[50vh] p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center sm:text-left">
        <h1 className="text-4xl font-bold">Admin Panel</h1>
        <p className="text-xl">Welcome to the Smart FloodGuard Admin Dashboard.</p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/requests"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            View Help Requests
          </Link>
        </div>
      </main>
    </div>
  );
}
