import { Sequelize } from 'sequelize';

const ConnectionString = process.env.DB_URI || "postgres://ori:Ori123456!@localhost:5432/postgres";

// export const sequelize = new Sequelize("postgres", "ori", "Ori123456", {
//     dialect: "postgres",
//     host: "localhost",
//     port: 5432,
//     dialectModule: require('pg'),

// });






export const sequelize = new Sequelize(ConnectionString ,{
  dialectModule: require('pg'),
});

export async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


export const query = async (text: string, params?: any[]) => {
  try {
    const [results, metadata] = await sequelize.query(text, { replacements: params });
    return results;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};
