import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";

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
  const removeProducts = trpc.product.removeProduct.useMutation({
    onSuccess: () => {
      utils.order.oneOrder.invalidate({ orderId: orderId });
      utils.product.allProducts.invalidate();
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

  const removeItemHandler = async (id: string) => {
    removePhotos.mutate({ id: id });
    setTimeout(() => {
      removeProducts.mutate({ id: id });
    }, 1500);
  };

  return (
    <div className="bg-white">
      <div className="py-4 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <BackButton link="/orders" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order Details
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <p className="text-md font-medium text-gray-600">Name:</p>
              <p className="italic text-gray-500">{mainOrder?.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-md font-medium text-gray-600">Phone #:</p>
              <p className="italic text-gray-500">{mainOrder?.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-md font-medium text-gray-600">Language:</p>
              <p className="italic text-gray-500">{mainOrder?.language}</p>
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
                      <dt className="font-medium text-gray-900">Order Id</dt>
                      <dd className="mt-1 text-gray-500">
                        {mainOrder?.id.substring(0, 7).toUpperCase()}
                      </dd>
                    </div>
                    <div className="hidden sm:block">
                      <dt className="font-medium text-gray-900">Date placed</dt>
                      <dd className="mt-1 text-gray-500">
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
                      <dt className="font-medium text-gray-900">
                        Total amount
                      </dt>
                      <dd className="mt-1 font-medium text-gray-900">
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
                                className={
                                  "block w-full rounded bg-red-100 px-4 py-2 text-left text-sm text-red-700"
                                }
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
                          ? "border-red-500 bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500"
                          : "bg-gray-100 text-gray-700"
                      }  py-2 px-2.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2`}
                    >
                      <span>Delete Order</span>
                      <span className="sr-only">{mainOrder?.id}</span>
                    </button>
                  </div>
                </div>

                {/* Products */}
                <h4 className="sr-only">Items</h4>
                <ul role="list" className="divide-y divide-gray-200">
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
                            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                              <h5>{order.titleEng}</h5>
                              <p className="mt-2 sm:mt-0">$ {order.price}</p>
                            </div>
                            <p className="mt-2 italic text-gray-500">
                              {order.id.substring(0, 7).toUpperCase()}
                            </p>
                          </div>

                          <div className="flex w-full justify-end">
                            <button
                              type="button"
                              onClick={() => removeItemHandler(order.id)}
                              className="inline-flex items-center rounded-md border border-transparent bg-red-500 p-2 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              <TrashIcon
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
