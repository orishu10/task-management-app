import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '../DB';
import { ResponseUserAttributes, RegisterUserAttributes } from '../types/user'




const User = sequelize.define<Model<ResponseUserAttributes,RegisterUserAttributes >>('User',
 {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
  },
  message: {
    type: DataTypes.STRING,
  },
//   createdAt : {
//     defaultValue: null,
//     allowNull: true,
//   }
  
// updatedAt : {
//       defaultValue: null,
//       allowNull: true,
//     }
});


export default User;
