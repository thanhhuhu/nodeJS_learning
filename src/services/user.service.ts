import getConnection from "../config/database";

const  handleCreateUser = (fullName:string, email:string, address:string) =>{
    // insert into database
    console.log("insert a new user")

}
const getAllUser = async () => {
    const connection = await getConnection();
    try {
  const [results, fields] = await connection.query(
    'SELECT * FROM `users`'
  );
  return results;
  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
  console.log(err);
  return [];
}
    return "thanh"
}
export {handleCreateUser, getAllUser}