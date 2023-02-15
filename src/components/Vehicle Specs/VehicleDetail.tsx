import React from "react";

interface VehicleDetailProps {
  title: string;
  info: string | number | undefined;
}

const VehicleDetail = ({ title, info }: VehicleDetailProps) => {
  return (
    <div className="my-2 flex w-full flex-[1_1_45%] flex-col rounded bg-slate-100 p-2">
      <h4 className="font-bold text-gray-600">{title}</h4>
      <p>{info}</p>
    </div>
  );
};

export default VehicleDetail;
