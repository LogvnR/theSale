import * as z from "zod";

const CartSchema = z.object({
  prodId: z.string(),
  titleEng: z.string(),
  titleEsp: z.string(),
  price: z.number(),
});

export type CartProduct = z.infer<typeof CartSchema>;
