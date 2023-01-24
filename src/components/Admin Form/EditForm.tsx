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
  newProductEng: z
    .string()
    .min(1, { message: "Name must be greater than 1 character" }),
  newProductEsp: z
    .string()
    .min(1, { message: "Name must be greater than 1 character" }),
  newPrice: z.coerce
    .number()
    .nonnegative({ message: " Price cannot be negative" }),
  newDescriptionEng: z
    .string()
    .min(1, { message: "Description must be greater than 1 character" }),
  newDescriptionEsp: z
    .string()
    .min(1, { message: "Description must be greater than 1 character" }),
});

interface EditFormProps {
  productId: string;
}

const EditForm = ({ productId }: EditFormProps) => {
  const mainProduct = trpc.product.oneProduct.useQuery({
    productId: productId,
  }).data;
  const mainCategory = trpc.category.oneCategory.useQuery({
    categoryId: String(mainProduct?.categoryId),
  }).data;

  const [isFeatured, setIsFeatured] = useState<boolean>(
    Boolean(mainProduct?.isFeatured)
  );
  const [isObo, setIsObo] = useState<boolean>(Boolean(mainProduct?.isObo));
  const [titleEng, setTitleEng] = useState<string>(
    String(mainProduct?.titleEng)
  );
  const [titleEsp, setTitleEsp] = useState<string>(
    String(mainProduct?.titleEsp)
  );
  const [category, setCategory] = useState<string>(
    String(mainCategory?.titleEng)
  );
  const [price, setPrice] = useState<string>(String(mainProduct?.price));
  const [descriptionEng, setDescriptionEng] = useState<string>(
    String(mainProduct?.descriptionEng)
  );
  const [descriptionEsp, setDescriptionEsp] = useState<string>(
    String(mainProduct?.descriptionEsp)
  );
  const [photo, setPhoto] = useState<string>("");
  const [photos, setPhotos] = useState<
    { isFeaturePhoto?: boolean | undefined; title: string; url: string }[]
  >([]);

  const [inputContainer, setInputContainer] = useState([{ url: "" }]);

  const categories = trpc.category.allCategories.useQuery().data;

  const addProduct = trpc.product.addProduct.useMutation({
    onSuccess: () => {
      reset({
        newProductEng: "",
        newProductEsp: "",
        newPrice: "",
        newDescriptionEng: "",
        newDescriptionEsp: "",
      });
      setIsFeatured(false);
      setCategory("Tech");
      setInputContainer([{ url: "" }]);
      setPhoto("");
      setPhotos([]);
    },
  });

  const addProductHandler = async () => {
    addProduct.mutate({
      titleEng: titleEng,
      titleEsp: titleEsp,
      isFeatured: isFeatured,
      isObo: isObo,
      price: price,
      descriptionEng: descriptionEng,
      descriptionEsp: descriptionEsp,
      photos: photos,
      categoryId: category,
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
        { title: titleEng + `${idx + 1}`, url: newUrl, isFeaturePhoto: true },
      ]);
    } else {
      setPhotos([...photos, { title: titleEng + `${idx + 1}`, url: newUrl }]);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  console.log(mainProduct);

  return (
    <>
      <form
        onSubmit={handleSubmit(addProductHandler)}
        className="mx-8 my-6 flex flex-col justify-center gap-4 font-Inter"
      >
        {/* ===== Item Names ===== */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div
            className={`relative rounded-md border ${
              errors.newProductEng
                ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
                : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
            }  w-full px-3 py-2 shadow-sm focus-within:ring-1 `}
          >
            {errors.newProduct ? (
              <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
                {String(errors.newProductEng?.message)}
              </label>
            ) : (
              <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
                New Title Eng
              </label>
            )}
            <input
              type="text"
              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 sm:text-sm"
              placeholder="New Item"
              value={titleEng}
              {...register("newProductEng")}
              onChange={(e) => setTitleEng(e.target.value)}
            />
          </div>

          <div
            className={`relative rounded-md border ${
              errors.newProductEsp
                ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
                : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
            }  w-full px-3 py-2 shadow-sm  focus-within:ring-1 `}
          >
            {errors.newProduct ? (
              <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
                {String(errors.newProductEsp?.message)}
              </label>
            ) : (
              <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
                New Title Esp
              </label>
            )}
            <input
              type="text"
              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 sm:text-sm"
              placeholder="New Item in Spanish"
              value={titleEsp}
              {...register("newProductEsp")}
              onChange={(e) => setTitleEsp(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col items-end gap-4 md:flex-row">
          {/* ===== Item Category ===== */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Category{" "}
              <span className="font-normal italic text-gray-400">
                Current: {category}
              </span>
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
              defaultValue={category}
              {...register("category")}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.titleEng}
                </option>
              ))}
            </select>
          </div>
          {/* ===== Item Price ===== */}
          <div
            className={`relative rounded-md border ${
              errors.newPrice
                ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
                : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
            }  w-full px-3 py-2 shadow-sm  focus-within:ring-1 `}
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
              value={price}
              {...register("newPrice")}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        {/* ===== Is Featured Item | Is OBO Item ===== */}
        <div className="block md:flex">
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
          <div className="flex w-full items-center gap-4">
            <p className="text-gray-900">Is OBO?</p>
            <Switch
              checked={isObo}
              onChange={setIsObo}
              className={`${
                isObo ? "bg-emerald-500" : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${
                  isObo ? "translate-x-5" : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </div>

        {/* ===== Item Description ===== */}
        <div>
          {errors.newDescriptionEng ? (
            <label className="block text-sm font-medium text-red-600">
              {String(errors.newDescriptionEng?.message)}
            </label>
          ) : (
            <label className="block text-sm font-medium text-gray-900">
              Description Eng
            </label>
          )}
          <div className="mt-1">
            <textarea
              rows={4}
              draggable={false}
              className={`block w-full rounded-md border ${
                errors.newDescriptionEng
                  ? "border-red-300 focus:border-red-600 focus:ring-red-600"
                  : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              } p-1 shadow-sm sm:text-sm`}
              placeholder="Type a description for this product"
              value={descriptionEng}
              {...register("newDescriptionEng")}
              onChange={(e) => setDescriptionEng(e.target.value)}
            />
          </div>
        </div>

        <div>
          {errors.newDescription ? (
            <label className="block text-sm font-medium text-red-600">
              {String(errors.newDescriptionEsp?.message)}
            </label>
          ) : (
            <label className="block text-sm font-medium text-gray-900">
              Description Esp
            </label>
          )}
          <div className="mt-1">
            <textarea
              rows={4}
              draggable={false}
              className={`block w-full rounded-md border ${
                errors.newDescriptionEsp
                  ? "border-red-300 focus:border-red-600 focus:ring-red-600"
                  : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              } p-1 shadow-sm sm:text-sm`}
              placeholder="Type a description for this product in Spanish"
              value={descriptionEsp}
              {...register("newDescriptionEsp")}
              onChange={(e) => setDescriptionEsp(e.target.value)}
            />
          </div>
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

          {/* ===== Submit New Items ===== */}
          <div className="mt-4 flex w-full items-center justify-end">
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-green-500 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Add New Items
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditForm;
