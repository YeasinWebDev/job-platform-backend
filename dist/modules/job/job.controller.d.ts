import type { Request, Response, NextFunction } from "express";
export declare const jobController: {
    createJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    applyForJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    myApplications: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    myCreatedJobs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateJobStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getJobs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    allJobs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    allApplications: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getJobStatusBreakdown: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTopRecruiters: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    bookmarkJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMyBookmarkedJobs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    removeMyBookmarkedJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getRecruiterApplications: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateApplicationStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=job.controller.d.ts.map