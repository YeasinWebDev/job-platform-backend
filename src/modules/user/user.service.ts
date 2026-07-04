import type { ApplicationStatus } from "@prisma/client";
import prisma from "../../config/prisma.js";
import AppError from "../../helper/appError.js";

const getMe = async (email: string) => {
  const result = await prisma.user.findUnique({ where: { email } });
  if (!result) throw new AppError("User not found", 400);

  if (result.role === "RECRUITER") {
    const recruiter = await prisma.recruiter.findUnique({ where: { userId: result.id } });
    return { ...result, recruiter };
  } else if (result.role === "USER") {
    const userInfo = await prisma.userInfo.findUnique({ where: { userId: result.id } });
    const applications = await prisma.application.findMany({
      where: { userId: result.id },
      select: {
        jobId: true,
        status: true,
        createdAt: true,
      },
    });
    return { ...result, applications, userInfo };
  }

  return result;
};

const getMyApplications = async (email: string, limit: number, page: number, search?: string, status?: ApplicationStatus) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new AppError("User not found", 404);

  const whereClause: any = {
    userId: user.id,
  };

  if (status && status !== "null") {
    whereClause.status = status;
  }

  if (search) {
    whereClause.job = {
      title: {
        contains: search,
        mode: "insensitive",
      },
    };
  }

  const [result, total] = await Promise.all([
    prisma.application.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: whereClause,
      include: {
        job: {
          include:{
            recruiter:true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.application.count({
      where: whereClause,
    }),
  ]);

  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };

  return { result, meta };
};

const deleteUser = async (userId: string) => {
  const result = await prisma.user.delete({ where: { id: userId } });
  return result;
};

const updateProfileInfo = async (email: string, body: any) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError("User not found", 400);
  }

  const { name, ...rest } = body;

  // update base user (only if name exists)
  if (name) {
    await prisma.user.update({
      where: { email },
      data: { name },
    });
  }

  if (user.role === "RECRUITER") {
    const allowedData = {
      about: rest.about,
      companyName: rest.companyName,
      companyImage: rest.companyImage,
      website: rest.recruiterWebsite,
      location: rest.recruiterLocation,
      phone: rest.recruiterPhone,
    };

    return await prisma.recruiter.update({
      where: { userId: user.id },
      data: allowedData,
    });
  }

  if (user.role === "USER") {
    const allowedData = {
      about: rest.about,
      image: rest.image,
      website: rest.website,
      location: rest.location,
      phone: rest.phone,
      linkedin: rest.linkedin,
      github: rest.github,
      resume: rest.resume,
    };

    return await prisma.userInfo.update({
      where: { userId: user.id },
      data: allowedData,
    });
  }
};

const userOverView=async(email:string)=>{
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("User not found", 400);
  }

  const [totalJobsApplied, totalJobsSaved ,totalShortlisted, recentApplications, remoteCount, onsiteCount, fulltimeCount, partTimeCount, internshipCount] = await Promise.all([
    prisma.application.count({
      where: { userId: user.id },
    }),
    prisma.job.count({
      where: { bookmarkedBy: { some: { id: user.id } } },
    }),
    prisma.application.count({
      where: { userId: user.id, status: "SHORTLISTED" },
    }),
    prisma.application.findMany({
      where: { userId: user.id },
      take: 4,
      orderBy: { createdAt: "desc" },
      include: {
        job: {
          include: {
            recruiter:true
          }
        }
      },  
    }),
    prisma.application.count({
      where: { userId: user.id, job: { jobType: "REMOTE" } },
    }),
    prisma.application.count({
      where: { userId: user.id, job: { jobType: "ONSITE" } },
    }),
    prisma.application.count({
      where: { userId: user.id, job: { contract: "FULLTIME" } },
    }),
    prisma.application.count({
      where: { userId: user.id, job: { contract: "PARTTIME" } },
    }),
    prisma.application.count({
      where: { userId: user.id, job: { contract: "INTERNSHIP" } },
    }),
  ]);

  return {
    totalJobsApplied,
    totalJobsSaved,
    totalShortlisted,
    recentApplications,
    applicationByType: {
      REMOTE: remoteCount,
      ONSITE: onsiteCount,
    },
    applicationByContract: {
      FULLTIME: fulltimeCount,
      PARTTIME: partTimeCount,
      INTERNSHIP: internshipCount,
    },
  };
}

const recruiterOverView = async(email:string)=>{
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("User not found", 400);
  }

  const recruiter = await prisma.recruiter.findUnique({
    where: { userId: user.id },
  });

  if (!recruiter) {
    throw new AppError("Recruiter not found", 400);
  }

  const [totalJobsPosted, totalApplications, totalShortlisted, recentApplications, activeJobs, remoteCount, onsiteCount, fulltimeCount, partTimeCount, internshipCount] = await Promise.all([
    prisma.job.count({
      where: { recruiterId: recruiter.id, isDeleted: false },
    }),
    prisma.application.count({
      where: { job: { recruiterId: recruiter.id, isDeleted: false } },
    }),
    prisma.application.count({
      where: { job: { recruiterId: recruiter.id, isDeleted: false }, status: "SHORTLISTED" },
    }),
    prisma.application.findMany({
      where: { job: { recruiterId: recruiter.id, isDeleted: false } },
      take: 4,
      orderBy: { createdAt: "desc" },
      include: {
        job: {
          include: {
            recruiter: true,
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
    }),
    prisma.job.count({
      where: { recruiterId: recruiter.id, isDeleted: false, status: "ACTIVE" },
    }),
    prisma.application.count({
      where: { job: { recruiterId: recruiter.id, isDeleted: false, jobType: "REMOTE" } },
    }),
    prisma.application.count({
      where: { job: { recruiterId: recruiter.id, isDeleted: false, jobType: "ONSITE" } },
    }),
    prisma.application.count({
      where: { job: { recruiterId: recruiter.id, isDeleted: false, contract: "FULLTIME" } },
    }),
    prisma.application.count({
      where: { job: { recruiterId: recruiter.id, isDeleted: false, contract: "PARTTIME" } },
    }),
    prisma.application.count({
      where: { job: { recruiterId: recruiter.id, isDeleted: false, contract: "INTERNSHIP" } },
    }),
  ]);


  return {
    totalJobsPosted,
    totalApplications,
    totalShortlisted,
    activeJobs,
    recentApplications,
    applicationByType: {
      REMOTE: remoteCount,
      ONSITE: onsiteCount,
    },
    applicationByContract: {
      FULLTIME: fulltimeCount,
      PARTTIME: partTimeCount,
      INTERNSHIP: internshipCount,
    },
  };
}

  export const userService = { getMe,getMyApplications, deleteUser, updateProfileInfo,userOverView, recruiterOverView };
