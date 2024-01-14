import { sequelize } from './DB';
import { publicProcedure, router } from './trpc';

const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      const users = 12
      // await sequelize.user.findMany();
      return users;
    }),
});

export type AppRouter = typeof appRouter;