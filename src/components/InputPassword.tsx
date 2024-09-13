import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface IPropsInput {
  title: string;
  placeholder: string;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
}

export const InputPassword = ({
  title,
  placeholder,
  id,
  onChange,
  onBlur,
  value,
}: IPropsInput) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <p className="tw-text-base tw-font-base tw-text-operacao-gray-color-100">
        {title}
      </p>
      <div className="tw-relative">
        <input
          className="tw-h-14 tw-border tw-border-operacao-gray-color-60 tw-rounded-md tw-w-full tw-p-4"
          placeholder={placeholder}
          id={id}
          type={showPassword ? "text" : "password"}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
        <div
          className="tw-absolute tw-top-1/3 tw-right-4 tw-transform tw-cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <HiEyeOff className="tw-text-operacao-gray-color-60" size={20} />
          ) : (
            <HiEye className="tw-text-operacao-gray-color-60" size={20} />
          )}
        </div>
      </div>
    </div>
  );
};
