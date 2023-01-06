import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  catId: string;
  prodId: string;
  titleEng: string;
  titleEsp: string;
  prodPrice: string;
  featurePhoto: string;
}

const ProductCard = ({ ...props }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${props.catId.toLowerCase()}/${props.prodId.toLowerCase()}`}
    >
      <div className="group">
        <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 relative h-[343px] w-full overflow-hidden rounded-lg bg-gray-200 transition-opacity hover:opacity-75 lg:hover:-translate-y-1">
          <Image
            className="object-cover"
            fill
            src={props.featurePhoto}
            alt={props.titleEng}
          />
        </div>
        <h3 className="mt-4 text-base font-medium text-gray-700">
          {props.titleEng}
        </h3>
        <h3 className="text-sm italic text-gray-700">{props.titleEsp}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">
          $ {props.prodPrice}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
