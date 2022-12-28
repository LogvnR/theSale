import { useRouter } from "next/router";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import ProductCard from "../../../components/Product Card/ProductCard";

import { trpc } from "../../../utils/trpc";

const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  // More products...
];

const ProductType = () => {
  const router = useRouter();
  const productType = String(router.query.productType);
  const categoryProducts = trpc.category.products.useQuery({
    categoryId: productType,
  }).data;

  console.log(categoryProducts);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-4 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900">
            {categoryProducts?.titleEng}
          </h2>
          <p className="text-xl font-normal italic text-gray-900">
            {categoryProducts?.titleEsp}
          </p>
        </section>
        <div className="relative mb-4">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-gray-500">
              <ShoppingBagIcon
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {categoryProducts?.products?.map((product) => (
            <ProductCard
              key={product.id}
              prodId={product.id}
              titleEng={product.titleEng}
              titleEsp={product.titleEsp}
              featurePhoto={product.photos[0]!.url}
              prodPrice={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductType;
