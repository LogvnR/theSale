import { useRouter } from "next/router";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import ProductCard from "../../../components/Product Card/ProductCard";
import Link from "next/link";

import { trpc } from "../../../utils/trpc";

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
        <Link href={"/products"}>
          <button
            type="button"
            className="mb-4 inline-flex items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-500 shadow-sm hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Back &#x2022; Retorno
          </button>
        </Link>
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
