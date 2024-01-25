import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../DB';
import { Assignment } from '../../../client/src/app/types/projects';

interface PostProject {
  title: string;
  assignments?: Assignment[];
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
    },
    assignments: {
      type: DataTypes.JSONB, 
      allowNull: true
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