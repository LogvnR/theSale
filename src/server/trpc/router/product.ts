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
  allProducts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany();
  }),
  addProduct: publicProcedure
    .input(
      z.object({
        titleEng: z.string(),
        titleEsp: z.string(),
        isFeatured: z.boolean(),
        price: z.string(),
        descriptionEng: z.string(),
        descriptionEsp: z.string(),
        photos: z
          .object({
            title: z.string(),
            url: z.string(),
            isFeaturePhoto: z.boolean().optional(),
          })
          .array(),
        categoryId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.product.create({
        data: {
          titleEng: input.titleEng,
          titleEsp: input.titleEsp,
          isFeatured: input.isFeatured,
          price: input.price,
          descriptionEng: input.descriptionEng,
          descriptionEsp: input.descriptionEsp,
          photos: {
            create: input.photos,
          },
          Category: {
            connect: {
              id: input.categoryId,
            },
          },
        },
      });
    }),
  removeProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.product.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
