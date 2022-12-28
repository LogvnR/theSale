import Link from "next/link";
import React from "react";

interface CategoryCardProps {
  catId: string;
  titleEng: string;
  titleEsp: string;
}

const CategoryCard = ({ ...props }: CategoryCardProps) => {
  return (
    <Link href={`/products/${props.titleEng.toLowerCase()}`}>
      <div key={props.catId} className="group relative">
        <div className="sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1 relative h-80 w-full overflow-hidden rounded-lg bg-white grayscale transition group-hover:grayscale-0 sm:h-64">
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
            alt="Test Img"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <h3 className="mt-6 text-sm text-gray-500">
          <a href="">
            <span className="absolute inset-0" />
            {props.titleEsp}
          </a>
        </h3>
        <p className="text-base font-semibold text-gray-900">
          {props.titleEng}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
