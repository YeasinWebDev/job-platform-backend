import prisma from "../../config/prisma.js";
const createCategory = async (name) => {
    const result = await prisma.category.create({ data: { name } });
    return result;
};
const getCategories = async () => {
    const result = await prisma.category.findMany();
    return result;
};
const updateCategory = async (id, name) => {
    const result = await prisma.category.update({ where: { id }, data: { name } });
    return result;
};
const deleteCategory = async (id) => {
    const result = await prisma.category.delete({ where: { id } });
    return result;
};
export default { createCategory, getCategories, updateCategory, deleteCategory };
//# sourceMappingURL=category.service.js.map