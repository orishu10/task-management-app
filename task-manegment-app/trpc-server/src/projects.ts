import { z } from 'zod';
import Project from './sequelize/modal';
import { adminProcedures, publicProcedure, router } from './trpc';


const PostProjectSchema = z.object({
  title: z.string(),
  user_id: z.string(),
});

const UpdateProjectSchema = z.object({
  title: z.string(),
  assignments: z.array(z.object({
    title: z.string(),
    description: z.string(),
    id: z.string(),
    isComplete: z.boolean()
  })),
  user_id: z.string(),
  project_id: z.string(),
});

const findOneSchema = z.object({
  project_id: z.string(),
});

const getProjectsByIdSchema = z.object({
  user_id: z.string(),
});

const DeleteAssignmentsSchema = z.object({
  assignment: z.object({
    title: z.string(),
    description: z.string(),
    id: z.string(),
    isComplete: z.boolean()
  }),
  project_id: z.string(),
});



export const appRouter = router({

  secretData: adminProcedures.query(() => {
    return Project.findAll();
  }),

  getAllMyProjects: adminProcedures.input(getProjectsByIdSchema).query((async ({ input }) => {
    const myProjects = Project.findAll({ where: { user_id: input.user_id } });
    return myProjects
  })
  ),

  postProject: adminProcedures
    .input(PostProjectSchema)
    .mutation(async ({ input }) => {
      console.log(input, 'input from trpc mutation');
      const newProject = await Project.create({
        title: input.title,
        user_id: input.user_id,
      });
      return newProject;
    }),

  updateProject: adminProcedures
    .input(UpdateProjectSchema)
    .mutation(async ({ input }) => {
      try {
        const [updated] = await Project.update({
          title: input.title,
          assignments: input.assignments,
          user_id: input.user_id,
        }, {
          where: { project_id: input.project_id }
        });
        if (updated) {
          const userUpdated = await Project.findOne({ where: { project_id: input.project_id } });
          return userUpdated;
        } else {
          throw new Error("Project not found or update failed");
        }
      } catch (error) {
        console.error("Error updating project:", error);
        throw new Error("Error updating project");
      }
    }),

  deleteAssignments: adminProcedures.input(DeleteAssignmentsSchema)
    .mutation(async ({ input }) => {
      try {
        // Example of fetching a project and accessing its assignments
        const project = await Project.findByPk(input.project_id);
        if (project && project.assignments) {
          const assignments = JSON.parse(project.assignments); // Parse the JSON string back into an array
        }

        // Step 2: Filter out the assignment to be deleted
        const updatedAssignments = assignments.filter(assignment => assignment.id !== input.assignment.id);

        // Step 3: Update the project with the new assignments array
        await Project.update({
          assignments: JSON.stringify(updatedAssignments),
        }, {
          where: { project_id: input.project_id }
        });

        const updatedProject = await Project.findOne({ where: { project_id: input.project_id } });

        return updatedProject;
      } catch (error) {
        console.error("Error updating project:", error);
        throw new Error("Error updating project");
      }
    }),


  deleteProject: adminProcedures
    .input(findOneSchema).mutation(async ({ input }) => {
      try {
        const deleted = await Project.destroy({
          where: { project_id: input.project_id }
        });
        if (deleted) {
          const userDeleted = await Project.findOne({ where: { project_id: input.project_id } });
          return userDeleted;
        } else {
          throw new Error("Project not found or delete failed");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        throw new Error("Error deleting project");
      }
    }),


  getProject: adminProcedures
    .input(findOneSchema)
    .query(async ({ input }) => {
      try {
        const project = await Project.findOne({ where: { project_id: input.project_id } });
        return project;
      } catch (error) {
        console.error("Error fetching project:", error);
        throw new Error("Error fetching project");
      }
    })
});
