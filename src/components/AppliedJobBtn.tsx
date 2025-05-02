"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppliedJobsButton() {
  const pathname = usePathname();
  // Default to false during SSR
  const isActive = pathname ? pathname === "/jobs-applied" : false;
  return (
    <Link href="/jobs-applied">
      <button
        className={`px-4 py-2 rounded-md font-medium transition 
          ${
            isActive
              ? "bg-[#4640DE] text-white"
              : "text-[#4640DE] border border-[#4640DE] hover:bg-[#4640DE] hover:text-white"
          }`}
      >
        Applied Jobs
      </button>
    </Link>
  );
}
