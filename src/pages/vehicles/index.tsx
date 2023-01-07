import React from "react";
import VehicleCard from "../../components/Vehicle Card/VehicleCard";

import { trpc } from "../../utils/trpc";

const Vehicles = () => {
  const vehicles = trpc.vehicle.allVehicles.useQuery().data;
  return (
    <div className="bg-gray-100 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-4 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Shop Vehicles</h2>
          <p className="text-xl font-normal italic text-gray-500">
            Compra por Categoría
          </p>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {vehicles?.map((vehicle) => (
              <VehicleCard key={vehicle.id} carId={vehicle.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
