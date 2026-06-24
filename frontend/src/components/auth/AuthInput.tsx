import React, { forwardRef } from "react";

type AuthInputProps = {
  label: string;
  type: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
};

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, type, placeholder, onBlur, name ,onChange}, ref) => {
    return (
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1 transition-colors duration-300"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="
            w-full px-4 py-2 rounded-lg border
            border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
            transition-all duration-300
          "
        />
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
