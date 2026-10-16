import express , {Express}from "express";
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser,getViewUser, postUpdateUser} from "../controllers/user.controller";
import { getAdminUserPage, getDashboardPage, getAdminProductPage, getAdminOrderPage} from "../controllers/admin/dashboard.controller";
import multer from "multer";
import fileUploadMiddleware from "../middleware/multer"
const router = express.Router();

const upload = multer({
    dest: "uploads/",
});

const webRoutes = (app: Express) => {
    // Public routes
    router.get("/", getHomePage);
    router.get("/create-user", getCreateUserPage);
    router.post("/handle-delete-user/:id", postDeleteUser);
    router.get("/handle-view-user/:id", getViewUser);
    router.post("/handle-update-user", postUpdateUser);

    // Admin routes
    router.get("/admin", getDashboardPage);
    router.get("/admin/user", getAdminUserPage);
    router.get("/admin/create-user", getCreateUserPage);

    // Chỉ khai báo một route tạo người dùng
    router.post(
        "/admin/handle-create-user",
        fileUploadMiddleware("avatar"),
        postCreateUser
    );

    router.get("/admin/product", getAdminProductPage);
    router.get("/admin/order", getAdminOrderPage);

    app.use("/", router);
};

export default webRoutes;