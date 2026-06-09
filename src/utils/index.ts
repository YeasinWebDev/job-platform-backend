import type { JobContractType } from "@prisma/client";

export   const normalizeContract = (value: string): JobContractType | undefined => { 
    const v = value
      .trim()
      .toLowerCase()
      .replace(/[\s_-]/g, "");

    if (v === "fulltime") return "FULLTIME";
    if (v === "parttime") return "PARTTIME";

    return undefined;
  };