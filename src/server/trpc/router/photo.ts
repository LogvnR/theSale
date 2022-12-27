import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const photoRouter = router({
  removePhoto: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.photo.deleteMany({
        where: {
          productId: input.id,
        },
      });
    }),
});
