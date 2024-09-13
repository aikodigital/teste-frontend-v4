import React from "react";

interface IPropsButtonMenu {
  title: string;
  onClick: () => void; // Certifique-se de que a função não retorna 'void'
  icon: any;
}

export const ButtonMenu = ({ title, onClick, icon }: IPropsButtonMenu) => {
  const handleClick = () => {
    onClick(); 
  };

  return (
    <div onClick={handleClick} className="tw-flex tw-px-2 tw-cursor-pointer">
      <img src={icon} alt="Button Icon" />
      <div className="tw-ml-3">
        <p className="tw-font-normal tw-font-inter tw-text-operacao-gray-color-80">{title}</p>
      </div>
    </div>
  );
};
