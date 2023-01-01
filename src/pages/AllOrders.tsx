import { useSession } from "next-auth/react";
import AdminOrders from "../components/Admin Orders/AdminOrders";

const AllOrders = () => {
  const { data: sessionData } = useSession();

  if (!sessionData)
    return (
      <p className="my-4 text-center">
        Sorry, you do not have access to this page
      </p>
    );
  return (
    <div className="flex w-full flex-col">
      <h2 className="ml-4 mt-4 text-lg text-gray-800">All Orders Page</h2>
      <AdminOrders />
    </div>
  );
};

export default AllOrders;
