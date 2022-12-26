import { useState } from "react";
import { PlusIcon as PlusIconMini } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import { useSession } from "next-auth/react";

const AdminPage = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [photoContainer, setPhotoContainer] = useState<string[]>(["New Photo"]);
  const { data: sessionData } = useSession();

  if (!sessionData)
    return (
      <p className="my-4 text-center">
        Sorry, you do not have access to this page
      </p>
    );

  return (
    <div className="flex w-full flex-col">
      <h2>This is the Admin Page</h2>
      <div className="mx-8 my-6 flex flex-col justify-center gap-4">
        <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="New Item"
          />
        </div>
        {/* Category */}
        <div className="flex w-full items-center gap-4">
          <p className="text-gray-900">Is Featured?</p>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-indigo-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                enabled ? "translate-x-5" : "translate-x-0"
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
            <div
              key={i}
              className="relative mb-4 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600"
            >
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Photo
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder="New Photo"
              />
            </div>
          ))}
          <div className="flex w-full items-center justify-center">
            <button
              onClick={() =>
                setPhotoContainer([...photoContainer, "New Photo"])
              }
              type="button"
              className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIconMini className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
