import Head from "next/head";
import React from "react";
import CategoryCard from "../../components/Category Card/CategoryCard";
import CategorySkeleton from "../../components/Category Card/CategorySkeleton";

import { trpc } from "../../utils/trpc";

const ProductCategories = () => {
  const categories = trpc.category.allCategories.useQuery();

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
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-12 sm:py-24 lg:max-w-none lg:py-24">
            <h2 className="font-Jakarta text-2xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="font-Inter text-xl font-normal italic text-gray-500">
              Compra por Categoría
            </p>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {categories.isInitialLoading || categories.isLoading
                ? [...Array(6).keys()].map((skeleton) => {
                    return (
                      <div key={skeleton}>
                        <CategorySkeleton />
                      </div>
                    );
                  })
                : null}
              {categories.data?.map((category) => (
                <CategoryCard
                  key={category.id}
                  catId={category.id}
                  titleEng={category.titleEng}
                  titleEsp={category.titleEsp}
                  coverPhoto={category.coverPhoto}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategories;
