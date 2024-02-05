import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../DB';
import { Assignment } from '../../../client/src/app/types/projects';

// This interface is for attributes you expect to receive on creation
interface PostProjectCreationAttributes extends Optional<PostProject, 'project_id'> {}

interface PostProject {
  title: string;
  user_id: string;
  assignments?: Assignment[];
  project_id: string; // Make sure this is included if it's expected to be part of the model
}

// Extending Model directly
interface ProjectInstance
  extends Model<PostProject, PostProjectCreationAttributes>,
    PostProject {}

const Project = sequelize.define<ProjectInstance>(
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
      allowNull: true,
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
