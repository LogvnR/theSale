import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const productRouter = router({
  featured: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      where: {
        isFeatured: true,
      },
      select: {
        title: true,
        photos: {
          select: {
            url: true,
          },
        },
      },
    });
  }),
});
