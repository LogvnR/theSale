import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const productRouter = router({
  featured: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      where: {
        isFeatured: true,
      },
      include: {
        photos: true,
      },
    });
  }),
  addProduct: publicProcedure
    .input(
      z.object({
        title: z.string(),
        isFeatured: z.boolean(),
        price: z.string(),
        description: z.string(),
        photos: z
          .object({
            title: z.string(),
            url: z.string(),
            isFeaturePhoto: z.boolean().optional(),
          })
          .array(),
        category: z.object({
          title: z.string(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.product.create({
        data: {
          title: input.title,
          isFeatured: input.isFeatured,
          price: input.price,
          description: input.description,
          photos: {
            create: input.photos,
          },
          Category: {
            create: {
              title: input.category.title,
            },
          },
        },
      });
    }),
});
