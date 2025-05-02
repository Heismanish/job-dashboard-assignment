import { notFound } from "next/navigation";
import { Job } from "@/types/job";

import ApplyForm from "@/components/ApplyForm";
import { jobs } from "@/lib/jobData";

type Params = {
  params: {
    id: string;
  };
};

export default function JobDetailPage({ params }: Params) {
  const job = (jobs as Job[]).find((job) => job.id === params.id);

  if (!job) return notFound();

  return (
    <div className="  space-y-10">
      {/* Job Description Section */}
      <div>
        <h1 className="text-2xl font-bold text-[#4640DE]">{job.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          {job.company} · {job.location}
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          {job.type} · Starting: {job.dateOfJoining}
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-200">
          {job.description}
        </p>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#4640DE]">
            Responsibilities
          </h2>
          <ul className="list-disc list-inside text-sm mt-2 text-gray-700 dark:text-gray-300">
            {job.responsibilities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#4640DE]">Tech Stack</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {job.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-[#4640DE]/10 text-[#4640DE] rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#4640DE]">Salary</h2>
          <p className="text-gray-800 dark:text-gray-200 mt-1">{job.salary}</p>
        </div>
      </div>

      {/* Apply Form Section */}
      <div className="mt-10 border-t pt-8">
        <h2 className="text-xl font-bold text-[#4640DE] mb-4">
          Apply for this job
        </h2>
        <ApplyForm jobId={job.id} />
      </div>
    </div>
  );
}
