import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../DB';

interface PostProject {
  title: string;
  assignments: string[];
  userId: string;
}

interface ResponseUserAttributes extends PostProject {
  id: string;
}

const Project = sequelize.define<Model<ResponseUserAttributes, PostProject>>(
  'projects',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    assignments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
  },
  {
    tableName: 'projects',
  }
);

export default Project;