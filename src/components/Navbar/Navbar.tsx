import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPage, setSelectedPage] = useState<string>("Home");
  const [navQuantity, setNavQuantity] = useState<number>(0);
  const { data: sessionData } = useSession();

  const { quantity } = useCart();

  useEffect(() => {
    setNavQuantity(quantity);
  }, [quantity]);

  console.log(sessionData?.user);

  return (
    <Disclosure as="nav" className="bg-white shadow">
      <>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between md:flex-row-reverse">
            <div className="-mr-2 flex items-center">
              <Link href={"/MyCart"}>
                <button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <div className="relative">
                    <ShoppingCartIcon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                    <div className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500">
                      <p className="text-[11px] text-white">
                        {navQuantity > 9 ? "9+" : navQuantity}
                      </p>
                    </div>
                  </div>
                </button>
              </Link>
            </div>
            <div className="flex">
              <button
                onClick={() => setSelectedPage("Home")}
                className="flex flex-shrink-0 items-center"
              >
                <Link href={"/"}>
                  <img
                    className="block h-8 w-auto rounded lg:hidden"
                    src={`${
                      sessionData?.user?.name === "TooVeryLegit"
                        ? sessionData.user.image
                        : "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    }`}
                    alt="Your Company"
                  />
                </Link>
                <img
                  className="hidden h-8 w-auto lg:block"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </button>

              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                <Link
                  href={"/"}
                  className={`inline-flex items-center border-b-2 ${
                    selectedPage === "Home"
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } px-1 pt-1 text-sm font-medium `}
                >
                  <button
                    onClick={() => {
                      setSelectedPage("Home");
                      setIsOpen(false);
                    }}
                  >
                    Home
                  </button>
                </Link>

                <button
                  onClick={() => {
                    setSelectedPage("Vehicles");
                    setIsOpen(false);
                  }}
                  className={`inline-flex items-center border-b-2 ${
                    selectedPage === "Vehicles"
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } px-1 pt-1 text-sm font-medium `}
                >
                  Vehicles
                </button>
                <Link
                  href={"/products"}
                  className={`inline-flex items-center border-b-2 ${
                    selectedPage === "Items"
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } px-1 pt-1 text-sm font-medium `}
                >
                  <button
                    onClick={() => {
                      setSelectedPage("Items");
                      setIsOpen(false);
                    }}
                  >
                    Items for sale
                  </button>
                </Link>

                <button
                  onClick={sessionData ? () => signOut() : () => signIn()}
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Admin
                </button>
                {sessionData?.user ? (
                  <>
                    <Link
                      href={"/AddProduct"}
                      className={`inline-flex items-center border-b-2 ${
                        selectedPage === "AddItems"
                          ? "border-emerald-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      } px-1 pt-1 text-sm font-medium `}
                    >
                      <button
                        onClick={() => {
                          setSelectedPage("AddItems");
                          setIsOpen(false);
                        }}
                      >
                        Add Items
                      </button>
                    </Link>

                    <Link
                      href={"/AllProducts"}
                      className={`inline-flex items-center border-b-2 ${
                        selectedPage === "AllItems"
                          ? "border-emerald-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      } px-1 pt-1 text-sm font-medium `}
                    >
                      <button
                        onClick={() => {
                          setSelectedPage("AllItems");
                          setIsOpen(false);
                        }}
                      >
                        All Items
                      </button>
                    </Link>

                    <Link
                      href={"/orders"}
                      className={`inline-flex items-center border-b-2 ${
                        selectedPage === "AllOrders"
                          ? "border-emerald-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      } px-1 pt-1 text-sm font-medium `}
                    >
                      <button
                        onClick={() => {
                          setSelectedPage("AllOrders");
                          setIsOpen(false);
                        }}
                      >
                        All Orders
                      </button>
                    </Link>
                  </>
                ) : null}
              </div>
            </div>

            <div className="-mr-2 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="space-y-1 pt-2 pb-3">
            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
            <Link href={"/"}>
              <Disclosure.Button
                onClick={() => {
                  setSelectedPage("Home");
                  setIsOpen(false);
                }}
                className={`block w-full border-l-4 ${
                  selectedPage === "Home"
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-transparent bg-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                }  py-2 pl-3 pr-4 text-left text-base font-medium `}
              >
                Home
              </Disclosure.Button>
            </Link>

            <Disclosure.Button
              onClick={() => {
                setSelectedPage("Vehicles");
                setIsOpen(false);
              }}
              className={`block w-full border-l-4 ${
                selectedPage === "Vehicles"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-transparent bg-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              }  py-2 pl-3 pr-4 text-left text-base font-medium `}
            >
              Vehicles
            </Disclosure.Button>
            <Link href={"/products"}>
              <Disclosure.Button
                onClick={() => {
                  setSelectedPage("Items");
                  setIsOpen(false);
                }}
                className={`block w-full border-l-4 ${
                  selectedPage === "Items"
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-transparent bg-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                }  py-2 pl-3 pr-4 text-left text-base font-medium `}
              >
                Items for sale
              </Disclosure.Button>
            </Link>

            <Disclosure.Button
              onClick={sessionData ? () => signOut() : () => signIn()}
              className="block w-full border-l-4 border-transparent py-2 pl-3 pr-4 text-left text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            >
              Admin
            </Disclosure.Button>
            {sessionData?.user ? (
              <>
                <Link href={"/AddProduct"}>
                  <Disclosure.Button
                    onClick={() => {
                      setSelectedPage("AddItems");
                      setIsOpen(false);
                    }}
                    className={`block w-full border-l-4 ${
                      selectedPage === "AddItems"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                        : "border-transparent bg-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                    }  py-2 pl-3 pr-4 text-left text-base font-medium `}
                  >
                    Add Items
                  </Disclosure.Button>
                </Link>
                <Link href={"/AllProducts"}>
                  <Disclosure.Button
                    onClick={() => {
                      setSelectedPage("AllItems");
                      setIsOpen(false);
                    }}
                    className={`block w-full border-l-4 ${
                      selectedPage === "AllItems"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                        : "border-transparent bg-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                    }  py-2 pl-3 pr-4 text-left text-base font-medium `}
                  >
                    All Items
                  </Disclosure.Button>
                </Link>
                <Link href={"/orders"}>
                  <Disclosure.Button
                    onClick={() => {
                      setSelectedPage("AllOrders");
                      setIsOpen(false);
                    }}
                    className={`block w-full border-l-4 ${
                      selectedPage === "AllOrders"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                        : "border-transparent bg-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                    }  py-2 pl-3 pr-4 text-left text-base font-medium `}
                  >
                    All Orders
                  </Disclosure.Button>
                </Link>
              </>
            ) : null}
          </div>
        </Disclosure.Panel>
      </>
    </Disclosure>
  );
};

export default Navbar;
