import type { ApplicationStatus, Role, UserStatus } from "@prisma/client";
export declare const userService: {
    getMe: (email: string) => Promise<{
        email: string;
        role: import("@prisma/client").$Enums.Role;
        name: string;
        id: string;
        password: string;
        status: import("@prisma/client").$Enums.UserStatus | null;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | {
        recruiter: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            about: string | null;
            website: string | null;
            location: string | null;
            phone: string | null;
            companyImage: string | null;
            companyName: string | null;
            userId: string;
        } | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        name: string;
        id: string;
        password: string;
        status: import("@prisma/client").$Enums.UserStatus | null;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | {
        applications: {
            status: import("@prisma/client").$Enums.ApplicationStatus;
            createdAt: Date;
            jobId: string;
        }[];
        userInfo: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            about: string | null;
            website: string | null;
            location: string | null;
            phone: string | null;
            userId: string;
            image: string | null;
            linkedin: string | null;
            github: string | null;
            resume: string | null;
        } | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        name: string;
        id: string;
        password: string;
        status: import("@prisma/client").$Enums.UserStatus | null;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getMyApplications: (email: string, limit: number, page: number, search?: string, status?: ApplicationStatus) => Promise<{
        result: ({
            job: {
                recruiter: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    about: string | null;
                    website: string | null;
                    location: string | null;
                    phone: string | null;
                    companyImage: string | null;
                    companyName: string | null;
                    userId: string;
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
    deleteUser: (userId: string) => Promise<{
        email: string;
        role: import("@prisma/client").$Enums.Role;
        name: string;
        id: string;
        password: string;
        status: import("@prisma/client").$Enums.UserStatus | null;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfileInfo: (email: string, body: any) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        about: string | null;
        website: string | null;
        location: string | null;
        phone: string | null;
        companyImage: string | null;
        companyName: string | null;
        userId: string;
    } | {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        about: string | null;
        website: string | null;
        location: string | null;
        phone: string | null;
        userId: string;
        image: string | null;
        linkedin: string | null;
        github: string | null;
        resume: string | null;
    } | undefined>;
    userOverView: (email: string) => Promise<{
        totalJobsApplied: number;
        totalJobsSaved: number;
        totalShortlisted: number;
        recentApplications: ({
            job: {
                recruiter: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    about: string | null;
                    website: string | null;
                    location: string | null;
                    phone: string | null;
                    companyImage: string | null;
                    companyName: string | null;
                    userId: string;
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
            };
        } & {
            id: string;
            status: import("@prisma/client").$Enums.ApplicationStatus;
            createdAt: Date;
            userId: string;
            jobId: string;
        })[];
        applicationByType: {
            REMOTE: number;
            ONSITE: number;
        };
        applicationByContract: {
            FULLTIME: number;
            PARTTIME: number;
            INTERNSHIP: number;
        };
    }>;
    recruiterOverView: (email: string) => Promise<{
        totalJobsPosted: number;
        totalApplications: number;
        totalShortlisted: number;
        activeJobs: number;
        recentApplications: ({
            user: {
                email: string;
                name: string;
                id: string;
            };
            job: {
                recruiter: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    about: string | null;
                    website: string | null;
                    location: string | null;
                    phone: string | null;
                    companyImage: string | null;
                    companyName: string | null;
                    userId: string;
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
            };
        } & {
            id: string;
            status: import("@prisma/client").$Enums.ApplicationStatus;
            createdAt: Date;
            userId: string;
            jobId: string;
        })[];
        applicationByType: {
            REMOTE: number;
            ONSITE: number;
        };
        applicationByContract: {
            FULLTIME: number;
            PARTTIME: number;
            INTERNSHIP: number;
        };
    }>;
    allUsers: (limit: number, page: number) => Promise<{
        users: {
            email: string;
            role: import("@prisma/client").$Enums.Role;
            name: string;
            id: string;
            password: string;
            status: import("@prisma/client").$Enums.UserStatus | null;
            isVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    changeUserRole: (email: string, role: Role) => Promise<{
        email: string;
        role: import("@prisma/client").$Enums.Role;
        name: string;
        id: string;
        password: string;
        status: import("@prisma/client").$Enums.UserStatus | null;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    changeUserStatus: (email: string, status: UserStatus) => Promise<{
        email: string;
        role: import("@prisma/client").$Enums.Role;
        name: string;
        id: string;
        password: string;
        status: import("@prisma/client").$Enums.UserStatus | null;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map