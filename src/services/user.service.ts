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
export {handleCreateUser, getAllUser}