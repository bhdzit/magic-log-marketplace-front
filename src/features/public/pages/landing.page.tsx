import { useEffect, useState } from "react";
import { PublicHeader } from "../../../components/header";
import { ProductSearchInput } from "../components/product-serach-input";
import { ProductCard } from "../components/product-card";
import axios from "axios";
import type { IProduct } from "../../../utils/interfaces/product.interfaces";

export function LandingPage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const searchItems = [
    {
      label: "Nombre",
      key: "name",
    },
    {
      label: "SKU",
      key: "sku",
    },
  ];

  async function getFeaturesProducts() {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/products?limit=10`
    );
    setFeaturedProducts(res.data.data);
  }

  async function getAllProducts(filter = "") {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/products?limit=100&${filter}`
    );
    setAllProducts(res.data.data);
  }

  function onSearchClick(data: { [key: string]: string }) {
    let querySearch = "";
    Object.keys(data).forEach((key) => {
      querySearch += `${key}=${data[key]}`;
    });
    getAllProducts(querySearch);
  }

  useEffect(() => {
    getFeaturesProducts();
    getAllProducts();
  }, []);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <PublicHeader></PublicHeader>
        <div className="md:px-40 md:flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <ProductSearchInput
              options={searchItems}
              onSearchClick={onSearchClick}
            ></ProductSearchInput>
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Productos de Interes
            </h2>
            <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
              <div className="flex items-stretch p-4 gap-3">
                {featuredProducts.map((item: IProduct) => (
                  <ProductCard key={item._id} {...item}></ProductCard>
                ))}
              </div>
            </div>
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Todos los productos
            </h2>
            <div className="grid max-w-[100vw] grid-cols-1 md:grid-cols-3 gap-3 p-4">
              {allProducts.map((item: IProduct) => (
                <ProductCard key={item._id} {...item}></ProductCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
