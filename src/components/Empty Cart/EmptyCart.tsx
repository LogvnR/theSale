import Image from "next/image";
import emptyCart from "../../../public/empty_cart.svg";
import Link from "next/link";
import Head from "next/head";

const EmptyCart = () => {
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
      <div className="mt-8 min-h-screen bg-white">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center py-4 px-4 font-Inter sm:py-24 sm:px-6 lg:px-0">
          <Image src={emptyCart} alt="Empty Cart Photo" width={275} />

          <p className="mt-4">Sorry your cart is empty</p>
          <p className="mt-2 mb-6">Lo sentimos, su carrito está vacío.</p>

          <Link href={"/products"}>
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Keep Shopping &#x2022; Seguir Comprando
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default EmptyCart;
