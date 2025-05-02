import Link from "next/link";
import AppliedJobsButton from "./AppliedJobBtn";

export default function Navbar() {
  return (
    <nav className="w-full h-16  shadow-md  absolute top-0 left-0 z-10 bg-white dark:bg-[#1D1D1D]">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold" style={{ color: "#4640DE" }}>
            JobFinder
          </h1>
        </Link>

        <AppliedJobsButton />
      </div>
    </nav>
  );
}
