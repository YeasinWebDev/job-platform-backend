import type { ExperienceLevel, Job, JobContractType, JobStatus, JobType } from "@prisma/client";
import prisma from "../../config/prisma.js";
import { normalizeContract } from "../../utils/index.js";
import AppError from "../../helper/appError.js";

const createJob = async (email: string, body: Job) => {
  const recruiter = await prisma.recruiter.findUnique({ where: { userId: body.recruiterId } });
  if (!recruiter) throw new AppError("Recruiter not found", 404);

  const result = await prisma.job.create({
    data: {
      title: body.title,

      description: body.description,

      Who_can_apply: body.Who_can_apply,

      benefits: body.benefits,

      location: body.location,

      startDate: body.startDate ? body.startDate : "",
      expiresAt: body.expiresAt ? body.expiresAt : "",

      skills: body.skills,

      numberOfVacancies: body.numberOfVacancies,

      Duration: body.Duration,

      jobType: body.jobType,

      contract: body.contract,

      status: body.status,

      experienceLevel: body.experienceLevel,

      maxSalary: body.maxSalary,

      minSalary: body.minSalary,

      other_requirements: body.other_requirements,

      recruiter: {
        connect: { id: recruiter.id },
      },

      category: {
        connect: { id: body.categoryId },
      },
    },
  });

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

const getJobs = async (
  limit: number,
  page: number,
  search: string,
  location: string,
  jobType: JobType,
  category: string,
  experience: ExperienceLevel,
  contact: string,
  salaryMin: string,
  salaryMax: string,
  datePosted: string,
) => {
  const minSalaryNum = salaryMin ? parseInt(salaryMin) : 0;
  const maxSalaryNum = salaryMax ? parseInt(salaryMax) : Infinity;

  // Calculate date filter based on datePosted parameter
  let createdAtFilter: any = {};
  const now = new Date();

  if (datePosted && datePosted !== "any-time") {
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

  const contractValues = contact
    ? contact
        .split(",") // example: "fulltime,parttime"
        .map((c) => normalizeContract(c))
        .filter((c): c is JobContractType => Boolean(c))
    : [];

  const experienceValues = experience
    ? experience
        .split(",") // example: "entry,mid,senior"
        .filter((e): e is ExperienceLevel => Boolean(e))
    : [];

  const whereClause = {
    title: {
      contains: search,
    },
    ...(jobType && { jobType }),
    ...(location && { location: { contains: location } }),
    ...(category && { categoryId: category }),
    ...(experienceValues.length > 0 && {
      experienceLevel: { in: experienceValues },
    }),
    ...(contractValues.length > 0 && {
      contract: { in: contractValues },
    }),
    ...(Object.keys(createdAtFilter).length > 0 && {
      createdAt: createdAtFilter,
    }),
  };

  const jobs = await prisma.job.findMany({
    // take: limit,
    // skip: (page - 1) * limit,
    where: whereClause,
    include: {
      recruiter: {
        select: {
          id: true,
          userId: true,
          about: true,
          companyName: true,
          companyImage: true,
          website: true,
          location: true,
          phone: true,
          createdAt: true,
          updatedAt: true,

          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      ["createdAt"]: "desc",
    },
  });

  // STEP 2: salary filter
  const filtered = jobs.filter((job) => {
    const jobMinSalary = parseInt(job.minSalary) || 0;
    const jobMaxSalary = parseInt(job.maxSalary) || Number.MAX_SAFE_INTEGER;

    return jobMinSalary <= maxSalaryNum && jobMaxSalary >= minSalaryNum;
  });

  const total = filtered.length;

  const paginatedJobs = filtered.slice((page - 1) * limit, page * limit);

  return {
    jobs: paginatedJobs,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getJob = async (id: string) => {
  const result = await prisma.job.findUnique({ where: { id } });

  if (!result) throw new AppError("Job not found", 404);

  const recruiter = await prisma.recruiter.findUnique({
    where: { id: result?.recruiterId },
  });

  const ans = { ...result, recruiter: recruiter };

  return ans;
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
