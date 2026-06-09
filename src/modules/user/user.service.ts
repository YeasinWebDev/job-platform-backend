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
    });
    return { ...result, applications, userInfo };
  }

  return result;
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

export const userService = { getMe, deleteUser, updateProfileInfo };
