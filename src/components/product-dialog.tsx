import { FormField } from "./form/form-field";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";
import { useDialog } from "../hooks/use-dialog";
import { DIALOGS_NAME, ERROR } from "@/utils/enums";
import { useEffect } from "react";
import type { IProduct } from "@/utils/interfaces/product.interfaces";
import axios from "axios";
import { toast } from "react-toastify";

export function ProductDialog({ producto }: { producto?: IProduct }) {
  const { closeDialog, isOpen } = useDialog();

  async function onSubmit(body: IProduct) {
    const requestType = producto ? "put" : "post";

    await axios[requestType]<{ access_token: string }>(
      `${import.meta.env.VITE_API_URL}/products` +
        (producto ? `/${producto._id}` : ""),
      body
    )
      .then(async () => {
        closeDialog(DIALOGS_NAME.PRODUCT_DIALOG);
        toast("SE GUARDO LA INFORMACION CORRECTAMENTE ", { type: "success" });
      })
      .catch(() => {
        toast(ERROR.SOMETHING_WENTH_RONG, { type: "error" });
      });
  }
  const methods: UseFormReturn<IProduct> = useForm<IProduct>({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    methods.reset();
    if (isOpen(DIALOGS_NAME.PRODUCT_DIALOG) && producto) {
      Object.keys(producto).map((item) => {
        const key: keyof IProduct = item as keyof IProduct;
        methods.setValue(key, producto[key]);
      });
    }
  }, [isOpen(DIALOGS_NAME.PRODUCT_DIALOG)]);

  return (
    <div className="">
      <div className="">
        <h2 className="text-[#111418] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          {!producto ? "Agregar Producto" : "Modificar Producto"}
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              methods.handleSubmit(onSubmit)();
            }}
          >
            <FormField
              name="name"
              placeholder="Nombre del producto"
              type="text"
            ></FormField>
            <FormField name="sku" placeholder="SKU"></FormField>
            <FormField
              name="price"
              placeholder="Precio"
              type="number"
            ></FormField>
            <FormField
              name="stock"
              placeholder="Stock disponible"
              type="number"
            ></FormField>
            <FormField
              name="img"
              placeholder="Imagen del prooducto"
            ></FormField>
            <div className="flex px-4 py-3 space-x-5">
              <div
                onClick={() => {
                  closeDialog(DIALOGS_NAME.PRODUCT_DIALOG);
                }}
                className="flex  cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-red-300 text-white text-base font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Cancelar</span>
              </div>
              <button
                type="submit"
                className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-[#1978e5] text-white text-base font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">
                  {producto ? "Actualizar" : "Guardar"}
                </span>
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
