import { useRouter } from "next/router";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

import ProductCard from "../../../components/Product Card/ProductCard";

import { trpc } from "../../../utils/trpc";
import BackButton from "../../../components/Back Button/BackButton";

const ProductType = () => {
  const router = useRouter();
  const productType = String(router.query.productType);
  const categoryProducts = trpc.category.products.useQuery({
    categoryId: productType,
  }).data;

  console.log(categoryProducts);
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl py-4 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <BackButton link="/products" />
        <section>
          <h2 className="text-2xl font-bold text-gray-900">
            {categoryProducts?.titleEng}
          </h2>
          <p className="text-xl font-normal italic text-gray-500">
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
              catId={categoryProducts.id}
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
