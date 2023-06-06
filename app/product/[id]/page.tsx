"use client";
import { Tabs, TabContent } from "@/src/components/Tabs/Tabs";
import React, { useContext, useState } from "react";
import { BiDotsVertical, BiLike, BiDislike } from "react-icons/bi";
import useSWR from "swr";
import axios from "axios";
import { Context } from "../../../context/index";
import {
  BsArrowLeft,
  BsArrowRight,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import headphone1 from "../../../assets/images/headphone1.png";
import headphone2 from "../../../assets/images/headphone2.png";
import headphone3 from "../../../assets/images/headphone3.png";
import headphone4 from "../../../assets/images/headphone4.png";
import Link from "next/link";
const imageData: any = [headphone1, headphone2, headphone3, headphone4];
import { FaHeart } from "react-icons/fa";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
const SingleProduct: React.FC = ({ params }: any) => {
  const { dispatch }: any = useContext(Context as any);
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const handleImageClick = (imageSrc: any, index: number) => {
    setSelectedImage(imageSrc);
    setSelectedIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = selectedIndex - 1;
    if (newIndex >= 0) {
      setSelectedImage(imageData[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  const handleNext = () => {
    const newIndex = selectedIndex + 1;
    if (newIndex < imageData.length) {
      setSelectedImage(imageData[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  const { data, error } = useSWR(
    `https://dummyjson.com/products/${params.id}`,
    fetcher
  );

  if (error) return <p>Loading failed...</p>;
  if (!data)
    return (
      <>
        <div className="flex justify-center items-center w-full h-screen text-center">
          <h3 className="animate-bounce text-center">
            Hold your horses! Our products are getting their fashionably late
            entrance😉...
          </h3>
        </div>
      </>
    );

  console.log(data);

  return (
    <div className="m-auto  main-container">
      <div className="pdp-breadcrumb mt-[11px] flex gap-1 mb-[49px] text-gray-500">
        <Link href={"/"}>
          <p className="hover:text-blue-500 cursor-pointer">Home</p>
        </Link>
        <p>{">"}</p>
        <p>Product Details</p>
      </div>
      <div className="pdp-container w-full flex justify-between mt-3 bg-white py-[2rem] px-[1.2rem] rounded-lg">
        {/* left side */}
        <div className="relative w-[46%] ">
          <div className="pdp-img-cont flex gap-4 sticky top-2">
            <div
              className="small-img-cont w-[94px] h-[425px] overflow-auto pr-1
            "
            >
              {data.images.map((imageSrc: any, i: number) => {
                const isSelected = i === selectedIndex;
                return (
                  <>
                    <div
                      className={`small-img w-full h-[94px] mb-[17px] rounded cursor-pointer ${
                        isSelected ? " border-2 border-blue-500" : ""
                      }`}
                      key={i}
                    >
                      <img
                        src={imageSrc}
                        alt="product img"
                        onClick={() => handleImageClick(imageSrc, i)}
                        className="h-full w-full"
                      />
                    </div>
                  </>
                );
              })}
            </div>
            <div className="carousel-points-div hidden">
              <div className="carousel-points">
                {imageData.map((_: any, i: any) => (
                  <div
                    className={`point ${
                      i === selectedIndex
                        ? "active-point ease-out duration-300"
                        : ""
                    }`}
                    key={i}
                  />
                ))}
              </div>
            </div>
            <div className="pdp-selected-img w-[424px] h-[425px] border rounded-lg relative">
              <div className="pdp-favourite absolute h-[35px] w-[35px] rounded-full right-[15px] top-[11px] cursor-pointer flex justify-center items-center shadow-xl">
                <FaHeart color="red" size={18} className="" />
              </div>
              <div
                className="pdp-prev w-[30px] h-[28px] justify-center items-center rounded-r-lg border bg-[#00000025] hidden"
                onClick={handlePrevious}
              >
                <div className="w-full h-full flex justify-center items-center">
                  <BsArrowLeft color="white" className="font-bold" />
                </div>
              </div>
              <div
                className="pdp-next w-[30px] h-[28px] justify-center items-center rounded-l-lg border bg-[#00000025] hidden"
                onClick={handleNext}
              >
                <div className="w-full h-full flex justify-center items-center">
                  <BsArrowRight color="white" className="font-bold" />
                </div>
              </div>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="main product img"
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="w-[53%] px-2">
          <div className="pdp-mobile-favourite hidden w-full">
            <div className="flex justify-end items-center gap-2 w-full mb-1 mt-[-1%]">
              <FaHeart color="red" size={15} className="" />
              <p className="text-[#456EFF]">Favorite</p>
            </div>
          </div>
          <p className="pdp-product-name font-[700] text-[22px]">
            {data.title}
          </p>
          <p className="pdp-product-name font-[700] text-[20px]">
            {data.description}
          </p>
          <p className="pdp-special-price mt-[26px] md:mt-[5px] text-green-600 font-[500] text-[14px]">
            Special price
          </p>
          <div className="flex gap-3 items-center">
            <p className="pdp-price font-[500] text-[28px]">$ {data.price}</p>
            <p className="text-[16px] text-[#878787]">
              <span className="line-through">
                {" "}
                $
                {Math.round(
                  data.price + (data.price * data.discountPercentage) / 100
                )}
              </span>{" "}
              <span className="font-bold text-green-600 ml-1">
                {data.discountPercentage}% off
              </span>
            </p>
          </div>
          <div className="flex text-[10px] items-center gap-1 mt-[10px]">
            <div className="bg-green-600 text-white w-[34px] h-[17px]  flex justify-center items-center rounded px-2">
              <span>{data.rating}</span>
              <span>⭐</span>
            </div>
            <p>Reating</p>
          </div>
          <div className="flex gap-2 items-center my-2">
            <h4 className="">Available Stock :</h4>
            <p
              className={`${
                data.stock < 50 ? "text-red-500" : "text-green-500"
              } `}
            >
              {data.stock}
            </p>
          </div>
          {data.stock < 50 && (
            <p className="text-red-400 animate-pulse">
              hurry! only a few items left
            </p>
          )}

          <div className="mt-2">
            <button
              className="border w-[120px] bg-black py-1 rounded text-white"
              onClick={() => {
                dispatch({ type: "ADD_TO_CART", payload: data });
              }}
            >
              Add To Cart{" "}
            </button>
          </div>

          <div>
            <Tabs>
              <TabContent label="Product Details">
                <div className="w-full mt-1 p-2 ">
                  <p className="text-[13px] font-bold mb-6">About this item</p>
                  <ul className="pdp-product-details list-disc ml-5 border-transparent">
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Repudiandae eveniet quaerat placeat aperiam aliquid
                      consequatur reiciendis ratione, numquam non exercitationem
                      perferendis nisi, atque quae maxime quam quo earum rem
                      nesciunt?
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Repudiandae eveniet quaerat placeat aperiam aliquid
                      consequatur reiciendis ratione, numquam non exercitationem
                      perferendis nisi, atque quae maxime quam quo earum rem
                      nesciunt?
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Repudiandae eveniet quaerat placeat aperiam aliquid
                      consequatur reiciendis ratione, numquam non exercitationem
                      perferendis nisi, atque quae maxime quam quo earum rem
                      nesciunt?
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Repudiandae eveniet quaerat placeat aperiam aliquid
                      consequatur reiciendis ratione, numquam non exercitationem
                      perferendis nisi, atque quae maxime quam quo earum rem
                      nesciunt?
                    </li>
                  </ul>
                </div>
              </TabContent>
              <TabContent label="Specification">
                <div className="w-[95%] mt-1 py-2">
                  <div className="flex items-center text-[13px] mt-3 gap-10">
                    <div className="w-[150px] font-bold">
                      <p>Brand</p>
                    </div>
                    <div>
                      <p>{data.brand}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-[13px] mt-3 gap-10">
                    <div className="w-[150px] font-bold">
                      <p>Model name</p>
                    </div>
                    <div>
                      <p>G432</p>
                    </div>
                  </div>
                  <div className="flex items-center text-[13px] mt-3 gap-10">
                    <div className="w-[150px] font-bold">
                      <p>Color</p>
                    </div>
                    <div>
                      <p>Pale Blue</p>
                    </div>
                  </div>
                  <div className="flex items-center text-[13px] mt-3 gap-10">
                    <div className="w-[150px] font-bold">
                      <p>Headphone from factor</p>
                    </div>
                    <div>
                      <p>Over Ear</p>
                    </div>
                  </div>
                  <div className="flex items-center text-[13px] mt-3 gap-10">
                    <div className="w-[150px] font-bold">
                      <p>Connector Type</p>
                    </div>
                    <div>
                      <p>wireless</p>
                    </div>
                  </div>
                </div>
              </TabContent>
              <TabContent label="Reviews">
                <div className="w-[95%] mt-1 py-2 mb-2">
                  <div>
                    <div className="bg-green-600 text-white w-[34px] h-[17px]  flex justify-center items-center rounded text-[12px] font-[500] p-1">
                      <span>5</span>
                      <span>⭐</span>
                    </div>
                    <p className="mt-[10px] text-[13px] font-bold">
                      More than perfect
                    </p>
                    <div className="mt-[10px]">
                      <div className="flex gap-3 text-[12px] text-gray-500">
                        <span>John Jackson</span>
                        <span>7 Month ago</span>
                      </div>
                      <div className="flex justify-between text-[12px] text-gray-500">
                        <div className="flex items-center gap-1">
                          <BsFillCheckCircleFill />
                          Certified Buyer
                        </div>
                        <div className="flex gap-3 items-center">
                          <span className="flex items-center gap-1">
                            <BiLike />
                            29
                          </span>
                          <span className="flex items-center gap-1">
                            <BiDislike />2
                          </span>
                          <BiDotsVertical className="cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[95%] mt-1 py-2 mb-2">
                  <div>
                    <div className="bg-green-600 text-white w-[34px] h-[17px]  flex justify-center items-center rounded text-[12px] font-[500] p-1">
                      <span>5</span>
                      <span>⭐</span>
                    </div>
                    <p className="mt-[10px] text-[13px] font-bold">
                      More than perfect
                    </p>
                    <div className="mt-[10px]">
                      <div className="flex gap-3 text-[12px] text-gray-500">
                        <span>John Jackson</span>
                        <span>7 Month ago</span>
                      </div>
                      <div className="flex justify-between text-[12px] text-gray-500">
                        <div className="flex items-center gap-1">
                          <BsFillCheckCircleFill />
                          Certified Buyer
                        </div>
                        <div className="flex gap-3 items-center">
                          <span className="flex items-center gap-1">
                            <BiLike />
                            29
                          </span>
                          <span className="flex items-center gap-1">
                            <BiDislike />2
                          </span>
                          <BiDotsVertical className="cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabContent>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="w-full h-[500px] border mt-5 flex justify-center items-center">
        <h3>Product Recommendation section</h3>
      </div>
    </div>
  );
};

export default SingleProduct;
