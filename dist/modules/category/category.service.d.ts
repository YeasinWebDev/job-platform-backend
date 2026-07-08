declare const _default: {
    createCategory: (name: string) => Promise<{
        name: string;
        id: string;
    }>;
    getCategories: () => Promise<{
        name: string;
        id: string;
    }[]>;
    updateCategory: (id: string, name: string) => Promise<{
        name: string;
        id: string;
    }>;
    deleteCategory: (id: string) => Promise<{
        name: string;
        id: string;
    }>;
};
export default _default;
//# sourceMappingURL=category.service.d.ts.map