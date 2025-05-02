export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  overview: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
  dateOfJoining: string;
  salary: string;
};
export interface JobApplication extends Job {
  name: string;
  email: string;
  resumeLink: string;
  coverLetter: string;
  status: "applied" | "in progress" | "rejected";
}
