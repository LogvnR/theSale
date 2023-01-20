import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="group relative mb-4 animate-pulse">
      <div className="sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1 relative h-80 w-full overflow-hidden rounded-lg bg-white transition group-hover:grayscale-0 sm:h-64 lg:grayscale">
        <div className="h-[343.3px] w-full bg-gray-400" />
      </div>
      <div className="mt-2 h-6 w-1/4 rounded-xl bg-gray-400" />
      <div className="mt-1 mb-6 h-6 w-1/3 rounded-xl bg-gray-300" />
    </div>
  );
};

export default CategorySkeleton;
