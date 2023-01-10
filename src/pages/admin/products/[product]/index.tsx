import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import EditForm from "../../../../components/Admin Form/EditForm";

const ProductEditPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const productId = String(router.query.product);

  if (!sessionData)
    return (
      <p className="my-4 text-center">
        Sorry, you do not have access to this page
      </p>
    );

  console.log(productId);

  return (
    <div className="flex min-h-screen w-full items-start justify-center">
      <div className="flex w-full flex-col justify-center lg:w-1/2">
        <h2 className="ml-4 mt-4 font-Jakarta text-lg text-gray-800">
          Edit Product Page
        </h2>
        <EditForm productId={productId} />
      </div>
    </div>
  );
};

export default ProductEditPage;
