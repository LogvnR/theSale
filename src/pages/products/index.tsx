import React from "react";
import CategoryCard from "../../components/Category Card/CategoryCard";

import { trpc } from "../../utils/trpc";

const ProductCategories = () => {
  const categories = trpc.category.allCategories.useQuery().data;
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-4 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Shop By Category</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {categories?.map((category) => (
              <CategoryCard
                key={category.id}
                catId={category.id}
                titleEng={category.titleEng}
                titleEsp={category.titleEsp}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
