import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut, useSession } from "next-auth/react";
import * as z from "zod";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

const schema = z.object({
  password: z.string().min(1, { message: "Too Short" }),
});

const Footer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const { data: sessionData } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(schema) });

  const passwordHandler = handleSubmit((data) => {
    if (data.password === "Apples") {
      setIsValid(true);
      reset({ password: "" });
      setIsOpen(false);
    }
  });

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Contact
          </button>
        </div>
        <div className="mt-8 flex items-center gap-4 md:order-1 md:mt-0">
          <button onClick={() => setIsOpen(!isOpen)}>
            <p className="text-center text-base text-gray-400">
              &copy; 2023 The Sale
            </p>
          </button>

          {isOpen ? (
            <form className="flex gap-2" onSubmit={passwordHandler}>
              <label className="sr-only">Email</label>
              <input
                type="password"
                {...register("password")}
                className="block w-full rounded-md border-gray-300 p-1 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                placeholder="password"
              />
              <button
                type="submit"
                className="inline-flex items-center rounded-full border border-transparent bg-emerald-100 p-1 text-green-500 shadow-sm hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </form>
          ) : null}

          {isValid || sessionData ? (
            <button
              type="button"
              onClick={sessionData ? () => signOut() : () => signIn()}
              className="inline-flex items-center rounded border border-transparent bg-emerald-100 px-2.5 py-1.5 text-xs font-medium text-green-500 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Admin SignIn
            </button>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
