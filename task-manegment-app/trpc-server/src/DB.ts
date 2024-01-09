import { Sequelize } from 'sequelize';

const ConnectionString = "postgres://ori:Ori123456!@localhost:5432/postgres";


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

