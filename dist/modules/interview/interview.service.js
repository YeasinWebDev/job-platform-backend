import { GoogleGenAI } from "@google/genai";
import prisma from "../../config/prisma.js";
import axios from "axios";
// AI service using Google Gemini API
// You can get a free API key from https://makersuite.google.com/app/apikey
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";
// Alternative: Use a simple rule-based system if no API key is provided
const USE_AI = GEMINI_API_KEY && GEMINI_API_KEY.length > 0;
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
// Generate interview questions using AI or rule-based approach
const generateInterviewQuestions = async (job) => {
    if (USE_AI) {
        try {
            const prompt = `
      Generate exactly 10 interview questions for a ${job.experienceLevel} ${job.title}.

      Required skills:
      ${job.skills.join(", ")}

      Job description:
      ${job.description.join("\n")}

      Return only the questions, one per line.
      `;
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });
            return response
                .text.split("\n")
                .map((q) => q.replace(/^\d+[\).\s-]*/, "").trim())
                .filter(Boolean)
                .slice(0, 10);
        }
        catch (error) {
            console.log(error);
            // Silently fall back to rule-based without logging the error
            // This prevents console spam when API is unreachable
            return generateRuleBasedQuestions(job);
        }
    }
    else {
        return generateRuleBasedQuestions(job);
    }
};
// Rule-based question generation (fallback)
const generateRuleBasedQuestions = (job) => {
    const questions = [];
    const skills = job.skills;
    const level = job.experienceLevel.toLowerCase();
    // General questions
    questions.push(`Tell me about your experience relevant to ${job.title} position.`);
    questions.push(`Why are you interested in this ${job.category.name} role?`);
    // Skill-based questions
    if (skills.length > 0) {
        const topSkills = skills.slice(0, 3);
        topSkills.forEach((skill) => {
            questions.push(`Can you describe your experience with ${skill}?`);
        });
    }
    // Level-specific questions
    if (level === "entry") {
        questions.push("What are your career goals for the first year?");
        questions.push("How do you handle learning new technologies?");
    }
    else if (level === "mid") {
        questions.push("Describe a challenging project you've led or contributed to.");
        questions.push("How do you handle tight deadlines and pressure?");
    }
    else if (level === "senior" || level === "lead") {
        questions.push("How do you mentor junior team members?");
        questions.push("Describe your experience with system design and architecture.");
        questions.push("How do you handle conflicts within a team?");
    }
    return questions.slice(0, 5);
};
// Generate preparation tips
const generatePreparationTips = (job) => {
    const tips = [];
    tips.push(`Research the company and understand their products/services in ${job.category.name}.`);
    tips.push("Review your past projects and prepare to discuss them in detail.");
    tips.push("Practice coding problems if applicable to the role.");
    if (job.skills.length > 0) {
        tips.push(`Brush up on these key skills: ${job.skills.slice(0, 3).join(", ")}.`);
    }
    if (job.experienceLevel === "Entry") {
        tips.push("Focus on demonstrating your eagerness to learn and grow.");
        tips.push("Prepare examples from academic projects or internships.");
    }
    else if (job.experienceLevel === "Senior" || job.experienceLevel === "Lead") {
        tips.push("Prepare to discuss your leadership experience and team management skills.");
        tips.push("Be ready to explain architectural decisions you've made.");
    }
    tips.push("Prepare questions to ask the interviewer about the role and team.");
    tips.push("Practice common behavioral interview questions using the STAR method.");
    return tips.slice(0, 5);
};
// Generate key topics to study
const generateTopics = (job) => {
    const topics = [];
    // Add skills as topics
    job.skills.forEach((skill) => {
        topics.push(skill);
    });
    // Add category-specific topics
    topics.push(`${job.category.name} fundamentals`);
    topics.push("System design principles");
    topics.push("Problem-solving and algorithms");
    if (job.experienceLevel === "Senior" || job.experienceLevel === "Lead") {
        topics.push("Leadership and team management");
        topics.push("Project management");
    }
    return topics.slice(0, 6);
};
// Main service function to generate interview preparation
export const generateInterviewPreparation = async (data) => {
    const { jobId, userId } = data;
    // Fetch job details
    const job = await prisma.job.findUnique({
        where: { id: jobId },
        include: {
            category: true,
        },
    });
    if (!job) {
        throw new Error("Job not found");
    }
    // Check if preparation already exists
    const existingPrep = await prisma.interviewPreparation.findUnique({
        where: {
            userId_jobId: {
                userId,
                jobId,
            },
        },
    });
    if (existingPrep) {
        // Update existing preparation
        const questions = await generateInterviewQuestions({
            title: job.title,
            description: job.description,
            skills: job.skills,
            experienceLevel: job.experienceLevel,
            category: job.category,
        });
        const tips = generatePreparationTips({
            title: job.title,
            description: job.description,
            skills: job.skills,
            experienceLevel: job.experienceLevel,
            category: job.category,
        });
        const topics = generateTopics({
            title: job.title,
            description: job.description,
            skills: job.skills,
            experienceLevel: job.experienceLevel,
            category: job.category,
        });
        return await prisma.interviewPreparation.update({
            where: { id: existingPrep.id },
            data: {
                questions,
                tips,
                topics,
                difficulty: job.experienceLevel,
            },
        });
    }
    else {
        // Create new preparation
        const questions = await generateInterviewQuestions({
            title: job.title,
            description: job.description,
            skills: job.skills,
            experienceLevel: job.experienceLevel,
            category: job.category,
        });
        const tips = generatePreparationTips({
            title: job.title,
            description: job.description,
            skills: job.skills,
            experienceLevel: job.experienceLevel,
            category: job.category,
        });
        const topics = generateTopics({
            title: job.title,
            description: job.description,
            skills: job.skills,
            experienceLevel: job.experienceLevel,
            category: job.category,
        });
        return await prisma.interviewPreparation.create({
            data: {
                jobId,
                userId,
                questions,
                tips,
                topics,
                difficulty: job.experienceLevel,
            },
        });
    }
};
// Get interview preparation for a specific job
export const getInterviewPreparation = async (jobId, userId) => {
    return await prisma.interviewPreparation.findUnique({
        where: {
            userId_jobId: {
                userId,
                jobId,
            },
        },
        include: {
            job: {
                include: {
                    category: true,
                },
            },
        },
    });
};
// Get all interview preparations for a user
export const getUserInterviewPreparations = async (userId) => {
    return await prisma.interviewPreparation.findMany({
        where: { userId },
        include: {
            job: {
                include: {
                    category: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
// Delete interview preparation
export const deleteInterviewPreparation = async (jobId, userId) => {
    return await prisma.interviewPreparation.delete({
        where: {
            userId_jobId: {
                userId,
                jobId,
            },
        },
    });
};
export const interviewService = {
    generateInterviewPreparation,
    getInterviewPreparation,
    getUserInterviewPreparations,
    deleteInterviewPreparation,
};
//# sourceMappingURL=interview.service.js.map