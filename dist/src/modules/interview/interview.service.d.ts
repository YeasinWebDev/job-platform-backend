interface InterviewPrepData {
    jobId: string;
    userId: string;
}
export declare const generateInterviewPreparation: (data: InterviewPrepData) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    jobId: string;
    questions: string[];
    tips: string[];
    difficulty: string;
    topics: string[];
}>;
export declare const getInterviewPreparation: (jobId: string, userId: string) => Promise<({
    job: {
        category: {
            name: string;
            id: string;
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
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    jobId: string;
    questions: string[];
    tips: string[];
    difficulty: string;
    topics: string[];
}) | null>;
export declare const getUserInterviewPreparations: (userId: string) => Promise<({
    job: {
        category: {
            name: string;
            id: string;
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
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    jobId: string;
    questions: string[];
    tips: string[];
    difficulty: string;
    topics: string[];
})[]>;
export declare const deleteInterviewPreparation: (jobId: string, userId: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    jobId: string;
    questions: string[];
    tips: string[];
    difficulty: string;
    topics: string[];
}>;
export declare const interviewService: {
    generateInterviewPreparation: (data: InterviewPrepData) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        jobId: string;
        questions: string[];
        tips: string[];
        difficulty: string;
        topics: string[];
    }>;
    getInterviewPreparation: (jobId: string, userId: string) => Promise<({
        job: {
            category: {
                name: string;
                id: string;
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        jobId: string;
        questions: string[];
        tips: string[];
        difficulty: string;
        topics: string[];
    }) | null>;
    getUserInterviewPreparations: (userId: string) => Promise<({
        job: {
            category: {
                name: string;
                id: string;
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        jobId: string;
        questions: string[];
        tips: string[];
        difficulty: string;
        topics: string[];
    })[]>;
    deleteInterviewPreparation: (jobId: string, userId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        jobId: string;
        questions: string[];
        tips: string[];
        difficulty: string;
        topics: string[];
    }>;
};
export {};
//# sourceMappingURL=interview.service.d.ts.map