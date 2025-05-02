"use client";

import { useEffect, useState } from "react";
import { JobApplication } from "@/types/job";
import { jobs } from "@/lib/jobData";

export default function AppliedJobsPage() {
  const [appliedJobs, setAppliedJobs] = useState<JobApplication[]>([]);

  useEffect(() => {
    const storedApplications = JSON.parse(
      localStorage.getItem("jobApplications") || "{}"
    );
    const jobApplications = Object.keys(storedApplications)
      .map((jobId) => {
        const job = jobs.find((job) => job.id === jobId);
        return job ? { ...job, ...storedApplications[jobId] } : null;
      })
      .filter((job) => job !== null);

    setAppliedJobs(jobApplications as JobApplication[]);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-[#4640DE]">Applied Jobs</h1>

      <div className="space-y-4">
        {appliedJobs.length === 0 ? (
          <p className="text-gray-600">
            You have not applied for any jobs yet.
          </p>
        ) : (
          appliedJobs.map((job) => (
            <div
              key={job.id}
              className="border p-4 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:border-gray-600"
            >
              <h2 className="text-xl font-semibold text-[#4640DE]">
                {job.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {job.company}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {job.location}
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-200">
                {job.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
