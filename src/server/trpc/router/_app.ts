import { router } from "../trpc";
import { authRouter } from "./auth";
import { categoryRouter } from "./category";
import { exampleRouter } from "./example";
import { photoRouter } from "./photo";
import { productRouter } from "./product";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  product: productRouter,
  photo: photoRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
