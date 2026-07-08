import { JobStatus, type ExperienceLevel, type Job, type JobContractType, type JobType } from "@prisma/client";
export declare const jobService: {
    createJob: (email: string, body: Job) => Promise<{
        id: string;
        status: import("@prisma/client").$Enums.JobStatus;
        createdAt: Date;
        location: string;
        title: string;
        description: string[];
        Who_can_apply: string;
        benefits: string | null;
        startDate: Date;
        skills: string[];
        numberOfVacancies: number;
        Duration: string;
        jobType: import("@prisma/client").$Enums.JobType;
        contract: import("@prisma/client").$Enums.JobContractType;
        expiresAt: Date | null;
        categoryId: string;
        experienceLevel: import("@prisma/client").$Enums.ExperienceLevel;
        maxSalary: string;
        minSalary: string;
        other_requirements: string[];
        isDeleted: boolean | null;
        recruiterId: string;
    }>;
    applyForJob: (userId: string, jobId: string) => Promise<{
        id: string;
        status: import("@prisma/client").$Enums.ApplicationStatus;
        createdAt: Date;
        userId: string;
        jobId: string;
    }>;
    myApplications: (userId: string, limit: number, page: number, search: string, orderBy: JobType, contractType: JobContractType) => Promise<{
        id: string;
        status: import("@prisma/client").$Enums.ApplicationStatus;
        createdAt: Date;
        userId: string;
        jobId: string;
    }[]>;
    myCreatedJobs: (email: string, limit: number, page: number, search: string, orderBy: JobType, contractType: JobContractType) => Promise<{
        jobs: ({
            applications: {
                id: string;
                status: import("@prisma/client").$Enums.ApplicationStatus;
                createdAt: Date;
                userId: string;
                jobId: string;
            }[];
        } & {
            id: string;
            status: import("@prisma/client").$Enums.JobStatus;
            createdAt: Date;
            location: string;
            title: string;
            description: string[];
            Who_can_apply: string;
            benefits: string | null;
            startDate: Date;
            skills: string[];
            numberOfVacancies: number;
            Duration: string;
            jobType: import("@prisma/client").$Enums.JobType;
            contract: import("@prisma/client").$Enums.JobContractType;
            expiresAt: Date | null;
            categoryId: string;
            experienceLevel: import("@prisma/client").$Enums.ExperienceLevel;
            maxSalary: string;
            minSalary: string;
            other_requirements: string[];
            isDeleted: boolean | null;
            recruiterId: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    updateJob: (recruiterId: string, id: string, body: Job) => Promise<{
        id: string;
        status: import("@prisma/client").$Enums.JobStatus;
        createdAt: Date;
        location: string;
        title: string;
        description: string[];
        Who_can_apply: string;
        benefits: string | null;
        startDate: Date;
        skills: string[];
        numberOfVacancies: number;
        Duration: string;
        jobType: import("@prisma/client").$Enums.JobType;
        contract: import("@prisma/client").$Enums.JobContractType;
        expiresAt: Date | null;
        categoryId: string;
        experienceLevel: import("@prisma/client").$Enums.ExperienceLevel;
        maxSalary: string;
        minSalary: string;
        other_requirements: string[];
        isDeleted: boolean | null;
        recruiterId: string;
    }>;
    updateJobStatus: (id: string, status: JobStatus) => Promise<{
        id: string;
        status: import("@prisma/client").$Enums.JobStatus;
        createdAt: Date;
        location: string;
        title: string;
        description: string[];
        Who_can_apply: string;
        benefits: string | null;
        startDate: Date;
        skills: string[];
        numberOfVacancies: number;
        Duration: string;
        jobType: import("@prisma/client").$Enums.JobType;
        contract: import("@prisma/client").$Enums.JobContractType;
        expiresAt: Date | null;
        categoryId: string;
        experienceLevel: import("@prisma/client").$Enums.ExperienceLevel;
        maxSalary: string;
        minSalary: string;
        other_requirements: string[];
        isDeleted: boolean | null;
        recruiterId: string;
    }>;
    getJobs: (limit: number, page: number, search: string, location: string, jobType: JobType, category: string, experience: ExperienceLevel, contact: string, salaryMin: string, salaryMax: string, datePosted: string) => Promise<{
        jobs: ({
            recruiter: {
                user: {
                    email: string;
                    name: string;
                    id: string;
                };
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                about: string | null;
                website: string | null;
                location: string | null;
                phone: string | null;
                companyImage: string | null;
                companyName: string | null;
            };
            bookmarkedBy: {
                id: string;
            }[];
        } & {
            id: string;
            status: import("@prisma/client").$Enums.JobStatus;
            createdAt: Date;
            location: string;
            title: string;
            description: string[];
            Who_can_apply: string;
            benefits: string | null;
            startDate: Date;
            skills: string[];
            numberOfVacancies: number;
            Duration: string;
            jobType: import("@prisma/client").$Enums.JobType;
            contract: import("@prisma/client").$Enums.JobContractType;
            expiresAt: Date | null;
            categoryId: string;
            experienceLevel: import("@prisma/client").$Enums.ExperienceLevel;
            maxSalary: string;
            minSalary: string;
            other_requirements: string[];
            isDeleted: boolean | null;
            recruiterId: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getJob: (id: string) => Promise<{
        recruiter: ({
            bookmarkedBy: {
                id: string;
            }[];
        } & {
            id: string;
            status: import("@prisma/client").$Enums.JobStatus;
            createdAt: Date;
            location: string;
            title: string;
            description: string[];
            Who_can_apply: string;
            benefits: string | null;
            startDate: Date;
            skills: string[];
            numberOfVacancies: number;
            Duration: string;
            jobType: import("@prisma/client").$Enums.JobType;
            contract: import("@prisma/client").$Enums.JobContractType;
            expiresAt: Date | null;
            categoryId: string;
            experienceLevel: import("@prisma/client").$Enums.ExperienceLevel;
            maxSalary: string;
            minSalary: string;
            other_requirements: string[];
            isDeleted: boolean | null;
            recruiterId: string;
        }) | null;
        id: string;
        status: import("@prisma/client").$Enums.JobStatus;
        createdAt: Date;
        location: string;
        title: string;
        description: string[];
        Who_can_apply: string;
        benefits: string | null;
        startDate: Date;
        skills: string[];
        numberOfVacancies: number;
        Duration: string;
        jobType: import("@prisma/client").$Enums.JobType;
        contract: import("@prisma/client").$Enums.JobContractType;
        expiresAt: Date | null;
        categoryId: string;
        experienceLevel: import("@prisma/client").$Enums.ExperienceLevel;
        maxSalary: string;
        minSalary: string;
        other_requirements: string[];
        isDeleted: boolean | null;
        recruiterId: string;
    }>;
    allJobs: (limit: number, page: number) => Promise<{
        jobs: ({
            recruiter: {
                user: {
                    email: string;
                    name: string;
                };
                companyImage: string | null;
                companyName: string | null;
            };
            category: {
                name: string;
            };
        } & {
            id: string;
            status: import("@prisma/client").$Enums.JobStatus;
            createdAt: Date;
            location: string;
            title: string;
            description: string[];
            Who_can_apply: string;
            benefits: string | null;
            startDate: Date;
            skills: string[];
            numberOfVacancies: number;
            Duration: string;
            jobType: import("@prisma/client").$Enums.JobType;
            contract: import("@prisma/client").$Enums.JobContractType;
            expiresAt: Date | null;
            categoryId: string;
            experienceLevel: import("@prisma/client").$Enums.ExperienceLevel;
            maxSalary: string;
            minSalary: string;
            other_requirements: string[];
            isDeleted: boolean | null;
            recruiterId: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    allApplications: (limit: number, page: number) => Promise<{
        applications: ({
            user: {
                email: string;
                name: string;
                id: string;
            };
            job: {
                id: string;
                title: string;
            };
        } & {
            id: string;
            status: import("@prisma/client").$Enums.ApplicationStatus;
            createdAt: Date;
            userId: string;
            jobId: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getJobStatusBreakdown: () => Promise<{
        total: number;
        active: number;
        pending: number;
        hold: number;
        expired: number;
    }>;
    getTopRecruiters: (limit?: number) => Promise<{
        id: string;
        companyName: string | null;
        companyImage: string | null;
        name: string;
        email: string;
        totalJobs: number;
    }[]>;
    deleteJob: (id: string) => Promise<{
        id: string;
        status: import("@prisma/client").$Enums.JobStatus;
        createdAt: Date;
        location: string;
        title: string;
        description: string[];
        Who_can_apply: string;
        benefits: string | null;
        startDate: Date;
        skills: string[];
        numberOfVacancies: number;
        Duration: string;
        jobType: import("@prisma/client").$Enums.JobType;
        contract: import("@prisma/client").$Enums.JobContractType;
        expiresAt: Date | null;
        categoryId: string;
        experienceLevel: import("@prisma/client").$Enums.ExperienceLevel;
        maxSalary: string;
        minSalary: string;
        other_requirements: string[];
        isDeleted: boolean | null;
        recruiterId: string;
    }>;
    bookmarkJob: (email: string, jobId: string) => Promise<{
        id: string;
        status: import("@prisma/client").$Enums.JobStatus;
        createdAt: Date;
        location: string;
        title: string;
        description: string[];
        Who_can_apply: string;
        benefits: string | null;
        startDate: Date;
        skills: string[];
        numberOfVacancies: number;
        Duration: string;
        jobType: import("@prisma/client").$Enums.JobType;
        contract: import("@prisma/client").$Enums.JobContractType;
        expiresAt: Date | null;
        categoryId: string;
        experienceLevel: import("@prisma/client").$Enums.ExperienceLevel;
        maxSalary: string;
        minSalary: string;
        other_requirements: string[];
        isDeleted: boolean | null;
        recruiterId: string;
    }>;
    getMyBookmarkedJobs: (email: string) => Promise<({
        recruiter: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            about: string | null;
            website: string | null;
            location: string | null;
            phone: string | null;
            companyImage: string | null;
            companyName: string | null;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.JobStatus;
        createdAt: Date;
        location: string;
        title: string;
        description: string[];
        Who_can_apply: string;
        benefits: string | null;
        startDate: Date;
        skills: string[];
        numberOfVacancies: number;
        Duration: string;
        jobType: import("@prisma/client").$Enums.JobType;
        contract: import("@prisma/client").$Enums.JobContractType;
        expiresAt: Date | null;
        categoryId: string;
        experienceLevel: import("@prisma/client").$Enums.ExperienceLevel;
        maxSalary: string;
        minSalary: string;
        other_requirements: string[];
        isDeleted: boolean | null;
        recruiterId: string;
    })[]>;
    removeMyBookmarkedJob: (email: string, jobId: string) => Promise<{
        id: string;
        status: import("@prisma/client").$Enums.JobStatus;
        createdAt: Date;
        location: string;
        title: string;
        description: string[];
        Who_can_apply: string;
        benefits: string | null;
        startDate: Date;
        skills: string[];
        numberOfVacancies: number;
        Duration: string;
        jobType: import("@prisma/client").$Enums.JobType;
        contract: import("@prisma/client").$Enums.JobContractType;
        expiresAt: Date | null;
        categoryId: string;
        experienceLevel: import("@prisma/client").$Enums.ExperienceLevel;
        maxSalary: string;
        minSalary: string;
        other_requirements: string[];
        isDeleted: boolean | null;
        recruiterId: string;
    }>;
    recruiterApplications: (email: string, limit: number, page: number, search: string, orderBy: string, contractType: JobContractType) => Promise<{
        applications: ({
            user: {
                userInfo: {
                    resume: string | null;
                } | null;
            } & {
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
            job: {
                id: string;
                status: import("@prisma/client").$Enums.JobStatus;
                createdAt: Date;
                location: string;
                title: string;
                description: string[];
                Who_can_apply: string;
                benefits: string | null;
                startDate: Date;
                skills: string[];
                numberOfVacancies: number;
                Duration: string;
                jobType: import("@prisma/client").$Enums.JobType;
                contract: import("@prisma/client").$Enums.JobContractType;
                expiresAt: Date | null;
                categoryId: string;
                experienceLevel: import("@prisma/client").$Enums.ExperienceLevel;
                maxSalary: string;
                minSalary: string;
                other_requirements: string[];
                isDeleted: boolean | null;
                recruiterId: string;
            };
        } & {
            id: string;
            status: import("@prisma/client").$Enums.ApplicationStatus;
            createdAt: Date;
            userId: string;
            jobId: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    updateApplicationStatus: (applicationId: string, status: string) => Promise<{
        id: string;
        status: import("@prisma/client").$Enums.ApplicationStatus;
        createdAt: Date;
        userId: string;
        jobId: string;
    }>;
};
//# sourceMappingURL=job.service.d.ts.map