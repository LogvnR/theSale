import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { trpc } from "../../utils/trpc";

const schema = z.object({
  newCategoryEng: z
    .string()
    .min(1, { message: "Category must be greater than 1 character" }),
  newCategoryEsp: z
    .string()
    .min(1, { message: "Category must be greater than 1 character" }),
  coverPhoto: z.string().min(1, { message: "Cover Photo is Required" }),
});

const CategoryForm = () => {
  const [categoryEng, setCategoryEng] = useState<string>("");
  const [categoryEsp, setCategoryEsp] = useState<string>("");
  const [coverPhoto, setCoverPhoto] = useState<string>("");

  const utils = trpc.useContext();

  const categories = trpc.category.allCategories.useQuery().data;
  const addProduct = trpc.category.addCategory.useMutation({
    onSuccess: () => {
      utils.category.allCategories.invalidate();
    },
  });

  const addCategoryHandler = () => {
    const newCoverPhoto = coverPhoto
      .replace("file/d/", "uc?export=view&id=")
      .replace("/view", "");

    //

    addProduct.mutate({
      categoryEng: categoryEng,
      categoryEsp: categoryEsp,
      coverPhoto: newCoverPhoto,
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
  }, [formState, reset]);

  return (
    <div className="mx-8 mt-2 mb-6 flex flex-col">
      <p className="italic">Current Categories:</p>
      <div className="mt-2 flex gap-2">
        {categories?.map((category) => (
          <p key={category.id}>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              {category.titleEng}
            </span>
          </p>
        ))}
      </div>

      <form
        className="mt-6 flex flex-col gap-6"
        onSubmit={handleSubmit(addCategoryHandler)}
      >
        <div
          className={`relative rounded-md border ${
            errors.newCategoryEng
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newCategoryEng ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newCategoryEng?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              New Category Eng
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 sm:text-sm"
            placeholder="New Category"
            {...register("newCategoryEng")}
            onChange={(e) => setCategoryEng(e.target.value)}
          />
        </div>
        <div
          className={`relative rounded-md border ${
            errors.newCategoryEsp
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.newCategoryEsp ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.newCategoryEsp?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              New Category Esp
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 sm:text-sm"
            placeholder="Nueva Categoría"
            {...register("newCategoryEsp")}
            onChange={(e) => setCategoryEsp(e.target.value)}
          />
        </div>
        <div
          className={`relative rounded-md border ${
            errors.coverPhoto
              ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
              : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
          }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
        >
          {errors.coverPhoto ? (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
              {String(errors.coverPhoto?.message)}
            </label>
          ) : (
            <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Cover Photo
            </label>
          )}
          <input
            type="text"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 sm:text-sm"
            placeholder="Cover Photo URL"
            {...register("coverPhoto")}
            onChange={(e) => setCoverPhoto(e.target.value)}
          />
        </div>
        <div className="flex w-full items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Add New Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
