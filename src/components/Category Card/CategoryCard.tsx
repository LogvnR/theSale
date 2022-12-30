import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoryCardProps {
  catId: string;
  titleEng: string;
  titleEsp: string;
  coverPhoto: string;
}

const CategoryCard = ({ ...props }: CategoryCardProps) => {
  return (
    <Link href={`/products/${props.catId.toLowerCase()}`}>
      <div key={props.catId} className="group relative mb-4">
        <div className="sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1 relative h-80 w-full overflow-hidden rounded-lg bg-white transition group-hover:grayscale-0 sm:h-64 lg:grayscale">
          <Image
            src={props.coverPhoto}
            alt={props.titleEng}
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-2 text-base font-semibold text-gray-900">
          {props.titleEng}
        </p>
        <h3 className="mb-6 text-sm italic text-gray-500">
          <span className="absolute inset-0" />
          {props.titleEsp}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
