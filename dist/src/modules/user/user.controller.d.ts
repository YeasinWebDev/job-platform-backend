import type { NextFunction, Request, Response } from "express";
export declare const getMe: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getMyApplications: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateProfileInfo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const userOverView: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const recruiterOverView: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const allUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const changeUserRole: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const changeUserStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map