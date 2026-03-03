import type { Request, Response } from "express";
import prisma from "../../config/prisma.js";
import bcrypt from "bcryptjs";
import AppError from "../../helper/appError.js";
import { generateToken } from "../../helper/jwtToken.js";
import { client } from "../../config/redis.js";
import emailSender from "../../helper/emailSender.js";

const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isUserExist) {
    throw new AppError("User already exist!", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  req.body.password = hashedPassword;

  const user = await prisma.user.create({
    data: req.body,
  });
  const accessToken = await generateToken({ email, role: user.role });

  return { ...accessToken, user };
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!isUserExist) {
    throw new AppError("User not found!", 400);
  }

  const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);
  if (!isPasswordMatch) {
    throw new AppError("Invalid password!", 400);
  }

  const accessToken = await generateToken({ email, role: isUserExist.role });

  return { ...accessToken, user: isUserExist };
};

const sendVerificationEmail = async(email: string) => {
  
  const subject = "Verify your email address";

  const verifycode = Math.floor(100000 + Math.random() * 900000).toString();

  client.set(email, verifycode , {EX: 600});

  await emailSender(email, subject, verifycode);
  return true
};

const verifyEmail = async(email: string, code: string)=>{

  const verifycode = await client.get(email);
  if(verifycode === code){
    await prisma.user.update({
      where: {
        email
      },
      data: {
        isVerified: true
      }
    });
    client.del(email);
    return true;
  }
  return false
}


export const authService = {
  registerUser,
  loginUser,
  sendVerificationEmail,
  verifyEmail
};
