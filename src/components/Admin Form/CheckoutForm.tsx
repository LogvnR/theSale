import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { trpc } from "../../utils/trpc";
import useCart from "../../hooks/useCart";
import type { CartProduct } from "../../helpers/types";
import useEmail from "../../hooks/useEmail";

const schema = z.object({
  userName: z
    .string()
    .min(1, { message: "Name must be greater than 1 character" }),
  userPhone: z
    .string()
    .min(1, { message: "Phone number must be longer than 1 character" }),
});

interface CheckoutFormProps {
  orderIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckoutForm = ({ orderIsLoading }: CheckoutFormProps) => {
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
  const updateProduct = trpc.product.updateProduct.useMutation();
  const addOrder = trpc.order.addOrder.useMutation({
    onSuccess: (data) => {
      updateProduct.mutate({ orderId: data.id, prodStatus: true });
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
    orderIsLoading(addOrder.isLoading);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  if (addOrder.isLoading) orderIsLoading(addOrder.isLoading);

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
        }  px-3 py-2 font-Inter shadow-sm focus-within:ring-1 `}
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
          placeholder="name / nombre"
          {...register("userName")}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div
        className={`relative rounded-md border ${
          errors.userPhone
            ? "border-red-300 focus-within:border-red-600 focus-within:ring-red-600"
            : "border-gray-300 focus-within:border-emerald-600 focus-within:ring-emerald-600"
        }  px-3 py-2 font-Inter shadow-sm focus-within:ring-1 `}
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
          placeholder="xxx-xxxx-xxxx"
          {...register("userPhone")}
          onChange={(e) => setUserPhone(e.target.value)}
        />
      </div>

      <div>
        <div className="mb-2">
          <h4 className="font-Jakarta text-lg font-medium">
            Choose your preferred Language
          </h4>
          <p className="font-Inter italic">Elija su idioma preferido</p>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-3 font-Inter sm:grid-cols-6">
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

      <div className="flex w-full flex-col gap-1 font-medium text-orange-600">
        <div className="flex gap-2">
          <p className="text-lg">&#x2022;</p>
          {preferredLang === "English" ? (
            <p>
              You will be contacted within 72 hours of the request for payment
              options.
            </p>
          ) : (
            <p>
              Será contactado dentro de las 72 horas posteriores a la solicitud
              de pago. opciones
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <p className="text-lg">&#x2022;</p>
          {preferredLang === "English" ? (
            <p>
              If you are outside of the Coronado area, you will need to make
              arrangements for pick-up.
            </p>
          ) : (
            <p>
              Si se encuentra fuera del área de Coronado, deberá hacer arreglos
              para la recogida.
            </p>
          )}
        </div>
      </div>

      <div className="w-full">
        <button
          type="submit"
          className="w-full rounded-md border border-transparent bg-blue-500 py-3 px-4 font-Inter text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Request Items
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
