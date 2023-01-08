import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  XMarkIcon,
  CheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

import { trpc } from "../../../utils/trpc";
import Image from "next/image";
import BackButton from "../../../components/Back Button/BackButton";

const dateOptionsPre: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  weekday: "short",
};
const dateOptionsAft: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
};

const Order = () => {
  const router = useRouter();
  const orderId = String(router.query.order);
  const utils = trpc.useContext();

  const mainOrder = trpc.order.oneOrder.useQuery({ orderId: orderId }).data;
  const removePhotos = trpc.photo.removePhoto.useMutation();
  const updateProduct = trpc.product.updateProduct.useMutation();
  const updateOrder = trpc.order.updateOrder.useMutation({
    onSuccess: () => {
      utils.product.allProducts.invalidate();
      utils.order.oneOrder.invalidate({ orderId: orderId });
    },
  });
  const removeProducts = trpc.product.removeProduct.useMutation({
    onSuccess: () => {
      utils.product.allProducts.invalidate();
      utils.order.oneOrder.invalidate({ orderId: orderId });
    },
  });
  const removeOrder = trpc.order.removeOrder.useMutation({
    onSuccess: () => {
      utils.order.allOrders.invalidate();
      router.push("/orders");
    },
  });

  const removeOrderHandler = async (id: string) => {
    removeOrder.mutate({ id: id });
  };

  const completeItemHandler = async (id: string) => {
    removePhotos.mutate({ id: id });
    setTimeout(() => {
      removeProducts.mutate({ id: id });
    }, 1500);
  };

  const removeItemHandler = async (id: string, prodId: string) => {
    updateProduct.mutate({ orderId: id, prodStatus: false });
    setTimeout(() => {
      updateOrder.mutate({ id: id, productId: prodId });
    }, 1500);
  };

  const copy = (text: string | undefined, title: string) => {
    navigator.clipboard.writeText(String(text));
    toast(`${title} Copied!`);
  };

  return (
    <div className="bg-white">
      <Toaster
        toastOptions={{
          style: { background: "#d1fae5", color: "#22c55e" },
          duration: 2000,
        }}
      />
      <div className="py-4 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <BackButton link="/orders" />
            <h1 className="font-Jakarta text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order Details
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <p className="text-md font-Jakarta font-medium text-gray-600">
                Name:
              </p>
              <button
                onClick={() => copy(mainOrder?.name, "Name")}
                className="font-Inter italic text-gray-500 hover:text-emerald-600"
              >
                <p>{mainOrder?.name}</p>
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <p className="text-md font-Jakarta font-medium text-gray-600">
                Phone #:
              </p>
              <button
                onClick={() => copy(mainOrder?.phone, "Phone Number")}
                className="font-Inter italic text-gray-500 hover:text-emerald-600"
              >
                <p>{mainOrder?.phone}</p>
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <p className="text-md font-Jakarta font-medium text-gray-600">
                Language:
              </p>
              <p className="font-Inter italic text-gray-500">
                {mainOrder?.language}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              <div className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                  <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                    <div>
                      <dt className="font-Jakarta font-medium text-gray-900">
                        Order Id
                      </dt>
                      <dd className="mt-1 font-Inter text-gray-500">
                        {mainOrder?.id.substring(0, 7).toUpperCase()}
                      </dd>
                    </div>
                    <div className="hidden sm:block">
                      <dt className="font-Jakarta font-medium text-gray-900">
                        Date placed
                      </dt>
                      <dd className="mt-1 font-Inter text-gray-500">
                        <p className="w-full">
                          <span className="font-medium">
                            {mainOrder?.createdAt.toLocaleDateString(
                              "en-US",
                              dateOptionsPre
                            )}
                          </span>{" "}
                          @{" "}
                          <span className="italic">
                            {mainOrder?.createdAt.toLocaleTimeString(
                              "en-US",
                              dateOptionsAft
                            )}
                          </span>
                        </p>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-Jakarta font-medium text-gray-900">
                        Total amount
                      </dt>
                      <dd className="mt-1 font-Inter font-medium text-gray-900">
                        $ {mainOrder?.total}
                      </dd>
                    </div>
                  </dl>

                  <Menu
                    as="div"
                    className="relative flex justify-end lg:hidden"
                  >
                    <div className="flex items-center">
                      <Menu.Button className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">
                          Options for order {mainOrder?.id}
                        </span>
                        <EllipsisVerticalIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="p-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  removeOrderHandler(mainOrder!.id);
                                }}
                                disabled={
                                  mainOrder?.products.length === 0
                                    ? false
                                    : true
                                }
                                className={`block w-full rounded ${
                                  mainOrder?.products.length === 0
                                    ? "bg-red-100 text-red-700"
                                    : "bg-gray-100 text-gray-500"
                                }  px-4 py-2 text-left font-Inter text-sm `}
                              >
                                Delete
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                    <button
                      onClick={() => {
                        removeOrderHandler(mainOrder!.id);
                      }}
                      disabled={mainOrder?.products.length === 0 ? false : true}
                      className={` flex items-center justify-center rounded-md border  ${
                        mainOrder?.products.length === 0
                          ? "border-red-500 bg-red-100 text-red-500 hover:bg-red-200 focus:ring-red-500"
                          : "bg-gray-100 text-gray-500"
                      }  py-2 px-2.5 font-Inter text-sm font-medium shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2`}
                    >
                      <span>Delete Order</span>
                      <span className="sr-only">{mainOrder?.id}</span>
                    </button>
                  </div>
                </div>

                {/* Products */}
                <h4 className="sr-only">Items</h4>
                <ul
                  role="list"
                  className={`divide-y divide-gray-200 ${
                    removePhotos.isLoading || removeProducts.isLoading
                      ? "animate-pulse opacity-25"
                      : null
                  }`}
                >
                  {mainOrder?.products.map((order) => (
                    <li key={order.id} className="p-4 sm:p-6">
                      <div className="flex items-center sm:items-start">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                          <Image
                            src={order.photos[0]!.url}
                            alt={order.titleEng}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex h-full w-full flex-col justify-between">
                          <div className="ml-6 flex-1 text-sm">
                            <div className="font-Jakarta font-medium text-gray-900 sm:flex sm:justify-between">
                              <h5>{order.titleEng}</h5>
                              <p className="mt-2 sm:mt-0">$ {order.price}</p>
                            </div>
                            <p className="mt-2 font-Inter italic text-gray-500">
                              {order.id.substring(0, 7).toUpperCase()}
                            </p>
                          </div>

                          <div className="flex w-full justify-end gap-4">
                            <button
                              type="button"
                              onClick={() => completeItemHandler(order.id)}
                              className="inline-flex items-center rounded-md border border-transparent bg-green-100 p-2 text-green-500 shadow-sm hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                removeItemHandler(mainOrder.id, order.id)
                              }
                              className="inline-flex items-center rounded-md border border-transparent bg-red-100 p-2 text-red-500 shadow-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              <XMarkIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
