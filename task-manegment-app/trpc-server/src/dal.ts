// appRouter.mutation('addProject', {
//     input: {
//       title: 'string',          // required title of the project
//       assignments: 'array',     // an array of assignments
//       // createdAt is automatically set by Sequelize
//     },
//     async resolve({ input }) {
//       // Use the Project model to create a new project with the input data
//       const newProject = await Project.create({
//         title: input.title,
//         assignments: input.assignments,
//         // createdAt will be automatically set
//       });
//       return newProject;
//     },
//   });
  