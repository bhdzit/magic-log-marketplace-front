import { FormField } from "./form/form-field";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";
import { FormPasswordField } from "./form/form-possword-field";
import { useDialog } from "../hooks/use-dialog";
import { DIALOGS_NAME } from "@/utils/enums";
type FormData = {
  email: string;
  password: string;
};

export function LoginDialog() {
  const { closeDialog } = useDialog();

  function onSubmit(data: FormData) {
    console.log(data);
    closeDialog(DIALOGS_NAME.LOGIN_DIALOG);
  }
  const methods: UseFormReturn<FormData> = useForm<FormData>();

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
