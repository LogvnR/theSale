import * as z from "zod";

const CartSchema = z.object({
  prodId: z.string(),
  titleEng: z.string(),
  titleEsp: z.string(),
  price: z.number(),
  userOffer: z.number(),
  photo: z.string(),
});

export type CartProduct = z.infer<typeof CartSchema>;
