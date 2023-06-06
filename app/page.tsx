"use client";
import React, { useState, useContext } from "react";
import ProductCard from "@/src/components/ProductCard/ProductCard";
import { TabContent, Tabs } from "@/src/components/HomeTabs/Tabs";
import useSWR from "swr";
import axios from "axios";
import { Context } from "../context/index";
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  onClick: any;
}

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

 export default function HomePage() {
  const { dispatch }: any = useContext(Context as any);
  const [pillActive, setPillActive] = useState<number>(0);
  const [pillCategory, setPillCategory] = useState<string>("");
  const [brandPillActive, setBrandPillActive] = useState<number>(0);
  const [pillBrand, setPillBrand] = useState<string>("");
  const [ratingSortOption, setRatingSortOption] = useState<string>("");
  const [priceSortOption, setPriceSortOption] = useState<string>("");
  const [discountSortOption, setDiscountSortOption] = useState<string>("");

  const { data, error } = useSWR(
    "https://dummyjson.com/products?limit=100",
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

  let categories: any[] = ["All"];
  let brands: any[] = ["All"];

  for (let i = 0; i < data.products.length; i++) {
    let category = data.products[i].category;
    let brand = data.products[i].brand;
    if (!categories.includes(category)) {
      categories.push(category);
    }
    if (!brands.includes(brand)) {
      brands.push(brand);
    }
  }

  for (let i = 0; i < data.products.length; i++) {
    let brand = data.products[i].brand;
    if (!brands.includes(brand)) {
      brands.push(brand);
    }
  }

  console.log(brands);

  const filteredProducts = data.products.filter((product: any) => {
    if (pillActive == 0 || pillCategory === "All") {
      return true;
    } else {
      return product.category === pillCategory;
    }
  });

  const filteredBrandsProducts = data.products.filter((product: any) => {
    if (brandPillActive == 0 || pillBrand === "All") {
      return true;
    } else {
      return product.brand === pillBrand;
    }
  });

  const handleRatingSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRatingSortOption(event.target.value);
  };

  const handlePriceSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPriceSortOption(event.target.value);
  };

  const handleDiscountSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDiscountSortOption(event.target.value);
  };

  const sortProducts = (products: Product[]): Product[] => {
    let sortedProducts = [...products];

    if (ratingSortOption === "highToLow") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (ratingSortOption === "lowToHigh") {
      sortedProducts.sort((a, b) => a.rating - b.rating);
    }

    if (priceSortOption === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (priceSortOption === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    if (discountSortOption === "lowToHigh") {
      sortedProducts.sort(
        (a, b) => a.discountPercentage - b.discountPercentage
      );
    } else if (discountSortOption === "highToLow") {
      sortedProducts.sort(
        (a, b) => b.discountPercentage - a.discountPercentage
      );
    }

    return sortedProducts;
  };

  const sortedProducts = sortProducts(data.products);

  return (
    <div className={` m-auto border main-container`}>
      <Tabs>
        <TabContent label="Explore Our" colorLabel="Collection">
          <div className="border-black">
            <div className="sorted-product flex justify-between items-center">
              <div>
                <select
                  value={priceSortOption}
                  onChange={handlePriceSortChange}
                >
                  <option value="">Sort By Price</option>
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>
              </div>
              <div>
                <select
                  value={ratingSortOption}
                  onChange={handleRatingSortChange}
                >
                  <option value="">Sort By Rating</option>
                  <option value="highToLow">High to Low</option>
                  <option value="lowToHigh">Low to High</option>
                </select>
              </div>

              <div>
                <select
                  value={discountSortOption}
                  onChange={handleDiscountSortChange}
                >
                  <option value="">Sort By Discount</option>
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>
              </div>
            </div>
            <div className="product-card-div">
              {sortedProducts.map((product: Product) => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => {
                      dispatch({ type: "ADD_TO_CART", payload: product });
                    }}
                  />
                );
              })}
            </div>
          </div>
        </TabContent>
        <TabContent label="Shop by" colorLabel="Category">
          <div className="border-black">
            <div className="w-full tab-cont mb-[50px]">
              <div>
                <div className="pill-div min-w-[1578px] overflow-auto h-[48px]  flex text-[16px]  text-[#222222] cursor-pointer">
                  {categories.map((items: any, i: number) => {
                    return (
                      <div
                        className={`pills-btn transition ease-in-out min-w-[180px] h-full rounded-full border flex justify-center items-center mr-2 ${
                          pillActive === i
                            ? "bg-[#008ECC] text-white"
                            : "bg-white text-black"
                        } `}
                        key={i}
                        onClick={() => {
                          setPillActive(i);
                          setPillCategory(items);
                        }}
                      >
                        {items}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="product-card-div">
              {filteredProducts.map((product: Product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          </div>
        </TabContent>
        <TabContent label="Shop By" colorLabel="Brand">
          <div className="border-black">
            <div className="overflow-auto w-full tab-cont mb-[50px]">
              <div>
                <div className="min-w-[1578px] pill-div overflow-auto h-[48px]  flex text-[16px]  text-[#222222] cursor-pointer">
                  {brands.map((items: any, i: number) => {
                    return (
                      <div
                        className={`pills-btn transition ease-in-out min-w-[180px] h-full rounded-full border flex justify-center items-center mr-2 text-center leading-3 ${
                          brandPillActive === i
                            ? "bg-[#008ECC] text-white"
                            : "bg-white text-black"
                        } `}
                        key={i}
                        onClick={() => {
                          setBrandPillActive(i);
                          setPillBrand(items);
                        }}
                      >
                        {items}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="product-card-div">
              {filteredBrandsProducts.map((product: Product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          </div>
        </TabContent>
      </Tabs>
    </div>
  );
};

