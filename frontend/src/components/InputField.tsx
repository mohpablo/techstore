import type { LucideIcon } from "lucide-react";
import React, { forwardRef } from "react";

type InputFieldProps = {
  label: string;
  icon: LucideIcon;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon: Icon, name, ...props }, ref) => {

    const inputId = name;

    return (
      <div className="relative">
        <label
          htmlFor={inputId} 
          className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1 block"
        >
          {label}
        </label>

        <Icon
          size={18}
          className="absolute left-3.5 top-9 text-zinc-400 pointer-events-none"
        />

        <input
          ref={ref}
          id={inputId} 
          name={name} 
          className="w-full pl-10 pr-4 py-2.5 text-[14px] rounded-xl border outline-none transition-all duration-200
            border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400
            focus:border-black focus:ring-4 focus:ring-black/5
            dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500
            dark:focus:border-white dark:focus:ring-white/5"
          {...props} 
        />
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
