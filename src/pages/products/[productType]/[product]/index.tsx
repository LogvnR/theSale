import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Disclosure, Tab } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

import { trpc } from "../../../../utils/trpc";

import BackButton from "../../../../components/Back Button/BackButton";
import Image from "next/image";
import useCart from "../../../../hooks/useCart";
import Modal from "../../../../components/Modal/Modal";
import Head from "next/head";
import PhotoPreview from "../../../../components/Photo Preview/PhotoPreview";
import { photoRouter } from "../../../../server/trpc/router/photo";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const Product = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [previewIsOpen, setPreviewIsOpen] = useState<boolean>(false);
  const [previewPhoto, setPreviewPhoto] = useState<string>("");
  const [userOffer, setUserOffer] = useState<number>(0);

  const router = useRouter();
  const productId = String(router.query.product);
  const categoryId = String(router.query.productType);
  const mainProduct = trpc.product.oneProduct.useQuery({
    productId: productId,
  }).data;
  const addOffer = trpc.product.addOfferToProduct.useMutation();

  const { cart, addToCart } = useCart();

  const addToCartHandler = () => {
    if (cart.filter((item) => item.prodId === mainProduct?.id).length > 0) {
      setIsDisabled(true);
    } else {
      addToCart({
        prodId: mainProduct!.id,
        titleEng: mainProduct!.titleEng,
        titleEsp: mainProduct!.titleEsp,
        price: +mainProduct!.price,
        userOffer: userOffer,
        photo: mainProduct!.photos!.find(
          (photo) => photo.isFeaturePhoto === true
        )!.url,
      });
      addOffer.mutate({
        productId: mainProduct!.id,
        userOffer: String(userOffer),
      });
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    if (cart.filter((item) => item.prodId === mainProduct?.id).length > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [cart, mainProduct?.id]);

  // useEffect(() => {
  //   const previewArr = mainProduct?.photos.filter((photo) => {
  //     if (photo.isFeaturePhoto === true) return photo.url;
  //   });

  //   setPreviewPhoto(String(previewArr?.pop()?.url));
  // }, []);

  return (
    <>
      <Modal modalOpen={modalIsOpen} setModalOpen={setModalIsOpen} />
      <PhotoPreview
        setPreviewOpen={setPreviewIsOpen}
        previewOpen={previewIsOpen}
        previewPhoto={previewPhoto}
      />
      <Head>
        <title>The Sale</title>
        <meta
          name="description"
          content="A digital garage sale application for the Ricard Family"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                            <button
                              onClick={() => setPreviewPhoto(photo.url)}
                              className="relative h-[128px] w-full"
                            >
                              <Image
                                src={photo.url}
                                fill
                                alt={`Preview for ${photo.title}`}
                                className="object-cover sm:rounded-lg"
                              />
                            </button>
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
                  <>
                    <Tab.Panel key={photo.id}>
                      <div className="relative h-[257px] w-full lg:h-[444px]">
                        <button
                          onClick={() => {
                            setPreviewPhoto(photo.url);
                            setPreviewIsOpen(true);
                          }}
                        >
                          <Image
                            src={photo.url}
                            fill
                            alt={photo.title}
                            className="rounded-lg object-cover"
                          />
                        </button>
                      </div>
                    </Tab.Panel>
                  </>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="font-Jakarta text-3xl font-bold tracking-tight text-gray-900">
                {mainProduct?.titleEng}
              </h1>
              <p className="mt-1 font-Inter text-xl font-normal italic tracking-tight text-gray-500">
                {mainProduct?.titleEsp}
              </p>

              <div className="mt-4">
                <h2 className="sr-only">Product information</h2>
                <p className="font-Jakarta text-3xl tracking-tight text-gray-900">
                  $ {mainProduct?.price}
                </p>
                {mainProduct?.isObo ? (
                  <p className="mt-2 font-Jakarta text-base italic tracking-tight text-gray-600">
                    Or your best offer <span className="mx-2">&#x2022;</span> O
                    tu mejor oferta
                  </p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-col">
                {!mainProduct?.isPending ? (
                  !isDisabled ? (
                    <div className="mt-10 max-w-xs">
                      <label
                        htmlFor="offer"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Your offer <span className="mx-2">&#x2022;</span> Tu
                        oferta
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="offer"
                          id="offer"
                          className="block w-full rounded-md bg-gray-100 py-3 px-4 text-gray-600 shadow-sm outline-gray-600 sm:text-sm"
                          placeholder="$"
                          onChange={(e) => setUserOffer(e.target.valueAsNumber)}
                        />
                      </div>
                    </div>
                  ) : null
                ) : null}
                <div className="sm:flex-col1 mt-4 flex">
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
                    }  py-3 px-4 text-base font-medium focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full`}
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
                  <div>
                    <h3>
                      <div className="group relative flex w-full items-center justify-between py-6 text-left">
                        <span className="font-Inter text-sm font-medium text-gray-900">
                          Description &#x2022; Descripción
                        </span>
                      </div>
                    </h3>
                    <div className="prose prose-sm pb-6">
                      <p className="space-y-6 border-l-4 border-l-blue-200 pl-2 font-Inter text-base text-gray-500">
                        {mainProduct?.descriptionEng}
                      </p>
                      <p className="mt-3 space-y-6 border-l-4 border-l-orange-200 pl-2 font-Inter text-base text-gray-500">
                        {mainProduct?.descriptionEsp}
                      </p>
                    </div>
                  </div>
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
