import { router } from "../trpc";
import { authRouter } from "./auth";
import { categoryRouter } from "./category";
import { exampleRouter } from "./example";
import { orderRouter } from "./order";
import { photoRouter } from "./photo";
import { productRouter } from "./product";
import { vehicleRouter } from "./vehicle";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  product: productRouter,
  photo: photoRouter,
  category: categoryRouter,
  order: orderRouter,
  vehicle: vehicleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
