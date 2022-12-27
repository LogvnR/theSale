import { useState } from "react";
import {
  PlusIcon as PlusIconMini,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { trpc } from "../../utils/trpc";

const schema = z.object({
  newProduct: z
    .string()
    .min(1, { message: "Name must be greater than 1 character" }),
  newPrice: z.coerce
    .number()
    .nonnegative({ message: " Price cannot be negative" }),
  newDescription: z
    .string()
    .min(1, { message: "Description must be greater than 1 character" }),
});

const AdminForm = () => {
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("Tech");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [photos, setPhotos] = useState<
    { isFeaturePhoto?: boolean | undefined; title: string; url: string }[]
  >([]);

  const [inputContainer, setInputContainer] = useState([{ url: "" }]);

  const addProduct = trpc.product.addProduct.useMutation();

  const addProductHandler = async () => {
    console.log(title, isFeatured);
    addProduct.mutate({
      title: title,
      isFeatured: isFeatured,
      price: price,
      description: description,
      photos: photos,
      category: {
        title: category,
      },
    });
  };

  const setURL = (idx: number) => {
    // modify URL string for upload
    const newUrl = photo
      .replace("file/d/", "uc?export=view&id=")
      .replace("/view", "");

    if (photos.length === 0) {
      setPhotos([
        ...photos,
        { title: title + `${idx + 1}`, url: newUrl, isFeaturePhoto: true },
      ]);
    } else {
      setPhotos([...photos, { title: title + `${idx + 1}`, url: newUrl }]);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <>
      <form
        onSubmit={handleSubmit(addProductHandler)}
        className="mx-8 my-6 flex flex-col justify-center gap-4"
      >
        {/* ===== item Name ===== */}
        <div
          className={`relative rounded-md border ${
            errors.newProduct
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newProduct ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newProduct?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              New Product
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 sm:text-sm"
            placeholder="New Item"
            {...register("newProduct")}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* ===== Item Category ===== */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            className="mt-1 block w-full rounded-md border border-gray-400 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
            defaultValue="Tech"
            {...register("category")}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Tech">Tech</option>
            <option value="Clothing">Clothing</option>
            <option value="Tools">Tools</option>
            <option value="Appliances">Appliances</option>
          </select>
        </div>

        {/* ===== Is Featured Item? ===== */}
        <div className="flex w-full items-center gap-4">
          <p className="text-gray-900">Is Featured?</p>
          <Switch
            checked={isFeatured}
            onChange={setIsFeatured}
            className={`${
              isFeatured ? "bg-emerald-500" : "bg-gray-200"
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                isFeatured ? "translate-x-5" : "translate-x-0"
              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>

        {/* ===== Item Price ===== */}
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
              New Price
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 sm:text-sm"
            placeholder="Enter a price"
            {...register("newPrice")}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* ===== Item Description ===== */}
        <div>
          {errors.newDescription ? (
            <label className="block text-sm font-medium text-red-600">
              {String(errors.newDescription?.message)}
            </label>
          ) : (
            <label className="block text-sm font-medium text-gray-900">
              Description
            </label>
          )}
          <div className="mt-1">
            <textarea
              rows={4}
              draggable={false}
              className={`block w-full rounded-md border ${
                errors.newDescription
                  ? "border-red-300 focus:border-red-600 focus:ring-red-600"
                  : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              } p-1 shadow-sm sm:text-sm`}
              placeholder="Type a description for this product"
              {...register("newDescription")}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* ===== Add New Photos ===== */}
        <div className="flex flex-col gap-2">
          <p>First Photo is always featured</p>
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
                    ? "bg-red-600"
                    : "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
                } p-2 text-white shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2`}
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
              className="inline-flex items-center rounded-full border border-transparent bg-emerald-600 p-2 text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <PlusIconMini className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* ===== Divider ===== */}
          <div className="relative my-4">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-2 text-sm text-gray-500">
                the Sale
              </span>
            </div>
          </div>

          {/* ===== Submit New Items ===== */}
          <div className="flex w-full items-center justify-end">
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Add New Items
            </button>
          </div>
        </div>
      </form>
      {/* <button
        onClick={() => {
          console.log("inputs", inputContainer);
          console.log("photos", photos);
        }}
      >
        test
      </button> */}
    </>
  );
};

export default AdminForm;
