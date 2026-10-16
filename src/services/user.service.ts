
import bcrypt from "bcrypt";
import { prisma } from "../config/client";
import { ACCOUNT_TYPE } from "../config/constant";

const handleCreateUser = async (
    fullName: string,
    username: string,
    address: string,
    password: string,
    phone: string,
    avatar: string | null
) => {
    const hashedPassword = await bcrypt.hash(password, 12);

    return prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            fullName,
            address,
            phone,
            accountType: "ACCOUNT_TYPE.SYSTEM",
            avatar,
        },
    });
};


const getAllUser = async () => {
    return await prisma.user.findMany({
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
