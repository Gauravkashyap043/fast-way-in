"use client";
import React, { useContext } from "react";
import { Context } from "../../context/index";

export default function Cart() {
  const { state, dispatch }: any = useContext(Context as any);
  const { cart } = state;
  let total = 0;

  for (const [key, value] of Object.entries(cart)) {
    total = total + cart[key].price * cart[key].qty;
  }

  console.log(cart)
  return (
    <div className="main-container m-auto">
      <div className="flex-1 px-4 py-6">
        <ul role="list" className="my-6 divide-y divide-gray-200">
          {Object.entries(cart).map(([key, value]) => {
            return (
              <li className="flex py-6" key={cart[key].id}>
                <div className="h-24 w-24 flex-shrink-0 rounded-md border border-gray-200">
                  <img
                    src={cart[key].thumbnail}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{cart[key].name}</h3>
                      <p className="ml-4">$ {cart[key].price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {cart[key].description}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {cart[key].qty}</p>

                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-[#008ECC] hover:text-indigo-500"
                        onClick={() => {
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: cart[key],
                          });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-6">
          <div>Total $ {total}</div>
          <a
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-[#008ECC] px-6 py-3 text-base font-medium text-white"
          >
            Checkout
          </a>
        </div>
      </div>
    </div>
  );
}
