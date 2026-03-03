import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

type Payload = {
  email: string;
  role: string;
  expiry?: string;
};

export const generateToken = ({ email, role, expiry = "1d" }: Payload) => {
  const secret = process.env.JWT_SECRET_KEY!;

  const token = jwt.sign({ email, role }, secret, {
    algorithm: "HS256",
    expiresIn: expiry,
  } as SignOptions);

  return { accessToken: token };
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET_KEY!;
  return jwt.verify(token, secret as string) as JwtPayload;
};
