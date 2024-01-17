import { Sequelize } from 'sequelize';
import pg from 'pg';
import { QueryTypes } from 'sequelize';


const ConnectionString = process.env.DB_URI || "postgres://postgres:Ori123456!@localhost:5432/postgres/Users";


// export const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: 'localhost',
//   port: 5432, 
//   username: 'postgres',
//   password: 'Ori123456!', 
//   database: 'postgres', 
//   dialectModule: pg   
// });

console.log(ConnectionString);




export const sequelize = new Sequelize(ConnectionString);

export async function connectToDB() {
  try {
    await sequelize.authenticate();
    // const users = await sequelize.query("SELECT * FROM users", { type: QueryTypes.SELECT });
    // console.log(users,"SELECT");
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


// export const query = async (text: string, params?: any[]) => {
//   try {
//     const [results, metadata] = await sequelize.query(text, { replacements: params });
//     return results;
//   } catch (error) {
//     console.error('Error executing query:', error);
//     throw error;
//   }
// };
