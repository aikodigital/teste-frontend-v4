import React from "react";

interface IPropsButton {
  title: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
}

export const Button = ({ title, type, disabled }: IPropsButton) => {
  return (
    <button
      type={type}
      className="tw-h-14 tw-w-full tw-flex tw-justify-center tw-items-center tw-bg-operacao-brand-color-green tw-rounded-md"
      disabled={disabled}
    >
      <p className="tw-text-white tw-text-base tw-font-medium">{title}</p>
    </button>
  );
};
