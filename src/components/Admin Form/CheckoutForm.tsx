import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { trpc } from "../../utils/trpc";
import useCart from "../../hooks/useCart";
import { CartProduct } from "../../helpers/types";
import useEmail from "../../hooks/useEmail";
import { router } from "../../server/trpc/trpc";

const schema = z.object({
  userName: z
    .string()
    .min(1, { message: "Name must be greater than 1 character" }),
  userPhone: z
    .string()
    .min(1, { message: "Category must be greater than 1 character" }),
});

const CheckoutForm = () => {
  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [preferredLang, setPreferredLang] = useState<string>("English");
  const [myTotal, setMyTotal] = useState<number>(0);
  const [myQuantity, setMyQuantity] = useState<number>(0);
  const [myCart, setMyCart] = useState<CartProduct[]>();

  const router = useRouter();

  const { cart, resetCart, total, quantity } = useCart();
  const { email } = useEmail({
    name: userName,
    quantity: myQuantity,
    language: preferredLang,
  });
  const addOrder = trpc.order.addOrder.useMutation({
    onSuccess: (data) => {
      resetCart();
      reset({ userName: "", userPhone: "" });
      setPreferredLang("English");
      email();
      router.push(`/requestconfirmed/${data?.id}`);
    },
  });

  useEffect(() => {
    setMyCart(cart);
    setMyTotal(total);
    setMyQuantity(quantity);
  }, [total, cart, quantity]);

  const checkoutFormHandler = () => {
    const prodIds = myCart!.map((item) => {
      return { prodId: item.prodId };
    });
    addOrder.mutate({
      name: userName,
      phone: userPhone,
      language: preferredLang,
      total: String(myTotal),
      productsIds: prodIds,
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
    <form
      className="mt-6 flex flex-col gap-6"
      onSubmit={handleSubmit(checkoutFormHandler)}
    >
      <div
        className={`relative rounded-md border ${
          errors.userName
            ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
            : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
        }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
      >
        {errors.userName ? (
          <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
            {String(errors.userName?.message)}
          </label>
        ) : (
          <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
            Your Name &#x2022;{" "}
            <span className="font-normal italic">Tu Nombre</span>
          </label>
        )}
        <input
          type="text"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 sm:text-sm"
          placeholder="John Doe"
          {...register("userName")}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div
        className={`relative rounded-md border ${
          errors.userPhone
            ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
            : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
        }  px-3 py-2 shadow-sm  focus-within:ring-1 `}
      >
        {errors.userPhone ? (
          <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-red-600">
            {String(errors.userPhone?.message)}
          </label>
        ) : (
          <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900">
            Your Phone Number &#x2022;{" "}
            <span className="font-normal italic">Su Número de Teléfono</span>
          </label>
        )}
        <input
          type="text"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 sm:text-sm"
          placeholder="507-1234-5678"
          {...register("userPhone")}
          onChange={(e) => setUserPhone(e.target.value)}
        />
      </div>

      <div>
        <div className="mb-2">
          <h4 className="text-lg font-medium">
            Choose your preferred Language
          </h4>
          <p className="italic">Elija su idioma preferido</p>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            <button
              type="button"
              onClick={() => setPreferredLang("English")}
              className={`${
                preferredLang === "English"
                  ? "border-transparent bg-blue-500 text-white hover:bg-blue-600"
                  : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
              } flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setPreferredLang("Español")}
              className={`${
                preferredLang === "Español"
                  ? "border-transparent bg-orange-500 text-white hover:bg-orange-700"
                  : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
              } flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1`}
            >
              Español
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full rounded-md border border-transparent bg-blue-500 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Request Items
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
