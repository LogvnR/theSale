import { useSession } from "next-auth/react";
import AdminOrders from "../../../components/Admin Orders/AdminOrders";

const AllOrders = () => {
  const { data: sessionData } = useSession();

  if (!sessionData)
    return (
      <p className="my-4 text-center font-Inter">
        Sorry, you do not have access to this page
      </p>
    );
  return (
    <div className="flex min-h-screen w-full items-start justify-center">
      <div className="flex w-full flex-col justify-center lg:w-2/3">
        <h2 className="ml-4 mt-4 font-Jakarta text-lg text-gray-800">
          All Orders Page
        </h2>
        <AdminOrders />
      </div>
    </div>
  );
};

export default AllOrders;
