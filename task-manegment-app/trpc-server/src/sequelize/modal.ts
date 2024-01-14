import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../DB';
// import { ResponseUserAttributes, RegisterUserAttributes } from '../types/user'




const Project = sequelize.define('projects',
 {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
 assigmant : {
    type: DataTypes.ARRAY,
    allowNull: false,
  },
createdAt : {
    type: DataTypes.DATE,
    allowNull: true,
  },
    

});


export default Project;
