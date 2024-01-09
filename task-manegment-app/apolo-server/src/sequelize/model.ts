import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '../DB';
import { RegisterResponsetBody, RegisterRequestBody } from '../types/user'



// <Model<Partial<RegisterResponsetBody>, RegisterRequestBody>>

const User = sequelize.define<Model<RegisterRequestBody, {}>>('User',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
  });


export default User;
