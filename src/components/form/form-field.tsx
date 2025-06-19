import { ERROR } from "@/utils/enums/error.enum";
import { useEffect, type InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function FormField({
  name,
  type = "text",
  placeholder,
  ...props
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    console.log();
  }, []);
  function getErrorMesssege(name: string) {
    if (errors[name]) return errors[name]["message"]?.toString();
    return "";
  }

  return (
    <div className="flex flex-col mb-5">
      <input
        {...register(name, { required: ERROR.REQUIER_MSG })}
        placeholder={placeholder}
        type={type}
        {...props}
        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-14 placeholder:text-[#637488] p-4 text-base font-normal leading-normal"
      />

      <label className="text-red-500 ml-5 mt-1">{getErrorMesssege(name)}</label>
    </div>
  );
}
