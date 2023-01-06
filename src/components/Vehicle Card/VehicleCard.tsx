import Image from "next/image";
import Link from "next/link";
import React from "react";

interface VehicleCardProps {
  carId: string;
  titleInfo: string;
  coverPhoto: string;
}

const VehicleCard = ({ ...props }: VehicleCardProps) => {
  return (
    <Link href={`/products/${props.carId.toLowerCase()}`}>
      <div key={props.carId} className="group relative mb-4">
        <div className="sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1 relative h-80 w-full overflow-hidden rounded-lg bg-white transition group-hover:grayscale-0 sm:h-64 lg:grayscale">
          <Image
            src={props.coverPhoto}
            alt={props.titleInfo}
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-2 text-base font-semibold text-gray-900">
          {props.titleInfo}
        </p>
      </div>
    </Link>
  );
};

export default VehicleCard;
