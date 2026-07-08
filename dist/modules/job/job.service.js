import { ApplicationStatus, JobStatus } from "@prisma/client";
import prisma from "../../config/prisma.js";
import { normalizeContract } from "../../utils/index.js";
import AppError from "../../helper/appError.js";
const createJob = async (email, body) => {
    const recruiter = await prisma.recruiter.findUnique({ where: { userId: body.recruiterId } });
    if (!recruiter)
        throw new AppError("Recruiter not found", 404);
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
const applyForJob = async (userId, jobId) => {
    const result = await prisma.application.create({ data: { userId, jobId } });
    return result;
};
const myApplications = async (userId, limit, page, search, orderBy, contractType) => {
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
const myCreatedJobs = async (email, limit, page, search, orderBy, contractType) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new AppError("User not found", 404);
    const recruiter = await prisma.recruiter.findUnique({ where: { userId: user.id } });
    if (!recruiter)
        throw new AppError("Recruiter not found", 404);
    const result = await prisma.job.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: {
            title: {
                contains: search,
                mode: "insensitive",
            },
            isDeleted: false,
            ...(contractType && { contract: contractType }),
            recruiterId: recruiter.id,
        },
        orderBy: {
            [orderBy || "createdAt"]: "desc",
        },
        include: {
            applications: true,
        },
    });
    const total = await prisma.job.count({
        where: {
            title: {
                contains: search,
            },
            isDeleted: false,
            ...(contractType && { contract: contractType }),
            recruiterId: recruiter.id,
        },
    });
    const meta = {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
    return { jobs: result, meta };
};
const updateJob = async (recruiterId, id, body) => {
    const isMyJob = await prisma.job.findUnique({
        where: { id },
    });
    if (!isMyJob)
        throw new AppError("Job not found", 404);
    if (isMyJob.recruiterId !== recruiterId)
        throw new AppError("You can only update your own jobs", 400);
    const result = await prisma.job.update({ where: { id }, data: body });
    return result;
};
const updateJobStatus = async (id, status) => {
    const result = await prisma.job.update({ where: { id }, data: { status } });
    return result;
};
const bookmarkJob = async (email, jobId) => {
    const isUser = await prisma.user.findUnique({ where: { email } });
    if (!isUser)
        throw new AppError("User not found", 404);
    const isJob = await prisma.job.findUnique({ where: { id: jobId } });
    if (!isJob)
        throw new AppError("Job not found", 404);
    const isBookmarked = await prisma.job.findUnique({
        where: {
            id: jobId,
            bookmarkedBy: {
                some: { id: isUser.id }
            }
        }
    });
    if (isBookmarked)
        throw new AppError("Job already bookmarked", 400);
    const result = await prisma.job.update({
        where: { id: jobId },
        data: {
            bookmarkedBy: {
                connect: { id: isUser.id }
            }
        }
    });
    return result;
};
const getMyBookmarkedJobs = async (email) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new AppError("User not found", 404);
    const result = await prisma.job.findMany({
        where: {
            bookmarkedBy: {
                some: { id: user.id }
            }
        },
        include: {
            recruiter: true
        }
    });
    return result;
};
const removeMyBookmarkedJob = async (email, jobId) => {
    const isUser = await prisma.user.findUnique({ where: { email } });
    if (!isUser)
        throw new AppError("User not found", 404);
    const isJob = await prisma.job.findUnique({ where: { id: jobId } });
    if (!isJob)
        throw new AppError("Job not found", 404);
    const isBookmarked = await prisma.job.findUnique({
        where: {
            id: jobId,
            bookmarkedBy: {
                some: { id: isUser.id }
            }
        }
    });
    if (!isBookmarked)
        throw new AppError("Job not bookmarked", 404);
    const result = await prisma.job.update({
        where: { id: jobId },
        data: {
            bookmarkedBy: {
                disconnect: { id: isUser.id }
            }
        }
    });
    return result;
};
const getJobs = async (limit, page, search, location, jobType, category, experience, contact, salaryMin, salaryMax, datePosted) => {
    const minSalaryNum = salaryMin ? parseInt(salaryMin) : 0;
    const maxSalaryNum = salaryMax ? parseInt(salaryMax) : Infinity;
    // Calculate date filter based on datePosted parameter
    let createdAtFilter = {};
    const now = new Date();
    if (datePosted && datePosted !== "any-time") {
        if (datePosted === "past-24") {
            const past24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            createdAtFilter = { gte: past24h };
        }
        else if (datePosted === "past-7") {
            const past7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            createdAtFilter = { gte: past7d };
        }
        else if (datePosted === "past-30") {
            const past30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            createdAtFilter = { gte: past30d };
        }
        else if (datePosted === "past-90") {
            const past90d = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            createdAtFilter = { gte: past90d };
        }
    }
    const contractValues = contact
        ? contact
            .split(",") // example: "fulltime,parttime"
            .map((c) => normalizeContract(c))
            .filter((c) => Boolean(c))
        : [];
    const experienceValues = experience
        ? experience
            .split(",") // example: "entry,mid,senior"
            .filter((e) => Boolean(e))
        : [];
    const whereClause = {
        title: {
            contains: search,
        },
        isDeleted: false,
        status: JobStatus.ACTIVE,
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
            bookmarkedBy: {
                select: {
                    id: true,
                }
            }
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
const getJob = async (id) => {
    const result = await prisma.job.findUnique({ where: { id } });
    if (!result)
        throw new AppError("Job not found", 404);
    const recruiter = await prisma.job.findUnique({
        where: { id },
        include: {
            bookmarkedBy: {
                select: {
                    id: true,
                }
            }
        }
    });
    const ans = { ...result, recruiter: recruiter };
    return ans;
};
const allApplications = async (limit, page) => {
    const [applications, total] = await Promise.all([
        prisma.application.findMany({
            take: limit,
            skip: (page - 1) * limit,
            include: {
                job: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma.application.count(),
    ]);
    const meta = {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
    return { applications, meta };
};
const getTopRecruiters = async (limit = 3) => {
    const recruiters = await prisma.recruiter.findMany({
        take: limit,
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
            _count: {
                select: {
                    jobs: {
                        where: { isDeleted: false },
                    },
                },
            },
        },
        orderBy: {
            jobs: {
                _count: "desc",
            },
        },
    });
    return recruiters.map((r) => ({
        id: r.id,
        companyName: r.companyName,
        companyImage: r.companyImage,
        name: r.user.name,
        email: r.user.email,
        totalJobs: r._count.jobs,
    }));
};
const getJobStatusBreakdown = async () => {
    const [active, pending, hold, expired, total] = await Promise.all([
        prisma.job.count({ where: { isDeleted: false, status: "ACTIVE" } }),
        prisma.job.count({ where: { isDeleted: false, status: "PENDING_PAYMENT" } }),
        prisma.job.count({ where: { isDeleted: false, status: "HOLD" } }),
        prisma.job.count({ where: { isDeleted: false, status: "EXPIRED" } }),
        prisma.job.count({ where: { isDeleted: false } }),
    ]);
    return {
        total,
        active,
        pending,
        hold,
        expired,
    };
};
const allJobs = async (limit, page) => {
    const whereClause = {
        isDeleted: false,
    };
    const [jobs, total] = await Promise.all([
        prisma.job.findMany({
            take: limit,
            skip: (page - 1) * limit,
            where: whereClause,
            include: {
                recruiter: {
                    select: {
                        companyName: true,
                        companyImage: true,
                        user: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
                category: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma.job.count({
            where: whereClause,
        }),
    ]);
    const meta = {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
    return { jobs, meta };
};
const deleteJob = async (id) => {
    const result = await prisma.job.update({ where: { id }, data: { isDeleted: true } });
    return result;
};
const updateApplicationStatus = async (applicationId, status) => {
    const result = await prisma.application.update({
        where: { id: applicationId },
        data: { status: status },
    });
    return result;
};
const recruiterApplications = async (email, limit, page, search, orderBy, contractType) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new AppError("User not found", 404);
    const recruiter = await prisma.recruiter.findUnique({ where: { userId: user.id } });
    if (!recruiter)
        throw new AppError("Recruiter not found", 404);
    const whereClause = {
        job: {
            recruiterId: recruiter.id,
            title: {
                contains: search,
                mode: "insensitive",
            },
            ...(contractType && { contract: contractType }),
        }
    };
    const result = await prisma.application.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: whereClause,
        include: {
            job: true,
            user: {
                include: {
                    userInfo: {
                        select: {
                            resume: true
                        }
                    }
                }
            }
        },
        orderBy: {
            [orderBy || "createdAt"]: "desc",
        },
    });
    const total = await prisma.application.count({
        where: whereClause,
    });
    const meta = {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
    return { applications: result, meta };
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
    allJobs,
    allApplications,
    getJobStatusBreakdown,
    getTopRecruiters,
    deleteJob,
    bookmarkJob,
    getMyBookmarkedJobs,
    removeMyBookmarkedJob,
    recruiterApplications,
    updateApplicationStatus,
};
//# sourceMappingURL=job.service.js.map