import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Disclosure, Tab } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

import { trpc } from "../../../../utils/trpc";

import BackButton from "../../../../components/Back Button/BackButton";
import Image from "next/image";
import useCart from "../../../../hooks/useCart";
import Modal from "../../../../components/Modal/Modal";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const Product = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const productId = String(router.query.product);
  const categoryId = String(router.query.productType);
  const { cart, addToCart } = useCart();

  const mainProduct = trpc.product.oneProduct.useQuery({
    productId: productId,
  }).data;

  const addToCartHandler = () => {
    if (cart.filter((item) => item.prodId === mainProduct?.id).length > 0) {
      setIsDisabled(true);
    } else {
      addToCart({
        prodId: mainProduct!.id,
        titleEng: mainProduct!.titleEng,
        titleEsp: mainProduct!.titleEsp,
        price: +mainProduct!.price,
        photo: mainProduct!.photos!.find(
          (photo) => photo.isFeaturePhoto === true
        )!.url,
      });
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    if (cart.filter((item) => item.prodId === mainProduct?.id).length > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [cart]);

  console.log(mainProduct);

  return (
    <>
      <Modal modalOpen={modalIsOpen} setModalOpen={setModalIsOpen} />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-4 px-4 sm:py-12 lg:max-w-7xl lg:px-8">
          <BackButton link={`/products/${categoryId.toLowerCase()}`} />

          <div className="mt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {mainProduct?.photos.map((photo) => (
                    <Tab
                      key={photo.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only"> {photo.title} </span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <div className="relative h-[128px] w-full">
                              <Image
                                src={photo.url}
                                fill
                                alt={photo.title}
                                className="object-cover sm:rounded-lg"
                              />
                            </div>
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-indigo-500" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                {mainProduct?.photos.map((photo) => (
                  <Tab.Panel key={photo.id}>
                    <div className="relative h-[257px] w-full lg:h-[444px]">
                      <Image
                        src={photo.url}
                        fill
                        alt={photo.title}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="font-Jakarta text-3xl font-bold tracking-tight text-gray-900">
                {mainProduct?.titleEng}
              </h1>
              <p className="font-Inter text-xl font-normal italic tracking-tight text-gray-900">
                {mainProduct?.titleEsp}
              </p>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="font-Jakarta text-3xl tracking-tight text-gray-900">
                  $ {mainProduct?.price}
                </p>
              </div>

              <div className="mt-6 flex flex-col">
                <div className="sm:flex-col1 mt-10 flex">
                  <button
                    onClick={() => {
                      if (mainProduct?.isPending) {
                        setModalIsOpen(true);
                      } else {
                        addToCartHandler();
                      }
                    }}
                    disabled={isDisabled}
                    className={`flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent font-Inter ${
                      !mainProduct?.isPending
                        ? isDisabled
                          ? "bg-gray-100 text-gray-500"
                          : "bg-blue-100 text-blue-500 hover:bg-blue-200 focus:ring-blue-500"
                        : "bg-yellow-100 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-500"
                    }  py-3 px-5 text-base font-medium focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full`}
                  >
                    {!mainProduct?.isPending ? (
                      isDisabled ? (
                        <p>Item in cart &#x2022; Artículo en carrito</p>
                      ) : (
                        <p>Add to cart &#x2022; Añadir al carrito</p>
                      )
                    ) : (
                      <p>Item Pending &#x2022; Elemento Pendiente</p>
                    )}
                  </button>
                </div>
              </div>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  <Disclosure as="div">
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={classNames(
                                open ? "text-blue-600" : "text-gray-900",
                                "font-Inter text-sm font-medium"
                              )}
                            >
                              Description &#x2022; Descripción
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="block h-6 w-6 text-indigo-400 group-hover:text-blue-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="prose prose-sm pb-6"
                        >
                          <p className="space-y-6 border-l-4 border-l-blue-200 pl-2 font-Inter text-base text-gray-500">
                            {mainProduct?.descriptionEng}
                          </p>
                          <p className="mt-3 space-y-6 border-l-4 border-l-orange-200 pl-2 font-Inter text-base text-gray-500">
                            {mainProduct?.descriptionEsp}
                          </p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
