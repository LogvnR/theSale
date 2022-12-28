import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const categoryRouter = router({
  allCategories: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),
  addCategory: publicProcedure
    .input(
      z.object({
        categoryEng: z.string(),
        categoryEsp: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.category.create({
        data: {
          titleEng: input.categoryEng,
          titleEsp: input.categoryEsp,
        },
      });
    }),
  //   removeProduct: publicProcedure
  //     .input(
  //       z.object({
  //         id: z.string(),
  //       })
  //     )
  //     .mutation(({ ctx, input }) => {
  //       return ctx.prisma.product.delete({
  //         where: {
  //           id: input.id,
  //         },
  //       });
  //     }),
});