import Image from "next/image";
import Link from "next/link";
import React from "react";

import { trpc } from "../../utils/trpc";

interface VehicleCardProps {
  carId: string;
}

const VehicleCard = ({ ...props }: VehicleCardProps) => {
  const vehicle = trpc.vehicle.oneVehicle.useQuery({
    vehicleId: props.carId,
  }).data;

  const photo = String(
    vehicle?.photos.filter((photo) => photo.isFeaturePhoto === true).pop()?.url
  );

  if (!vehicle) return <p className="animate-pulse">Loading...</p>;

  return (
    <Link href={`/products/${props.carId.toLowerCase()}`}>
      <div key={props.carId} className="group relative mb-4">
        <div className="sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1 relative h-80 w-full overflow-hidden rounded-lg bg-white transition group-hover:grayscale-0 sm:h-64 lg:grayscale">
          <Image
            src={photo}
            alt={vehicle?.year + " " + vehicle?.make + " " + vehicle?.model}
            fill
            className="object-cover"
            priority
          />
        </div>
        <p className="mt-2 text-base font-semibold text-gray-900">
          {vehicle?.year + " " + vehicle?.make + " " + vehicle?.model}
        </p>
      </div>
    </Link>
  );
};

export default VehicleCard;
