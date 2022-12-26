import { useSession } from "next-auth/react";
import AdminForm from "../components/Admin Form/AdminForm";

const AdminPage = () => {
  const { data: sessionData } = useSession();

  if (!sessionData)
    return (
      <p className="my-4 text-center">
        Sorry, you do not have access to this page
      </p>
    );

  return (
    <div className="flex w-full flex-col">
      <h2>This is the Admin Page</h2>
      <AdminForm />
    </div>
  );
};

export default AdminPage;
