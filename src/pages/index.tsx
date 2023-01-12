import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Sale</title>
        <meta
          name="description"
          content="A digital garage sale application for the Ricard Family"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-screen bg-gray-50">
        <main className="lg:relative">
          <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
            <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
              <h1 className="font-Jakarta text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl">
                <span className="block xl:inline">Welcome to</span>{" "}
                <span className="block text-blue-600 xl:inline">The Sale</span>
              </h1>
              <h1 className="mt-1 font-Inter text-3xl font-medium italic tracking-tight text-gray-500 sm:text-5xl md:text-5xl lg:text-3xl xl:text-4xl">
                <span className="block xl:inline">Bienvenido a</span>{" "}
                <span className="block text-blue-600 xl:inline">The Sale</span>
              </h1>
              <p className="mx-auto mt-3 max-w-md font-Inter text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo.
              </p>
              <p className="mx-auto mt-1 max-w-md font-Inter text-base italic text-gray-500 sm:text-lg md:mt-2 md:max-w-3xl">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href={"/products"}>
                    <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 font-Inter text-sm font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg">
                      Shop by Category &#x2022; Compra por Categoría
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-64 w-full overflow-hidden sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
            <div className="relative h-[257px] w-full overflow-hidden lg:h-[730px]">
              <Image
                className="object-cover"
                fill
                src="https://drive.google.com/uc?export=view&id=1uLgazCHz9-3vVjVGRHgihY0QPMetjXNI"
                alt="Main Photo"
              />
            </div>

            {/* <div className="absolute bottom-0 left-0 w-2/3 -translate-x-1 skew-x-12 border-r-4 border-r-blue-500 bg-gray-200">
                <h4 className="mx-4 my-1 -skew-x-12 text-sm font-medium tracking-wide text-gray-700">
                  {item.titleEng}
                </h4>
              </div> */}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
