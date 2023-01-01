import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { TlsOptions } from "tls";

import { trpc } from "../../utils/trpc";

const AdminOrders = () => {
  const utils = trpc.useContext();

  const orders = trpc.order.allOrders.useQuery().data;
  const removePhotos = trpc.photo.removePhoto.useMutation();
  const removeProducts = trpc.product.removeProduct.useMutation({
    onSuccess: () => {
      utils.product.allProducts.invalidate();
    },
  });

  const removeItemHandler = async (id: string) => {
    removePhotos.mutate({ id: id });
    setTimeout(() => {
      removeProducts.mutate({ id: id });
    }, 2000);
  };

  const dateOptionsPre: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  const dateOptionsAft: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  if (orders?.length === 0)
    return (
      <div className="flex w-full items-center justify-center">
        <p>There are currently no orders</p>
      </div>
    );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link href={"/AddProduct"}>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto"
            >
              Add New Product
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Order
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders?.map((order) => (
                    <tr key={order.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {order.id.substring(0, 7)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex flex-col">
                          <p>
                            <span className="font-medium">
                              {order.createdAt.toLocaleDateString(
                                "en-US",
                                dateOptionsPre
                              )}
                            </span>{" "}
                            @{" "}
                            <span className="italic">
                              {order.createdAt.toLocaleTimeString(
                                "en-US",
                                dateOptionsAft
                              )}
                            </span>
                          </p>
                          <p>
                            <span>{order.name}</span> &#x2022;{" "}
                            <span className="italic">{order.language}</span>
                          </p>
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          type="button"
                          //   onClick={() => removeItemHandler(product.id)}
                          className="inline-flex items-center rounded-md border border-transparent bg-red-500 p-2 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
