export const normalizeContract = (value) => {
    const v = value
        .trim()
        .toLowerCase()
        .replace(/[\s_-]/g, "");
    if (v === "fulltime")
        return "FULLTIME";
    if (v === "parttime")
        return "PARTTIME";
    return undefined;
};
//# sourceMappingURL=index.js.map