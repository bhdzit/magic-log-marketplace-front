import MagicLogDialog from "@/components/dialog";
import { PublicHeader } from "@/components/header";
import { ProductDialog } from "@/components/product-dialog";
import { MagiclogTableTable } from "@/components/table";
import { ProductSearchInput } from "@/features/public/components/product-serach-input";
import { useAuth } from "@/hooks/use-auth";
import { useDialog } from "@/hooks/use-dialog";
import { DIALOGS_NAME, ROL_ENUM } from "@/utils/enums";
import type { IProduct } from "@/utils/interfaces/product.interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

export function AdminPage() {
  const [data, setData] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<
    IProduct | undefined
  >();
  const { openDialog, isOpen } = useDialog();
  const { userData } = useAuth();
  const [querySearch, setQuerySearch] = useState("");
  const addminHeader =
    userData?.rol === ROL_ENUM.ADMIN
      ? [
          {
            label: "Vendedor",
            key: "user.email",
          },
        ]
      : [];

  const headers = [
    ...addminHeader,
    {
      label: "Nombre",
      key: "name",
    },
    {
      label: "SKU",
      key: "sku",
    },
    {
      label: "Precio",
      key: "price",
    },
    {
      label: "Stock",
      key: "stock",
    },
  ];

  const adminSearch =
    userData?.rol === ROL_ENUM.ADMIN
      ? [
          {
            label: "Vendedor",
            key: "user",
          },
        ]
      : [];
  const searchItems = [
    {
      label: "Nombre",
      key: "name",
    },
    {
      label: "SKU",
      key: "sku",
    },
    ...adminSearch,
  ];

  async function getAllProducts() {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/products?limit=100&${querySearch}&user=${
        userData?.rol === 1 ? "" : userData?.email
      }`
    );
    setData(res.data.data);
  }

  function onSearchClick(data: { [key: string]: string }) {
    let querySearch = "";
    Object.keys(data).forEach((key) => {
      querySearch += `${key}=${data[key]}`;
    });
    setQuerySearch(querySearch);
  }
  useEffect(() => {
    getAllProducts();
  }, [querySearch]);

  useEffect(() => {
    if (!isOpen(DIALOGS_NAME.PRODUCT_DIALOG)) getAllProducts();
  }, [isOpen(DIALOGS_NAME.PRODUCT_DIALOG)]);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <PublicHeader></PublicHeader>
        <MagiclogTableTable
          data={data}
          headers={headers}
          titel="Articulos"
          onAddClick={() => {
            setSelectedProduct(undefined);
            openDialog(DIALOGS_NAME.PRODUCT_DIALOG);
          }}
          onRowClick={(item: IProduct) => {
            setSelectedProduct(item);
            openDialog(DIALOGS_NAME.PRODUCT_DIALOG);
          }}
        >
          <ProductSearchInput
            options={searchItems}
            onSearchClick={onSearchClick}
          ></ProductSearchInput>
        </MagiclogTableTable>
      </div>
      <MagicLogDialog dialogName={DIALOGS_NAME.PRODUCT_DIALOG}>
        <label></label>
        <ProductDialog producto={selectedProduct}></ProductDialog>
      </MagicLogDialog>
    </div>
  );
}
