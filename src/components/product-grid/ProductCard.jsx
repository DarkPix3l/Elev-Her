import Image from "next/image";
import React from "react";
import StarRating from "@/components/ui/StarRating";
import { AddToCartButton } from "../ui/AddToCartButton";


export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="relative min-w-[15rem] min-h-[15rem] grid grid-rows-[1fr_2fr] items-end">
      <Image
        src="/jordan6-retro_reflections-of-a-champion_silver.png"
        width={300}
        height={500}
        /* sizes="(max-width: 300px) 100vw, (max-width: 150px) 50vw, 33vw" */
        alt="jordan 6 retro reflections of a champion model"
        className="-rotate-33 absolute -top-5 right-4"
      />
      <div className=""></div>
      <div className="bg-white p-4 pt-19 rounded-sm align-bottom grid grid-cols-[2fr_1fr]">
        <div>
        <h3 className="text-lg font-bold">product.name</h3>
        <p className="text-sm text-gray-600 mb-5">product.description</p>
        <StarRating />
        </div>
        <p className="text-black self-center justify-self-end font-bold">$186</p>
        <AddToCartButton
        /*  product={product}
  onAddToCart={handleAddToCart} */
        />
      </div>
    </div>
  );
}
