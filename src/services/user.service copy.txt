import getConnection from "../config/database";

const  handleCreateUser = async(fullName:string, email:string, address:string) => {
     const connection = await getConnection();
    try {
      const sql = 'INSERT INTO `users`(`name`, `email`, `address`) VALUES (?, ?, ?)';
      const values = [fullName, email, address];

      const [result, fields] = await connection.execute(sql, values);
      return result;
    } catch (err) {
    console.log(err);
    return [];
    }
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
const handleDeleteUser = async(id:string)=>{
  try {
const connection = await getConnection();
  const sql = 'DELETE FROM `users` WHERE `id` =  ?';
  const values = [id];

  const [result, fields] = await connection.execute(sql, values);

 return result
} catch (err) {
  console.log(err);
  return []
}
}
const getUserById = async(id:string)=>{
  try {
    const connection = await getConnection();
    const sql = 'SELECT * FROM `users` WHERE `id` = ?';
    const values = [id];
    const [result, fields] = await connection.execute(sql, values);
    return result[0];
} catch (err) {
  console.log(err);
  return []
}
}
const updateUserById = async ( id:string,
  email:string, address:string, fullName:string,
) =>{
   try {
    const connection = await getConnection();
    const sql = `
            UPDATE users
            SET
                name = ?,
                email = ?,
                address = ?
            WHERE id = ?
            LIMIT 1
        `;    
        const values = [fullName, email,address, id];
    const [result, fields] = await connection.execute(sql, values);
    console.log("update result", result)
    return result;
} catch (err) {
  console.log(err);
  return []
}
}
export {handleCreateUser, getAllUser, handleDeleteUser, getUserById, updateUserById}