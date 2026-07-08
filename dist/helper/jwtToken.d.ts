import { type JwtPayload } from "jsonwebtoken";
type Payload = {
    email: string;
    role: string;
    expiry?: string;
};
export declare const generateToken: ({ email, role, expiry }: Payload) => {
    accessToken: string;
};
export declare const verifyToken: (token: string) => JwtPayload;
export {};
//# sourceMappingURL=jwtToken.d.ts.map