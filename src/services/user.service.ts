
import bcrypt from "bcrypt";
import { prisma } from "../config/client";

const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string,
    password: string
) => {
    const hashedPassword = await bcrypt.hash(password, 12);

    return prisma.user.create({
        data: {
            username: email,
            password: hashedPassword,
            fullName,
            address,
            accountType: "USER",
        },
    });
};

const getAllUser = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            username: true,
            fullName: true,
            address: true,
            phone: true,
            accountType: true,
            avatar: true,
        },
    });
};

const handleDeleteUser = async (id: string) => {
    return prisma.user.delete({
        where: { id: Number(id) },
    });
};

const getUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            username: true,
            fullName: true,
            address: true,
            phone: true,
            accountType: true,
            avatar: true,
        },
    });
};

const updateUserById = async (
    id: string,
    fullName: string,
    email: string,
    address: string
) => {
    return prisma.user.update({
        where: { id: Number(id) },
        data: {
            fullName,
            username: email,
            address,
        },
    });
};
const getAllRoles = async() =>{
  const roles = await prisma.role.findMany()
  return roles
}
export {
    handleCreateUser,
    getAllUser,
    handleDeleteUser,
    getUserById,
    updateUserById,
    getAllRoles,
};
