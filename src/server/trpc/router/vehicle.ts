import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const vehicleRouter = router({
  oneVehicle: publicProcedure
    .input(
      z.object({
        vehicleId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.vehicle.findUnique({
        where: {
          id: input.vehicleId,
        },
        include: {
          photos: true,
        },
      });
    }),
  allVehicles: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.vehicle.findMany();
  }),
  addVehicle: publicProcedure
    .input(
      z.object({
        year: z.string(),
        make: z.string(),
        model: z.string(),
        mileage: z.string(),
        kilometers: z.string(),
        fuelEng: z.string(),
        fuelEsp: z.string(),
        seats: z.string(),
        engine: z.string(),
        drivetrain: z.string(),
        type: z.string(),
        color: z.string(),
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
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.vehicle.create({
        data: {
          year: input.year,
          make: input.make,
          model: input.model,
          mileage: input.mileage,
          kilometers: input.kilometers,
          fuelEng: input.fuelEng,
          fuelEsp: input.fuelEsp,
          seats: input.seats,
          engine: input.engine,
          drivetrain: input.drivetrain,
          type: input.type,
          color: input.color,
          price: input.price,
          descriptionEng: input.descriptionEng,
          descriptionEsp: input.descriptionEsp,
          photos: {
            create: input.photos,
          },
        },
      });
    }),
  //   removeVehicle: publicProcedure
  //     .input(
  //       z.object({
  //         id: z.string(),
  //       })
  //     )
  //     .mutation(({ ctx, input }) => {
  //       return ctx.prisma.vehicle.delete({
  //         where: {
  //           id: input.id,
  //         },
  //       });
  //     }),
});
