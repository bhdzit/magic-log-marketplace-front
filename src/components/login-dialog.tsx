import { FormField } from "./form/form-field";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";
import { FormPasswordField } from "./form/form-possword-field";
import { useDialog } from "../hooks/use-dialog";
import { DIALOGS_NAME, ERROR } from "@/utils/enums";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import * as jose from "jose";
import { useAuth } from "@/hooks/use-auth";
type FormData = {
  email: string;
  password: string;
};

export function LoginDialog() {
  const { closeDialog, isOpen } = useDialog();
  const { setUserData } = useAuth();

  async function onSubmit(body: FormData) {
    await axios
      .post<{ access_token: string }>(
        `${import.meta.env.VITE_API_URL}/users/login`,
        body
      )
      .then(async ({ data }) => {
        const { payload } = await jose.jwtVerify(
          data.access_token,
          new TextEncoder().encode(import.meta.env.VITE_SECRET)
        );
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userData", JSON.stringify({ ...payload }));
        setUserData(payload as { email: string });
        closeDialog(DIALOGS_NAME.LOGIN_DIALOG);
        toast("SE INICIO SESSION CORRECTAMENTE", { type: "success" });
      })
      .catch(() => {
        methods.setError("password", {
          message: ERROR.INCORRECT_LOGIN_PARAMS,
        });
        toast(ERROR.SOMETHING_WENTH_RONG, { type: "error" });
      });
  }
  const methods: UseFormReturn<FormData> = useForm<FormData>();

  useEffect(() => {
    methods.reset();
  }, [isOpen(DIALOGS_NAME.LOGIN_DIALOG)]);

  return (
    <div>
      <h2 className="text-[#111418] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
        Iniciar Session
      </h2>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            methods.handleSubmit(onSubmit)();
          }}
        >
          <FormField name="email" placeholder="Email" type="email"></FormField>
          <FormPasswordField
            name="password"
            placeholder="password"
          ></FormPasswordField>
          <div className="flex px-4 py-3">
            <button className="flex  cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-[#1978e5] text-white text-base font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Iniciar sesion</span>
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
