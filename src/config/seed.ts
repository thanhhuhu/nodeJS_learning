import bcrypt from "bcrypt";
import { prisma } from "./client";
const initDatabase = async () => {
    try {
        // 1. Tạo Roles trước
        const adminRole = await prisma.role.upsert({
            where: { id: 1 },
            update: {},
            create: {
                name: "ADMIN",
                description: "Admin full right",
            },
        });

        const userRole = await prisma.role.upsert({
            where: { id: 2 },
            update: {},
            create: {
                name: "USER",
                description: "User normal",
            },
        });

        console.log(">> Roles initialized successfully.");

        // 2. Mã hóa password
        const hashedPassword = await bcrypt.hash("ChangeMe123!", 12);

        // 3. Tạo Admin
        await prisma.user.upsert({
            where: { username: "admin@gmail.com" },
            update: {},
            create: {
                username: "admin@gmail.com",
                password: hashedPassword,
                fullName: "Admin",
                address: "Da Nang, Vietnam",
                accountType: "SYSTEM",
                roleId: adminRole.id,
            },
        });

        // 4. Tạo User thường
        await prisma.user.upsert({
            where: { username: "user@gmail.com" },
            update: {},
            create: {
                username: "user@gmail.com",
                password: hashedPassword,
                fullName: "User",
                address: "Da Nang, Vietnam",
                accountType: "SYSTEM",
                roleId: userRole.id,
            },
        });
        // if ((await prisma.product.count()) === 0) {
        //     await prisma.product.createMany({
        //         data: [
        //             { name: "Oranges",     image: "fruite-item-1.jpg", price: 4.99, shortDesc: "Fresh juicy oranges", detailDesc: "Oranges rich in vitamin C...", category: "Fruits" },
        //             { name: "Raspberries", image: "fruite-item-2.jpg", price: 5.99, shortDesc: "Sweet red raspberries", detailDesc: "...", category: "Fruits" },
        //             { name: "Banana",      image: "fruite-item-3.jpg", price: 2.99, shortDesc: "Ripe yellow bananas", detailDesc: "...", category: "Fruits" },
        //             { name: "Apricots",    image: "fruite-item-4.jpg", price: 4.49, shortDesc: "Soft golden apricots", detailDesc: "...", category: "Fruits" },
        //             { name: "Grapes",      image: "fruite-item-5.jpg", price: 4.99, shortDesc: "Seedless green grapes", detailDesc: "...", category: "Fruits" },
        //         ],
        //     });
        // }
        console.log(">> Users initialized successfully.");
    } catch (error) {
        console.error(">> Database initialization failed:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

initDatabase();