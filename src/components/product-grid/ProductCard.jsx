import Image from "next/image";
import React from "react";
import StarRating from "@/components/ui/StarRating";
import { AddToCartButton } from "../ui/AddToCartButton";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="relative min-w-[15rem] min-h-[15rem] grid grid-rows-[1.5fr_2fr]">
      <Image
        src={product.mainImage}
        width={200}
        height={300}
        /* sizes="(max-width: 300px) 100vw, (max-width: 150px) 50vw, 33vw" */
        alt={product.title}
        className="absolute left-1/2 -translate-x-1/2 -top-10 origin-bottom-center -rotate-33"
      />
      <div className=""></div>
      <div className="bg-white h-[12rem] p-6 rounded-sm align-bottom grid grid-cols-[2fr_0.5fr]">
        <div className="content-end ">
          <h3 className="text-lg font-bold">{product.title}</h3>
          <p className="text-sm text-gray-600 mb-5">{product.summary}</p>

          <StarRating averageRating={product.averageRating} />
        </div>
        <p className="text-black self-center justify-self-end font-bold">
          {product.price} €
        </p>
        <AddToCartButton
        /*  product={product}
  onAddToCart={handleAddToCart} */
        />
      </div>
    </div>
  );
}
