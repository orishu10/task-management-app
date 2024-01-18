import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../DB';

interface PostProject {
  title: string;
  assignments: string[];
  user_id: string;
}

interface ResponseUserAttributes extends PostProject {
  project_id: string;
}

const Project = sequelize.define<Model<ResponseUserAttributes, PostProject>>(
  'projects',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    assignments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    project_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: 'projects',
  }
);

export default Project;