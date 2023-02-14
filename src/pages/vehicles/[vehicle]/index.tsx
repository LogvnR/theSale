import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Disclosure, Tab } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

import { trpc } from "../../../utils/trpc";

import BackButton from "../../../components/Back Button/BackButton";
import Image from "next/image";
import useCart from "../../../hooks/useCart";
import Modal from "../../../components/Modal/Modal";
import VehicleSpecs from "../../../components/Vehicle Specs/VehicleSpecs";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const Vehicle = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [userOffer, setUserOffer] = useState<number>(0);
  const router = useRouter();
  const carId = String(router.query.vehicle);
  const { cart, addToCart } = useCart();

  const mainVehicle = trpc.vehicle.oneVehicle.useQuery({
    vehicleId: carId,
  }).data;

  const addToCartHandler = () => {
    // if (cart.filter((item) => item.prodId === mainProduct?.id).length > 0) {
    //   setIsDisabled(true);
    // } else {
    //   addToCart({
    //     prodId: mainProduct!.id,
    //     titleEng: mainProduct!.titleEng,
    //     titleEsp: mainProduct!.titleEsp,
    //     price: +mainProduct!.price,
    //     userOffer: userOffer,
    //     photo: mainProduct!.photos!.find(
    //       (photo) => photo.isFeaturePhoto === true
    //     )!.url,
    //   });
    //   setIsDisabled(false);
    // }
  };

  useEffect(() => {
    if (cart.filter((item) => item.prodId === mainVehicle?.id).length > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [cart, mainVehicle?.id]);

  console.log(carId);
  console.log(mainVehicle);

  return (
    <>
      <Modal modalOpen={modalIsOpen} setModalOpen={setModalIsOpen} />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-4 px-4 sm:py-12 lg:max-w-7xl lg:px-8">
          <BackButton link={`/vehicles`} />

          <div className="mt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {mainVehicle?.photos.map((photo) => (
                    <Tab
                      key={photo.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-red-500 text-sm font-medium uppercase text-blue-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
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
                {mainVehicle?.photos.map((photo) => (
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
              <h1 className="flex gap-2 font-Jakarta text-3xl font-bold tracking-tight text-purple-500">
                <span>{mainVehicle?.year}</span>{" "}
                <span>{mainVehicle?.make}</span>
              </h1>
              <p className="font-Inter text-xl font-normal italic tracking-tight text-gray-900">
                {mainVehicle?.model}
              </p>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="font-Jakarta text-3xl tracking-tight text-gray-900">
                  $ {mainVehicle?.price}
                </p>
                {mainVehicle?.isObo ? (
                  <p className="mt-2 font-Jakarta text-base italic tracking-tight text-gray-600">
                    Or your best offer <span className="mx-2">&#x2022;</span> O
                    tu mejor oferta
                  </p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-col">
                {mainVehicle?.isObo ? (
                  !mainVehicle?.isPending ? (
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
                            onChange={(e) =>
                              setUserOffer(e.target.valueAsNumber)
                            }
                          />
                        </div>
                      </div>
                    ) : null
                  ) : null
                ) : null}
                <div className="sm:flex-col1 mt-4 flex">
                  <button
                    onClick={() => {
                      if (mainVehicle?.isPending) {
                        setModalIsOpen(true);
                      } else {
                        addToCartHandler();
                      }
                    }}
                    disabled={isDisabled}
                    className={`flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent font-Inter ${
                      !mainVehicle?.isPending
                        ? isDisabled
                          ? "bg-gray-100 text-gray-500"
                          : "bg-blue-100 text-blue-500 hover:bg-blue-200 focus:ring-blue-500"
                        : "bg-yellow-100 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-500"
                    }  py-3 px-4 text-base font-medium focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full`}
                  >
                    {!mainVehicle?.isPending ? (
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

              <div className="mt-8">
                <h3 className="font-Inter text-sm font-medium text-gray-900">
                  Vehicle Details
                </h3>
                <VehicleSpecs vehicle={mainVehicle} />
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
                              Vehicle Description &#x2022; Descripción
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
                            {mainVehicle?.descriptionEng}
                          </p>
                          <p className="mt-3 space-y-6 border-l-4 border-l-orange-200 pl-2 font-Inter text-base text-gray-500">
                            {mainVehicle?.descriptionEsp}
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

export default Vehicle;
