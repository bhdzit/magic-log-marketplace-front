import { FormField } from "./form/form-field";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";
import { FormPasswordField } from "./form/form-possword-field";
import { useDialog } from "../hooks/use-dialog";
import { DIALOGS_NAME, ERROR } from "@/utils/enums";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

type FormData = {
  email: string;
  password: string;
  confirmarPassword: string;
};

export function SigupDialog() {
  const { closeDialog, openDialog, isOpen } = useDialog();

  async function onSubmit(data: FormData) {
    const { password, confirmarPassword } = data;
    if (password != confirmarPassword)
      methods.setError("confirmarPassword", {
        message: ERROR.PASSWORD_NOT_MATCH,
      });

    await axios
      .post(`${import.meta.env.VITE_API_URL}/users/singup`, data)
      .then(() => {
        closeDialog(DIALOGS_NAME.SINGUP_DIALOG);
        toast("USUARIO CREADO CORRECTAMENTE", { type: "success" });
      })
      .catch((e) => {
        if (e.status === 409) {
          methods.setError("email", {
            message: ERROR.USER_EXIST,
          });
          toast("PARECE QUE ALGO SALIO MAL", { type: "error" });
        }
      });
  }
  const methods: UseFormReturn<FormData> = useForm<FormData>();

  useEffect(() => {
    methods.reset();
  }, [isOpen(DIALOGS_NAME.SINGUP_DIALOG)]);

  return (
    <div className="">
      <div className="">
        <h2 className="text-[#111418] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Crear Cuenta
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              methods.handleSubmit(onSubmit)();
            }}
          >
            <FormField
              name="email"
              placeholder="Email"
              type="email"
            ></FormField>
            <FormPasswordField
              name="password"
              placeholder="password"
            ></FormPasswordField>
            <FormPasswordField
              name="confirmarPassword"
              placeholder="Confirmar contraseña"
            ></FormPasswordField>
            <div className="flex px-4 py-3">
              <button className="flex  cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-[#1978e5] text-white text-base font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Registrarse</span>
              </button>
            </div>
          </form>
        </FormProvider>
        <div
          className="text-[#637488] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline"
          onClick={() => {
            closeDialog(DIALOGS_NAME.SINGUP_DIALOG);
            openDialog(DIALOGS_NAME.LOGIN_DIALOG);
          }}
        >
          ¿Ya tienes Cuenta? Inicia session
        </div>
      </div>
    </div>
  );
}
