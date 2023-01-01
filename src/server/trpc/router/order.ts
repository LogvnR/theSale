import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const orderRouter = router({
  //   oneProduct: publicProcedure
  //     .input(
  //       z.object({
  //         productId: z.string(),
  //       })
  //     )
  //     .query(({ ctx, input }) => {
  //       return ctx.prisma.product.findUnique({
  //         where: {
  //           id: input.productId,
  //         },
  //         include: {
  //           photos: true,
  //         },
  //       });
  //     }),
  allOrders: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.order.findMany();
  }),
  addOrder: publicProcedure
    .input(
      z.object({
        name: z.string(),
        phone: z.string(),
        language: z.string(),
        orders: z
          .object({
            title: z.string(),
            url: z.string(),
            price: z.string(),
          })
          .array(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.order.create({
        data: {
          name: input.name,
          phone: input.phone,
          language: input.language,
          orders: {
            create: input.orders,
          },
        },
      });
    }),
  // removeProduct: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //     })
  //   )
  //   .mutation(({ ctx, input }) => {
  //     return ctx.prisma.product.delete({
  //       where: {
  //         id: input.id,
  //       },
  //     });
  //   }),
});
