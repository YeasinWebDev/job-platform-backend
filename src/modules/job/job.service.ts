import type { Job, JobContractType, JobStatus, JobType } from "@prisma/client";
import prisma from "../../config/prisma.js";

const createJob = async (userId: string, body: Job) => {
  body.userId = userId;
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
        contract: contractType,
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
      contract: contractType,
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

const getJobs = async (limit: number, page: number, search: string, orderBy: JobType, contractType: JobContractType) => {
  const result = await prisma.job.findMany({
    take: limit,
    skip: (page - 1) * limit,
    where: {
      title: {
        contains: search,
      },
      contract: contractType,
    },
    orderBy: {
      [orderBy]: "desc",
    },
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
