import bcrypt from "bcrypt";
import { prisma } from "../config/client";
import { ACCOUNT_TYPE } from "../config/constant";

const handleCreateUser = async (
    fullName: string, username: string, address: string, password: string, phone: string, avatar: string | null,
    roleId: string
) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const parsedRoleId = Number(roleId);
    if (!Number.isInteger(parsedRoleId) || parsedRoleId <= 0) {
        throw new Error("Role ID không hợp lệ.");
    }
    const role = await prisma.role.findUnique({
        where: {
            id: parsedRoleId,
        },
    });

    if (!role) {
        throw new Error("Role USER chưa tồn tại trong database.");
    }

    return prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
            fullName: fullName,
            address: address,
            phone: phone,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar:avatar,
            roleId: parsedRoleId,
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
        where: {
            id: Number(id),
        },
    });
};

const getUserById = async (id: string) => {
    return prisma.user.findFirst({
        where: {
            id: Number(id),
        },
        select: {
            id: true,
            username: true,
            fullName: true,
            address: true,
            phone: true,
            accountType: true,
            avatar: true,
            roleId: true,
        },
    });
};

const updateUserById = async (
    id: string, fullName: string, phone: string, address: string, role: any, avatar: string) => {
    return prisma.user.update({
        where: {
            id: Number(id),
        },
        data: {
            fullName,
            phone:phone,
            roleId: +role,
            address:address,
            ...(avatar !== undefined && {avatar:avatar})
        },
    });
};

const getAllRoles = async () => {

    return prisma.role.findMany();
};

export {
    handleCreateUser,
    getAllUser,
    handleDeleteUser,
    getUserById,
    updateUserById,
    getAllRoles,
};