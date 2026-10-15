
import bcrypt from "bcrypt";
import { prisma } from "../config/client";

const initDatabase = async () => {
    try {
        const countUser = await prisma.user.count();
        const countRole = await prisma.role.count();

        if (countUser === 0) {
            const hashedPassword = await bcrypt.hash("ChangeMe123!", 12);

            await prisma.user.createMany({
                data: [
                    {
                        username: "dinhthanh@gmail.com",
                        password: hashedPassword,
                        fullName: "Thanh",
                        address: "Da Nang, Vietnam",
                        accountType: "SYSTEM",
                    },
                    {
                        username: "admin@gmail.com",
                        password: hashedPassword,
                        fullName: "Admin",
                        address: "Da Nang, Vietnam",
                        accountType: "SYSTEM",
                    },
                ],
            });

            console.log(">> Users initialized successfully.");
        }

        if (countRole === 0) {
            await prisma.role.createMany({
                data: [
                    {
                        name: "ADMIN",
                        description: "Admin full right",
                    },
                    {
                        name: "USER",
                        description: "User normal",
                    },
                ],
            });

            console.log(">> Roles initialized successfully.");
        }

        if (countUser > 0 && countRole > 0) {
            console.log(">> Already initialized data.");
        }
    } catch (error) {
        console.error(">> Database initialization failed:", error);
        throw error;
    }
};

export default initDatabase;
