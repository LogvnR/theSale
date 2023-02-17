import React from "react";
import { Vehicle, VehiclePhoto } from "@prisma/client";
import VehicleDetail from "./VehicleDetail";

interface VehicleSpecProps {
  vehicle:
    | (Vehicle & {
        photos: VehiclePhoto[];
      })
    | null
    | undefined;
}

const VehicleSpecs = ({ ...props }: VehicleSpecProps) => {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
      <VehicleDetail
        title="Body Style &#x2022; Tipo De Cuerpo"
        info={props.vehicle?.type}
      />
      <VehicleDetail
        title="Transmission &#x2022; Transmisión"
        info={`${props.vehicle?.drivetrain} / ${props.vehicle?.transmission}`}
      />
      <VehicleDetail
        title="Engine &#x2022; Motor"
        info={props.vehicle?.engine}
      />
      <VehicleDetail
        title="Fuel &#x2022; Combustible"
        info={`${props.vehicle?.fuelEng} / ${props.vehicle?.fuelEsp}`}
      />
      <VehicleDetail
        title="Seating &#x2022; Asientos"
        info={props.vehicle?.seats}
      />
      <VehicleDetail
        title="Color"
        info={`${props.vehicle?.colorEng} / ${props.vehicle?.colorEsp}`}
      />
      <VehicleDetail
        title="Miles &#x2022; Kilómetros"
        info={`${Number(props.vehicle?.mileage).toLocaleString()} / ${Number(
          props.vehicle?.kilometers
        ).toLocaleString()}`}
      />
    </div>
  );
};

export default VehicleSpecs;
