import Image from "next/image";
import Link from "next/link";
import React from "react";

import contact from "../../public/contact_us.svg";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center py-4 px-4 font-Inter sm:py-24 sm:px-6 lg:px-0">
        <Image src={contact} alt="Contact Us Photo" width={275} priority />

        <p className="mt-8 font-semibold">Contact us directly.</p>
        <p className="mt-2 mb-6 italic">Contacta con nosotros directamente.</p>

        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="flex flex-col gap-2">
            <p className="font-Jakarta font-bold">
              Phone &#x2022;{" "}
              <span className="font-normal italic">Teléfono</span>
            </p>
            <p className="italic">+507-6424-8753</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-Jakarta font-bold">
              Email &#x2022;{" "}
              <span className="font-normal italic">Correo electrónico</span>
            </h3>
            <p className="italic">ricardfamilycontact@gmail.com</p>
          </div>
        </div>

        <Link href={"/products"}>
          <button
            type="button"
            className="mt-8 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Keep Shopping &#x2022; Seguir Comprando
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactUs;
