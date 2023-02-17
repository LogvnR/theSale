import { useState } from "react";
import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";

import { trpc } from "../../../utils/trpc";

import BackButton from "../../../components/Back Button/BackButton";
import Image from "next/image";

import Modal from "../../../components/Modal/Modal";
import PhotoPreview from "../../../components/Photo Preview/PhotoPreview";
import VehicleSpecs from "../../../components/Vehicle Specs/VehicleSpecs";
import Head from "next/head";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const Vehicle = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [previewIsOpen, setPreviewIsOpen] = useState<boolean>(false);
  const [previewPhoto, setPreviewPhoto] = useState<string>("");
  const router = useRouter();
  const carId = String(router.query.vehicle);

  const mainVehicle = trpc.vehicle.oneVehicle.useQuery({
    vehicleId: carId,
  }).data;

  return (
    <>
      <Head>
        <title>The Moving Sale</title>
        <meta
          name="description"
          content="A digital garage sale application for the Ricard Family"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal modalOpen={modalIsOpen} setModalOpen={setModalIsOpen} />
      <PhotoPreview
        setPreviewOpen={setPreviewIsOpen}
        previewOpen={previewIsOpen}
        previewPhoto={previewPhoto}
      />
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
                            <button
                              onClick={() => setPreviewPhoto(photo.url)}
                              className="relative h-[128px] w-full"
                            >
                              <Image
                                src={photo.url}
                                fill
                                alt={photo.title}
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
                {mainVehicle?.photos.map((photo) => (
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
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="flex gap-2 font-Jakarta text-3xl font-bold tracking-tight text-gray-500">
                <span>{mainVehicle?.year}</span>{" "}
                <span>{mainVehicle?.make}</span>
              </h1>
              <p className="font-Inter text-xl font-normal italic tracking-tight text-gray-900">
                {mainVehicle?.model}
              </p>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="font-Jakarta text-3xl tracking-tight text-gray-900">
                  $ {Number(mainVehicle?.price).toLocaleString()}
                </p>
                {mainVehicle?.isObo ? (
                  <p className="mt-2 font-Jakarta text-base italic tracking-tight text-gray-600">
                    Or your best offer <span className="mx-2">&#x2022;</span> O
                    tu mejor oferta
                  </p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-col">
                <h3 className="animate-pulse text-lg font-medium text-blue-700">
                  Contact Us! &#x2022; Contacta con Nosotros!
                </h3>
                <div className="mt-2">
                  <p className="font-bold text-gray-600">
                    Telephone &#x2022; Teléfono:
                  </p>
                  <p className="italic">+507-6284-8753</p>
                </div>
                <div className="mt-2">
                  <p className="font-bold text-gray-600">
                    Email &#x2022; E-Mail:
                  </p>
                  <p className="italic">ricardfamilycontact@gmail.com</p>
                </div>
              </div>

              <div className="mt-6 divide-gray-200 border-t pt-4">
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
                  <div>
                    <h3>
                      <div className="group relative flex w-full items-center justify-between py-6 text-left">
                        <span className="font-Inter text-sm font-medium text-gray-900">
                          Vehicle Description &#x2022; Descripcion Del Vehiculo
                        </span>
                      </div>
                    </h3>
                    <div className="prose prose-sm pb-6">
                      <p className="space-y-6 border-l-4 border-l-blue-200 pl-2 font-Inter text-base text-gray-500">
                        {mainVehicle?.descriptionEng}
                      </p>
                      <p className="mt-3 space-y-6 border-l-4 border-l-orange-200 pl-2 font-Inter text-base text-gray-500">
                        {mainVehicle?.descriptionEsp}
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

export default Vehicle;
