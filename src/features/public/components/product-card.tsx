import type { IProduct } from "../../../utils/interfaces/product.interfaces";

export function ProductCard({ name, img, price }: IProduct) {
  return (
    <div className="flex h-full flex-1 flex-col gap-1 rounded-xl bg-red shadow-[0_0_4px_rgba(0,0,0,0.1)] ">
      <img
        className="w-full  bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
        src={img}
      />
      <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
        <div>
          <p className="text-[#111418] text-base font-medium leading-normal">
            {name}
          </p>
          <p className="text-[#637488] text-sm font-normal leading-normal">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "USD",
            }).format(price)}
          </p>
        </div>
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="truncate">Agregar</span>
        </button>
      </div>
    </div>
  );
}
