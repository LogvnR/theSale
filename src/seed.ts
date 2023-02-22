import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const topProductsCategory = await prisma.category.create({
    data: {
      titleEng: "Top Products",
      coverPhoto: "",
      products: {
        createMany: {
          data: [
            {
              titleEng: "Product 1",
              isFeatured: false,
              titleEsp: "Product 1",
            },
            {
              titleEng: "Product 2",
              isFeatured: false,
              titleEsp: "Product 2",
            },
            {
              titleEng: "Product 3",
              isFeatured: false,
              titleEsp: "Product 3",
            },
            {
              titleEng: "Product 4",
              isFeatured: true,
              titleEsp: "Product 5",
            },
          ],
        },
      },
    },
  });

  console.log(topProductsCategory);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
