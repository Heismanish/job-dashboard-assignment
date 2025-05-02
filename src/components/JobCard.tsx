import Link from "next/link";
import { Job } from "@/types/job";

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="border-1 p-5 shadow-sm  hover:shadow-md transition bg-white  dark:border-gray-200">
      <h2 className="text-lg font-semibold text-[#4640DE]">{job.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{job.company}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {job.location} · {job.type}
      </p>
      <p className="mt-2 text-sm text-gray-700 line-clamp-3">{job.overview}</p>

      <Link href={`/job/${job.id}`}>
        <button className="mt-4 px-4 py-2 text-sm border border-[#4640DE] text-[#4640DE] rounded-md hover:bg-[#4640DE] hover:text-white transition">
          Apply
        </button>
      </Link>
    </div>
  );
}
