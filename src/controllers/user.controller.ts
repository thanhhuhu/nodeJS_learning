import { Request, Response } from "express";
import { getAllUser, handleCreateUser, handleDeleteUser, getUserById, updateUserById} from "../services/user.service";

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
    return res.render("create.user.ejs");
}
const postCreateUser = async(req:Request,res:Response)=>{

    const {fullName,email,address} = req.body;
    await handleCreateUser( fullName, email, address)
    return res.redirect("/");
}
const postDeleteUser = async (req:Request, res:Response) => {

  const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).send("Invalid user ID");
    }

    console.log("Delete user ID:", id);

    await handleDeleteUser(id);
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
const postUpdateUser = async( req: Request, res: Response) =>{
     const {id, fullName, email,address} = req.body
 
    await updateUserById (id,
        fullName,
        email,
        address)
     return res.redirect("/")
}
export {getHomePage, getCreateUserPage,postCreateUser, postDeleteUser, getViewUser,postUpdateUser}