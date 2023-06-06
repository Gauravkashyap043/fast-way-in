// import Link from "next/link";
"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import { FaHeart, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import logo from "../../../assets/images/logo.png";
import { FcGoogle } from "react-icons/fc";
import { Context } from "../../../context/index";

const Navbar: React.FC = (): JSX.Element => {
  const [showLogin, setShowLogin] = useState(false);
  const { state }: any = useContext(Context as any);
  console.log("--->", state);

  const { cart } = state;
  let itemCount = 0;

  for (const [key, value] of Object.entries(cart)) {
    itemCount = itemCount + cart[key].qty;
  }

  return (
    <nav className="w-full  m-auto bg-white">
      <div className="navbar w-[90%] h-[120px] m-auto flex justify-between items-center bg-white main-container">
        <div className="logo_div w-[130px]">
          <Link href={"/"}>
            <img
              src="https://thefastway.in/wp-content/uploads/2020/07/logo-dark.png"
              alt="logo"
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div className="search_div w-[600px] h-[40px] border border-[#008ECC] flex rounded">
          <input
            type="search"
            className="input_search flex-1 outline-none h-full px-2 bg-transparent"
            placeholder="What do you want?"
          />
          <button className="search_btn w-[100px] h-full  text-white border border-[#008ECC] bg-[#008ECC]">
            Search
          </button>
        </div>
        <div className="nav-icon flex items-center gap-3 ">
          <div className="cursor-pointer">
            <Link href={"/cart"}>
              <div className="flex justify-center text-[#8B96A5]">
                <div className="">({itemCount})</div>
                <div className="flex items-center">
                  <FaShoppingCart
                    color="#8B96A5"
                    size={19}
                    className="cursor-pointer m-auto"
                  />
                </div>
              </div>
              <p className="icon_text text-[12px] text-[#8B96A5] mt-1 font-[400]">
                Add to Cart
              </p>
            </Link>
          </div>
          <div
            className="relative rounded-full flex justify-center items-center"
            onClick={() => setShowLogin(!showLogin)}
          >
            <div className="cursor-pointer">
              <FaUserAlt
                color="#8B96A5"
                size={18}
                className="cursor-pointer m-auto"
              />
              <p className="icon_text text-[12px] text-[#8B96A5] mt-1 font-[400]">
                Profile
              </p>
            </div>
            {showLogin && (
              <div className="absolute border w-[221px] h-[114px] top-10 right-0 flex justify-center items-center bg-white rounded-lg">
                <button className="px-2 gap-1 h-[30px] border rounded-full text-sm flex justify-center items-center">
                  <FcGoogle size={20} />
                  Login with Google
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
