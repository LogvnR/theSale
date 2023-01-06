import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

import { trpc } from "../../../../utils/trpc";

import BackButton from "../../../../components/Back Button/BackButton";
import Image from "next/image";
import useCart from "../../../../hooks/useCart";

const product = {
  name: "Zip Tote Basket",
  price: "$140",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    {
      id: 2,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    {
      id: 3,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    // More images...
  ],
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    // More sections...
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Product = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const router = useRouter();
  const productId = String(router.query.product);
  const categoryId = String(router.query.productType);
  const { cart, total, quantity, addToCart } = useCart();

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
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {mainProduct?.titleEng}
            </h1>
            <p className="text-xl font-normal italic tracking-tight text-gray-900">
              {mainProduct?.titleEsp}
            </p>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                $ {mainProduct?.price}
              </p>
            </div>

            <div className="mt-6 flex flex-col">
              <div className="sm:flex-col1 mt-10 flex">
                <button
                  onClick={() => addToCartHandler()}
                  disabled={isDisabled}
                  className={`flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent ${
                    isDisabled
                      ? "bg-gray-100 text-gray-500"
                      : "bg-blue-100 text-blue-500 hover:bg-blue-200 focus:ring-blue-500"
                  }  py-3 px-8 text-base font-medium focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full`}
                >
                  {isDisabled ? (
                    <p>Item in cart &#x2022; Artículo en carrito</p>
                  ) : (
                    <p>Add to cart &#x2022; Añadir al carrito</p>
                  )}
                </button>
              </div>
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t">
                {product.details.map((detail) => (
                  <Disclosure as="div" key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={classNames(
                                open ? "text-blue-600" : "text-gray-900",
                                "text-sm font-medium"
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
                          {/* <ul role="list">
                            {detail.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul> */}
                          <p className="space-y-6 border-l-4 border-l-blue-200 pl-2 text-base text-gray-700">
                            {mainProduct?.descriptionEng}
                          </p>
                          <p className="mt-3 space-y-6 border-l-4 border-l-orange-200 pl-2 text-base text-gray-700">
                            {mainProduct?.descriptionEsp}
                          </p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
