import type { Request, Response } from "express";
export declare const authService: {
    registerUser: (req: Request, res: Response) => Promise<{
        user: {
            email: string;
            role: import("@prisma/client").$Enums.Role;
            name: string;
            id: string;
            password: string;
            status: import("@prisma/client").$Enums.UserStatus | null;
            isVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
    }>;
    loginUser: (req: Request, res: Response) => Promise<{
        user: {
            email: string;
            role: import("@prisma/client").$Enums.Role;
            name: string;
            id: string;
            password: string;
            status: import("@prisma/client").$Enums.UserStatus | null;
            isVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
    }>;
    sendVerificationEmail: (email: string) => Promise<boolean>;
    verifyEmail: (email: string, code: string) => Promise<boolean>;
};
//# sourceMappingURL=auth.service.d.ts.map