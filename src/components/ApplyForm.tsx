"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type ApplyFormProps = {
  jobId: string;
};

export default function ApplyForm({ jobId }: ApplyFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const router = useRouter();

  // Check if user has already applied when component mounts
  useEffect(() => {
    setMounted(true);

    try {
      const savedApplications = localStorage.getItem("jobApplications");
      if (savedApplications) {
        const applications = JSON.parse(savedApplications);

        // If this job ID exists in applications, user has already applied
        if (applications[jobId]) {
          setAlreadyApplied(true);
          console.log(
            `User already applied to job ${jobId}:`,
            applications[jobId]
          );
        }
      }
    } catch (error) {
      console.error("Error checking application status:", error);
    }
  }, [jobId]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      resumeLink: "",
      coverLetter: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      resumeLink: Yup.string().url("Must be a valid URL").required("Required"),
      coverLetter: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // Only run client-side code after component is mounted
      if (mounted) {
        try {
          // Get existing applications or initialize an empty object
          const applications = JSON.parse(
            localStorage.getItem("jobApplications") || "{}"
          );

          // Save application data (without status)
          applications[jobId] = {
            ...values,
          };

          // Save to localStorage
          localStorage.setItem("jobApplications", JSON.stringify(applications));

          // Verify the data was saved correctly
          const savedData = localStorage.getItem("jobApplications");
          console.log("After saving - Stored in localStorage:", savedData);

          // Reset form and show success message
          formik.resetForm();
          setSubmitted(true);
        } catch (error) {
          console.error("Failed to save application:", error);
        }
      }
    },
  });

  // Reset submitted state after 3 seconds and navigate to applications page
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        router.push("/jobs-applied");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  // If already applied, show message and link to applications
  if (mounted && alreadyApplied) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">
          You have already applied to this job
        </h3>
        <p className="text-yellow-700 mb-4">
          You can check the status of your application and manage all your
          applications in your dashboard.
        </p>
        <button
          onClick={() => router.push("/jobs-applied")}
          className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition"
        >
          View Your Applications
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-200">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full p-2 border  dark:border-gray-200 rounded-md"
            disabled={!mounted}
          />
          {mounted && formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-500">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-200">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full p-2 border dark:border-gray-200 rounded-md"
            disabled={!mounted}
          />
          {mounted && formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-200">
            Resume Link
          </label>
          <input
            type="url"
            name="resumeLink"
            onChange={formik.handleChange}
            value={formik.values.resumeLink}
            className="w-full p-2 border  dark:border-gray-200 rounded-md"
            disabled={!mounted}
          />
          {mounted && formik.touched.resumeLink && formik.errors.resumeLink && (
            <p className="text-sm text-red-500">{formik.errors.resumeLink}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-200">
            Cover Letter
          </label>
          <textarea
            name="coverLetter"
            rows={5}
            onChange={formik.handleChange}
            value={formik.values.coverLetter}
            className="w-full p-2 border  dark:border-gray-200  rounded-md"
            disabled={!mounted}
          />
          {mounted &&
            formik.touched.coverLetter &&
            formik.errors.coverLetter && (
              <p className="text-sm text-red-500">
                {formik.errors.coverLetter}
              </p>
            )}
        </div>

        <button
          type="submit"
          className="bg-[#4640DE] text-white px-6 py-2 rounded-md hover:bg-[#3b38c1] transition"
          disabled={!mounted}
        >
          Submit Application
        </button>
      </form>

      {mounted && submitted && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-4">
          <p className="text-green-700 font-medium">
            Application submitted successfully!
          </p>
          <p className="text-green-600 text-sm mt-1">
            Redirecting to your applications page...
          </p>
        </div>
      )}
    </div>
  );
}
