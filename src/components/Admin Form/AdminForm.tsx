import { useState } from "react";
import { PlusIcon as PlusIconMini } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { trpc } from "../../utils/trpc";

const schema = z.object({
  newProduct: z
    .string({ required_error: "Product Name is required" })
    .min(1, { message: "Must be greater than 1 character" }),
  newPhoto: z.string().url().startsWith("https://drive.google.com", {
    message: "Must provide a valid URL route",
  }),
});

const AdminForm = () => {
  const [newProductIsFeatured, setNewProductIsFeatured] =
    useState<boolean>(false);
  const [newProductTitle, setNewProductTitle] = useState<string>("");
  const [newProductPhotos, setNewProductPhotos] = useState<{}[]>([
    { title: newProductTitle, url: "" },
  ]);

  const [photoContainer, setPhotoContainer] = useState<string[]>(["New Photo"]);

  const addProduct = trpc.product.addProduct.useMutation();

  const addProductHandler = async () => {
    console.log(newProductTitle, newProductIsFeatured);
    addProduct.mutate({
      title: newProductTitle,
      isFeatured: newProductIsFeatured,
      photos: {
        title: newProductTitle,
        url: "https://drive.google.com/uc?export=view&id=11q9sZsBq4Hdd2COYUk8deM1_UkH8E3Dc",
      },
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <div className="mx-8 my-6 flex flex-col justify-center gap-4">
      <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
        <label
          htmlFor="newProduct"
          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
        >
          New Product
        </label>
        <input
          type="text"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="New Item"
          {...register("newProduct")}
          onChange={(e) => setNewProductTitle(e.target.value)}
        />
      </div>

      <div className="flex w-full items-center gap-4">
        <p className="text-gray-900">Is Featured?</p>
        <Switch
          checked={newProductIsFeatured}
          onChange={setNewProductIsFeatured}
          className={`${
            newProductIsFeatured ? "bg-indigo-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              newProductIsFeatured ? "translate-x-5" : "translate-x-0"
            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="location"
          name="location"
          className="mt-1 block w-full rounded-md border-gray-400 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue="Canada"
        >
          <option>Tech</option>
          <option>Clothing</option>
          <option>Tools</option>
          <option>Appliances</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <p>First Photo is always featured</p>
        {photoContainer.map((photo, i) => (
          <div key={i} className="mb-2">
            <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
                New Photo
              </label>
              <input
                type="text"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder="New Photo"
                {...register("newPhoto")}
                onChange={(e) =>
                  setNewProductPhotos([
                    ...newProductPhotos,
                    { title: newProductTitle, url: e.target.value },
                  ])
                }
              />
            </div>
          </div>
        ))}

        <div className="flex w-full flex-col items-center justify-center gap-4">
          <button
            onClick={() => setPhotoContainer([...photoContainer, "New Photo"])}
            type="button"
            className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusIconMini className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={addProductHandler}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add New Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
