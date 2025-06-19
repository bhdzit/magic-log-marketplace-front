import { useEffect, useState, type InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { ERROR } from "@/utils/enums/error.enum";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function FormPasswordField({ name, placeholder, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
      <div className="relative">
        <input
          {...register(name, { required: ERROR.REQUIER_MSG })}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          {...props}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-14 placeholder:text-[#637488] p-4 text-base font-normal leading-normal"
        />
        <div
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? (
            <EyeOff className="cursor-pointer absolute top-5  right-2 " />
          ) : (
            <Eye className="cursor-pointer absolute top-5 right-2 " />
          )}
        </div>
      </div>
      <label className="text-red-500 ml-5 mt-1">{getErrorMesssege(name)}</label>
    </div>
  );
}
