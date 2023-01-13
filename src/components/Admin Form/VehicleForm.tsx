import { useState, useEffect } from "react";
import {
  PlusIcon as PlusIconMini,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { trpc } from "../../utils/trpc";

const schema = z.object({
  newYear: z.string().min(4, { message: "Please enter a valid year" }),
  newMake: z.string().min(1, { message: "Please enter a valid make" }),
  newModel: z.string().min(1, { message: "Please enter a valid model" }),
  newMileage: z.string().min(1, { message: "Please enter a valid mileage" }),
  newKilometers: z
    .string()
    .min(1, { message: "Please enter a valid amount of kilometers" }),
  newFuelEng: z.string().min(1, { message: "Please enter a valid fuel type" }),
  newFuelEsp: z.string().min(1, { message: "Please enter a valid fuel type" }),
  newSeats: z
    .string()
    .min(1, { message: "Please enter a valid number of seats" }),
  newEngine: z.string().min(1, { message: "Please enter a valid engine type" }),
  newDrivetrain: z
    .string()
    .min(1, { message: "Please enter a valid drivetrain type" }),
  newType: z.string().min(1, { message: "Please enter a valid vehicle type" }),
  newPrice: z.string().min(1, { message: "Please enter a valid price" }),
  newColor: z.string().min(1, { message: "Please enter a valid color" }),
  newDescriptionEng: z
    .string()
    .min(1, { message: "Please enter a valid description" }),
  newDescriptionEsp: z
    .string()
    .min(1, { message: "Please enter a valid description" }),
});

const VehicleForm = () => {
  const [year, setYear] = useState<number>(0);
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [mileage, setMileage] = useState<number>(0);
  const [kilometers, setKilometers] = useState<number>(0);
  const [fuelEng, setFuelEng] = useState<string>("");
  const [fuelEsp, setFuelEsp] = useState<string>("");
  const [seats, setSeats] = useState<number>(0);
  const [engine, setEngine] = useState<string>("");
  const [drivetrain, setDrivetrain] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [color, setColor] = useState<string>("");
  const [descriptionEng, setDescriptionEng] = useState<string>("");
  const [descriptionEsp, setDescriptionEsp] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [photos, setPhotos] = useState<
    { isFeaturePhoto?: boolean | undefined; title: string; url: string }[]
  >([]);

  const [inputContainer, setInputContainer] = useState([{ url: "" }]);

  const utils = trpc.useContext();

  const vehicles = trpc.vehicle.allVehicles.useQuery().data;
  const addVehicle = trpc.vehicle.addVehicle.useMutation({
    onSuccess: () => {
      utils.vehicle.allVehicles.invalidate();
      reset({
        newYear: "",
        newMake: "",
        newModel: "",
        newMileage: "",
        newKilometers: "",
        newFuelEng: "",
        newFuelEsp: "",
        newSeats: "",
        newEngine: "",
        newDrivetrain: "",
        newType: "",
        newPrice: "",
        newColor: "",
        newDescriptionEng: "",
        newDescriptionEsp: "",
      });
      setInputContainer([{ url: "" }]);
      setPhoto("");
      setPhotos([]);
    },
  });

  const addCategoryHandler = () => {
    addVehicle.mutate({
      year: String(year),
      make: make,
      model: model,
      mileage: String(mileage),
      kilometers: String(kilometers),
      fuelEng: fuelEng,
      fuelEsp: fuelEsp,
      seats: String(seats),
      engine: engine,
      drivetrain: drivetrain,
      type: type,
      price: String(price),
      color: color,
      descriptionEng: descriptionEng,
      descriptionEsp: descriptionEsp,
      photos: photos,
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ newCategoryEng: "", newCategoryEsp: "" });
    }
  }, [formState, reset, isSubmitSuccessful]);

  const setURL = (idx: number) => {
    // modify URL string for upload
    const newUrl = photo
      .replace("file/d/", "uc?export=view&id=")
      .replace("/view", "");

    if (photos.length === 0) {
      setPhotos([
        ...photos,
        {
          title: make + model + year + `${idx + 1}`,
          url: newUrl,
          isFeaturePhoto: true,
        },
      ]);
    } else {
      setPhotos([
        ...photos,
        { title: make + model + year + `${idx + 1}`, url: newUrl },
      ]);
    }
  };

  return (
    <div className="mx-8 mt-2 mb-6 flex flex-col">
      <p className="font-Jakarta italic">Current Vehicles:</p>
      <div className="mt-2 flex gap-2">
        {vehicles?.map((vehicle) => (
          <p key={vehicle.id}>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 font-Inter text-xs font-medium text-green-800">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </p>
        ))}
        {vehicles?.length === 0 ? (
          <p className="px-2.5 py-0.5 text-xs italic">No Current Vehicles</p>
        ) : null}
      </div>

      <form
        className="mt-6 flex flex-col gap-6 font-Inter"
        onSubmit={handleSubmit(addCategoryHandler)}
      >
        {/* ===== Year ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newYear
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newYear ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newYear?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Year
            </label>
          )}
          <input
            type="number"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="2023"
            {...register("newYear")}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>
        {/* ===== Make ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newMake
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newMake ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newMake?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Make
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="Ford"
            {...register("newMake")}
            onChange={(e) => setMake(e.target.value)}
          />
        </div>
        {/* ===== Model ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newModel
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newModel ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newModel?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Model
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="Mustang"
            {...register("newModel")}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        {/* ===== Mileage ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newMileage
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newMileage ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newMileage?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Mileage
            </label>
          )}
          <input
            type="number"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="25000"
            {...register("newMileage")}
            onChange={(e) => setMileage(Number(e.target.value))}
          />
        </div>
        {/* ===== Kilometers ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newKilometers
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newKilometers ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newKilometers?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Kilometers
            </label>
          )}
          <input
            type="number"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="Mileage x1.6"
            {...register("newKilometers")}
            onChange={(e) => setKilometers(Number(e.target.value))}
          />
        </div>
        {/* ===== Fuel Type Eng ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newFuelEng
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newFuelEng ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newFuelEng?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Fuel Eng
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="Gas"
            {...register("newFuelEng")}
            onChange={(e) => setFuelEng(e.target.value)}
          />
        </div>
        {/* ===== Fuel Type Esp ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newFuelEsp
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newFuelEsp ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newFuelEsp?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Fuel Esp
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="Gasolina"
            {...register("newFuelEsp")}
            onChange={(e) => setFuelEsp(e.target.value)}
          />
        </div>

        {/* ===== Seats ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newSeats
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newSeats ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newSeats?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Seats
            </label>
          )}
          <input
            type="number"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="4"
            {...register("newSeats")}
            onChange={(e) => setSeats(Number(e.target.value))}
          />
        </div>

        {/* ===== Engine ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newEngine
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newEngine ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newEngine?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Engine
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="V8"
            {...register("newEngine")}
            onChange={(e) => setEngine(e.target.value)}
          />
        </div>

        {/* ===== Drivetrain ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newDrivetrain
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newDrivetrain ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newDrivetrain?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Drivetrain
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="RWD"
            {...register("newDrivetrain")}
            onChange={(e) => setDrivetrain(e.target.value)}
          />
        </div>
        {/* ===== Vehicle Type ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newType
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newType ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newType?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Type
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="Coupe"
            {...register("newType")}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        {/* ===== Price ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newPrice
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newPrice ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newPrice?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Price
            </label>
          )}
          <input
            type="number"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="42000"
            {...register("newPrice")}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        {/* ===== Color ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newColor
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newColor ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newColor?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Color
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="Ruby Metallic Red"
            {...register("newColor")}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        {/* ===== Description Eng ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newDescriptionEng
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newDescriptionEng ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newDescriptionEng?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Description Eng
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="Information"
            {...register("newDescriptionEng")}
            onChange={(e) => setDescriptionEng(e.target.value)}
          />
        </div>
        {/* ===== Description Esp ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newDescriptionEsp
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newDescriptionEsp ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newDescriptionEsp?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Vehicle Description Esp
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-300 outline-none focus:ring-0 sm:text-sm"
            placeholder="Información"
            {...register("newDescriptionEsp")}
            onChange={(e) => setDescriptionEsp(e.target.value)}
          />
        </div>

        {/* ===== Add New Photos ===== */}
        <div className="flex flex-col gap-2">
          <p className="text-sm italic tracking-wide">
            First Photo is always featured
          </p>
          <p className="mb-2 flex animate-pulse items-center font-Jakarta text-sm font-bold tracking-wide text-blue-700">
            Always click{" "}
            <CheckIcon className="mx-2 h-4 w-4" aria-hidden="true" /> after
            every new photo
          </p>
          {inputContainer.map((input, i) => (
            <div
              key={i}
              className="flex w-full items-center justify-between gap-4"
            >
              <div
                className={`relative w-full rounded-md border ${
                  errors.newPhoto
                    ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
                    : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
                }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
              >
                {errors.newPhoto ? (
                  <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
                    {String(errors.newPhoto?.message)}
                  </label>
                ) : (
                  <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
                    New Photo
                  </label>
                )}
                <input
                  type="text"
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="New Photo"
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </div>
              <button
                onClick={() => setURL(i)}
                type="button"
                className={`inline-flex items-center rounded-full border border-transparent ${
                  errors.newPhoto
                    ? "bg-red-100 text-red-500"
                    : "bg-emerald-100 text-green-500 hover:bg-emerald-200 focus:ring-emerald-500"
                } p-2  shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2`}
              >
                {errors.newPhoto ? (
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          ))}

          {/* ===== Add New Photo Input ===== */}
          <div className="flex w-full items-center justify-center">
            <button
              onClick={() =>
                setInputContainer([...inputContainer, { url: "" }])
              }
              type="button"
              className="inline-flex items-center rounded-full border border-transparent bg-emerald-100 p-2 text-green-500 shadow-sm hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <PlusIconMini className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex w-full items-center justify-end">
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-green-500 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Add New Vehicle
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;
