import { useSession } from "next-auth/react";
import VehicleForm from "../../../../components/Admin Form/VehicleForm";

const AddVehiclePage = () => {
  const { data: sessionData } = useSession();

  if (!sessionData)
    return (
      <p className="my-4 text-center">
        Sorry, you do not have access to this page
      </p>
    );

  return (
    <div className="flex min-h-screen w-full items-start justify-center">
      <div className="flex w-full flex-col justify-center lg:w-1/2">
        <h2 className="ml-4 mt-4 font-Jakarta text-lg text-gray-800">
          Add Vehicle Page
        </h2>
        <VehicleForm />
      </div>
    </div>
  );
};

export default AddVehiclePage;
