import { useSession } from "next-auth/react";
import AdminForm from "../components/Admin Form/AdminForm";

const AddProductPage = () => {
  const { data: sessionData } = useSession();

  if (!sessionData)
    return (
      <p className="my-4 text-center">
        Sorry, you do not have access to this page
      </p>
    );

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full flex-col justify-center lg:w-1/2">
        <h2 className="ml-4 mt-4 text-lg text-gray-800">Add Product Page</h2>
        <AdminForm />
      </div>
    </div>
  );
};

export default AddProductPage;
