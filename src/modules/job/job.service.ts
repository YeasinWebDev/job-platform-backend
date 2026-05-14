import type { ExperienceLevel, Job, JobContractType, JobStatus, JobType } from "@prisma/client";
import prisma from "../../config/prisma.js";

const createJob = async (userId: string, body: Job) => {
  body.recruiterId = userId;
  const result = await prisma.job.create({ data: body });
  return result;
};

const applyForJob = async (userId: string, jobId: string) => {
  const result = await prisma.application.create({ data: { userId, jobId } });
  return result;
};

const myApplications = async (userId: string, limit: number, page: number, search: string, orderBy: JobType, contractType: JobContractType) => {
  const result = await prisma.application.findMany({
    take: limit,
    skip: (page - 1) * limit,
    where: {
      userId,
      job: {
        title: {
          contains: search,
        },
        ...(contractType && { contract: contractType }),
      },
    },
    orderBy: {
      [orderBy]: "desc",
    },
  });
  return result;
};

const myCreatedJobs = async (userId: string, limit: number, page: number, search: string, orderBy: JobType, contractType: JobContractType) => {
  const result = await prisma.job.findMany({
    take: limit,
    skip: (page - 1) * limit,
    where: {
      title: {
        contains: search,
      },
      ...(contractType && { contract: contractType }),
      userId,
    },
    orderBy: {
      [orderBy]: "desc",
    },
  });
  return result;
};

const updateJob = async (id: string, body: Job) => {
  const result = await prisma.job.update({ where: { id }, data: body });
  return result;
};

const updateJobStatus = async (id: string, status: JobStatus) => {
  const result = await prisma.job.update({ where: { id }, data: { status } });
  return result;
};

const getJobs = async (limit: number, page: number, search: string, location: string, jobType: JobType, category: string, experience: ExperienceLevel, contact: string, salaryMin: string, salaryMax: string, datePosted: string) => {
  const minSalaryNum = salaryMin ? parseInt(salaryMin) : 0;
  const maxSalaryNum = salaryMax ? parseInt(salaryMax) : Infinity;

  // Calculate date filter based on datePosted parameter
  let createdAtFilter: any = {};
  const now = new Date();

  if (datePosted && datePosted !== "any") {
    if (datePosted === "past-24") {
      const past24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      createdAtFilter = { gte: past24h };
    } else if (datePosted === "past-7") {
      const past7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      createdAtFilter = { gte: past7d };
    } else if (datePosted === "past-30") {
      const past30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      createdAtFilter = { gte: past30d };
    } else if (datePosted === "past-90") {
      const past90d = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      createdAtFilter = { gte: past90d };
    }
  }

  const jobs = await prisma.job.findMany({
    take: limit,
    skip: (page - 1) * limit,
    where: {
      title: {
        contains: search,
      },
      ...(location && { location: { contains: location } }),
      ...(category && { categoryId: category }),
      ...(experience && { experienceLevel: experience }),
      ...(Object.keys(createdAtFilter).length > 0 && { createdAt: createdAtFilter }),
    },
    orderBy: {
      [jobType || "createdAt"]: "desc",
    },
  });

  // Filter by salary range in application code since salary is stored as string
  const result = jobs.filter((job) => {
    const jobMinSalary = parseInt(job.minSalary) || 0;
    const jobMaxSalary = parseInt(job.maxSalary) || Infinity;
    return jobMinSalary <= maxSalaryNum && jobMaxSalary >= minSalaryNum;
  });

  return result;
};

const getJob = async (id: string) => {
  const result = await prisma.job.findUnique({ where: { id } });
  return result;
};

const deleteJob = async (id: string) => {
  const result = await prisma.job.delete({ where: { id } });
  return result;
};

export const jobService = {
  createJob,
  applyForJob,
  myApplications,
  myCreatedJobs,
  updateJob,
  updateJobStatus,
  getJobs,
  getJob,
  deleteJob,
};
