import { prisma } from "../config/client";

export const getProducts = () => prisma.product.findMany();
export const getProductById = (id: number) =>
    prisma.product.findUnique({ where: { id } });