import { useState, useEffect } from "react";

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import useCart from "../hooks/useCart";

import { CartProduct } from "../helpers/types";

const products = [
  {
    id: 1,
    name: "Artwork Tee",
    href: "#",
    price: "$32.00",
    color: "Mint",
    size: "Medium",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-03-product-04.jpg",
    imageAlt: "Front side of mint cotton t-shirt with wavey lines pattern.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Charcoal",
    inStock: false,
    leadTime: "7-8 years",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front side of charcoal cotton t-shirt.",
  },
  // More products...
];

const MyCart = () => {
  const [myTotal, setMyTotal] = useState<number>(0);
  const [myCart, setMyCart] = useState<CartProduct[]>();
  const { cart, total, removeItem } = useCart();

  useEffect(() => {
    setMyCart(cart);
    setMyTotal(total);
  }, [total, cart]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-4 px-4 sm:py-24 sm:px-6 lg:px-0">
        <h1 className="text-left text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          My Cart
        </h1>
        <h4 className="text-left text-2xl font-normal italic tracking-tight text-gray-900 sm:text-4xl">
          Mi carrito
        </h4>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-t border-b border-gray-200"
            >
              {myCart?.map((item) => (
                <li key={item.prodId} className="flex py-6">
                  <div className="flex-shrink-0">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg"
                      alt={item.titleEng}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
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
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
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

            <div className="mt-10">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Request Items
              </button>
            </div>

            <div className="mt-6 flex cursor-pointer items-center justify-center gap-4 text-center text-sm hover:text-blue-500">
              <p>Continue Shopping &#x2022; Seguir comprando</p>
              <ArrowRightIcon
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};
export default MyCart;
