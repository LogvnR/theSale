import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { trpc } from "../../../utils/trpc";

const RequestConfirmed = () => {
  const router = useRouter();
  const orderId = String(router.query.orderNumber);
  const myOrder = trpc.order.oneOrder.useQuery({ orderId: orderId }).data;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-indigo-600">
            {myOrder?.language === "English" ? "Thank You!" : "Gracias!"}
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {myOrder?.language === "English"
              ? "Request Sent!"
              : "¡Solicitud Enviada!"}
          </p>
          <p className="mt-2 text-base text-gray-500">
            {myOrder?.language === "English"
              ? "You will be contacted about order"
              : "Serás contactado sobre el pedido"}{" "}
            #{myOrder?.id.substring(0, 7).toUpperCase()}.
          </p>
        </div>

        <div className="mt-10 border-t border-gray-200">
          <h2 className="sr-only">Your order</h2>

          <h3 className="sr-only">Items</h3>
          {myOrder?.products.map((product) => (
            <div
              key={product.id}
              className="flex space-x-6 border-b border-gray-200 py-10"
            >
              <div className="relative h-20 w-20 flex-none  bg-gray-100 sm:h-40 sm:w-40">
                <Image
                  src={product.photos[0]!.url}
                  alt={product.photos[0]!.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="flex flex-auto flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {myOrder.language === "English"
                      ? product.titleEng
                      : product.titleEsp}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    {myOrder.language === "English"
                      ? product.descriptionEng
                      : product.descriptionEsp}
                  </p>
                </div>
                <div className="mt-6 flex flex-1 items-end">
                  <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium text-gray-900">Price</dt>
                      <dd className="ml-2 text-gray-700">$ {product.price}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Your information</h3>

            <h4 className="sr-only">Addresses</h4>
            <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">
                  {myOrder?.language === "English" ? "Your Name" : "Tu Nombre"}
                </dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">{myOrder?.name}</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">
                  {myOrder?.language === "English"
                    ? "Phone Number"
                    : "Número de teléfono"}
                </dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">{myOrder?.phone}</span>
                  </address>
                </dd>
              </div>
            </dl>

            <h3 className="sr-only">Summary</h3>

            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">$ {myOrder?.total}</dd>
              </div>
            </dl>
          </div>
        </div>
        <Link href={"/products"}>
          <button
            type="button"
            className="mt-12 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {myOrder?.language === "English"
              ? "Keep Shopping"
              : "Seguir comprando"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RequestConfirmed;
