import React from "react";

interface IPropsInput {
  title: string;
  placeholder: string;
  type: string;
  id: string ;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
}

export const Input = ({
  title,
  placeholder,
  type,
  id,
  onChange,
  onBlur,
  value,
}: IPropsInput) => {
  return (
    <div>
      <p className="tw-text-base tw-font-base tw-text-operacao-gray-color-100">
        {title}
      </p>
      <input
        id={id}
        className="tw-h-14 tw-border tw-border-operacao-gray-color-60 tw-rounded-md tw-w-full tw-p-4"
        placeholder={placeholder}
        type={type}
        name=""
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </div>
  );
};
