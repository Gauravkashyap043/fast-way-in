"use client";
import React, { useState } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import upload from "../../../assets/images/upload.png";
import Link from "next/link";
import StarRating from "../starRating/StarRating";

interface ProductCardProps {
  product: ProductPractice;
  onClick?: () => void;
}
const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }: any) => {
  return (
    <div className="product-card-container border border-[#CDD8DF]  relative bg-white rounded cursor-pointer">
      <Link href={`/product/${product.id}`}>
        <div className="product-card-img  m-auto cursor-pointer">
          <img src={product.thumbnail} alt="" className="h-full w-full" />
        </div>
      </Link>

      <div className="w-[94%] m-auto  mt-[10px]">
        <div className="price-cont w-full h-[22px] flex justify-between items-center text-[16px] font-[500]">
          <div className="flex justify-center items-center gap-2">
            <p className="text-[#388E3C]">${product.price}</p>
            <div className="text-gray-600 text-[13px]">
              {product.discountPercentage}%
            </div>
          </div>
          {/* <p className="text-[10px] rating-star">⭐⭐⭐⭐⭐</p> */}
          <div className="bg-green-600 text-white h-[17px]  flex justify-center items-center rounded px-1 text-sm">
              <span className="text-sm">{product.rating}</span>
              <span className="">⭐</span>
            </div>
          
        </div>
        <div className="w-[96%]">
          <p
            className="product-name truncate text-[15px] text-[#3E4042]"
            onClick={() => alert(`${product.id}`)}
          >
            {product.title}
          </p>
        </div>
      </div>
      <div className="favorite-cont flex items-center w-full justify-center m-auto cursor-pointer">
        <button
          className="w-[110px] bg-black text-white rounded py-1"
          onClick={onClick}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
