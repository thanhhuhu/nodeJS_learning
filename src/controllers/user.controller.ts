import { Request, Response } from "express";
import { getAllUser, handleCreateUser, handleDeleteUser, getUserById, updateUserById, getAllRoles} from "../services/user.service";

const getHomePage = async (req:Request,res:Response)=>{
    // get users 
    const users = await getAllUser();

    return res.render("home.ejs",{
        users: users,
        
    });
}
const getCreateUserPage = async(req:Request,res:Response)=>{
    // const {fullName,email,address} = req.body;
    // await handleCreateUser( fullName, email, address)
    const roles = await getAllRoles()
    
    return res.render("admin/user/create.ejs",{
        roles:roles
    });
}

const postCreateUser = async (req: Request, res: Response) => {
    try {
        const { fullName, username, phone, role,address, password } = req.body;

        if (!fullName || !username || !password) {
            return res.status(400).send(
                "Full name, username and password are required."
            );
        }

        await handleCreateUser(
            fullName,
            username,
            address ?? "",
            password,
            phone ?? "",
            req.file?.filename ?? null
        );

        console.log("User created successfully:", username);
        return res.redirect("/admin/user");
    } catch (error) {
        console.error("Create user failed:", error);
        return res.status(500).send("Failed to create user.");
    }
};

const postDeleteUser = async (req:Request, res:Response) => {

  const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).send("Invalid user ID");
    }

    console.log("Delete user ID:", id);

    const a  = await handleDeleteUser(id);
    return res.redirect("/"); 
}
// get user by id
const getViewUser = async (req:Request, res:Response) => {
     const {id} = req.params
     if ( typeof id !=="string"){
        return res.status(400).send("Invalid user ID")
    
     }
     //get user by id 
     const user = await getUserById(id)
     return res.render("view-user.ejs",{
        id: id,
        user:user
     })
}

const postUpdateUser = async (req: Request, res: Response) => {
    try {
        const { id, fullName, username, address } = req.body;

        if (!id || !username || !fullName) {
            return res.status(400).send(
                "ID, full name and username are required."
            );
        }

        await updateUserById(
            String(id),
            fullName,
            username,
            address ?? ""
        );

        return res.redirect("/admin/user");
    } catch (error) {
        console.error("Update user failed:", error);
        return res.status(500).send("Failed to update user.");
    }
};

export {getHomePage, getCreateUserPage,postCreateUser, postDeleteUser, getViewUser,postUpdateUser}