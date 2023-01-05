import { useState, useEffect } from "react";

import { ArrowRightIcon, IdentificationIcon } from "@heroicons/react/20/solid";
import useCart from "../hooks/useCart";

import { CartProduct } from "../helpers/types";
import Link from "next/link";
import Image from "next/image";
import CheckoutForm from "../components/Admin Form/CheckoutForm";
import emptyCart from "../../public/empty_cart.svg";
import EmptyCart from "../components/Empty Cart/EmptyCart";

const MyCart = () => {
  const [myTotal, setMyTotal] = useState<number>(0);
  const [myCart, setMyCart] = useState<CartProduct[]>();
  const { cart, total, removeItem, resetCart } = useCart();

  useEffect(() => {
    setMyCart(cart);
    setMyTotal(total);
  }, [total, cart]);

  if (myCart?.length === 0) return <EmptyCart />;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-4 px-4 sm:py-24 sm:px-6 lg:px-0">
        <h1 className="text-left text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          My Cart
        </h1>
        <h4 className="text-left text-2xl font-normal italic tracking-tight text-gray-900 sm:text-4xl">
          Mi carrito
        </h4>

        <div className="mt-8">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <div className="mb-2 flex w-full justify-end">
              <button
                onClick={() => resetCart()}
                className="text-sm font-medium text-blue-500 hover:text-blue-600"
              >
                Clear Cart &#x2022; Vaciar Carrito
              </button>
            </div>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-t border-b border-gray-200"
            >
              {myCart?.map((item) => (
                <li key={item.prodId} className="flex py-6">
                  <div className="relative h-24 w-24 flex-shrink-0 sm:h-32 sm:w-32">
                    <Image
                      src={item.photo}
                      alt={item.titleEng}
                      fill
                      className="rounded-md object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <a className="font-medium text-gray-700 hover:text-gray-800">
                            {item.titleEng}
                          </a>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-gray-900">
                          $ {item.price}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.titleEsp}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-1 items-end justify-end">
                      <div className="ml-4">
                        <button
                          onClick={() => removeItem(item.prodId, item.price)}
                          type="button"
                          className="text-sm font-medium text-orange-600 hover:text-orange-700"
                        >
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-base font-medium text-gray-900">
                    Total
                  </div>
                  <div className="ml-4 text-base font-medium text-gray-900">
                    ${myTotal}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-8">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-gray-500">
                  <IdentificationIcon
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>

            <CheckoutForm />

            <Link href={"/products"}>
              <div className="mt-6 flex cursor-pointer items-center justify-center gap-4 text-center text-sm hover:text-blue-500">
                <p>Continue Shopping Seguir comprando</p>
                <ArrowRightIcon
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};
export default MyCart;
