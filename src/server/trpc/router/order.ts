import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const orderRouter = router({
  oneOrder: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.order.findUnique({
        where: {
          id: input.orderId,
        },
        include: {
          products: {
            include: {
              photos: true,
            },
          },
        },
      });
    }),
  allOrders: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.order.findMany();
  }),
  addOrder: publicProcedure
    .input(
      z.object({
        name: z.string(),
        phone: z.string(),
        language: z.string(),
        total: z.string(),
        productsIds: z
          .object({
            prodId: z.string(),
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
          total: input.total,
          products: {
            connect: input.productsIds.map((prod) => ({ id: prod.prodId })),
          },
        },
      });
    }),
  removeOrder: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.order.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
