import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="group animate-pulse">
      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 relative h-[343px] w-full overflow-hidden rounded-lg bg-gray-200 transition-opacity hover:opacity-75 lg:hover:-translate-y-1">
        <div className="h-[343.3px] w-full bg-gray-400" />
      </div>
      <div className="mt-3 h-5 w-1/4 rounded-xl bg-gray-400" />
      <div className="mt-1 h-5 w-1/3 rounded-xl bg-gray-300" />
      <div className="mt-2 h-6 w-1/6 rounded-xl bg-gray-500" />
    </div>
  );
};

export default ProductSkeleton;
