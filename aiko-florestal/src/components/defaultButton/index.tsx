import clsx from 'clsx';
import React from 'react';

const TYPE = {
   primary: 'bg-green-300 text-white',
   secondary: 'rounded-md border bg-white text-gray-700 shadow-sm ',
   error: 'hover:bg-error-soft bg-error-main text-white focus:ring-error-soft',
   warning: 'hover:bg-warn-soft bg-warn-main text-white focus:ring-warn-soft',
   success: 'hover:bg-success-soft bg-success-main text-white focus:ring-success-soft',
};

type ButtonProps = {
   onClick?: () => void;
   title?: string;
   content?: React.ReactNode;
   variant?: keyof typeof TYPE;
   loading?: boolean;
   className?: string;
   disabled?: boolean;
   type?: 'button' | 'submit' | 'reset';
}
export default function Button({
   title,
   variant = 'primary',
   content,
   onClick,
   loading,
   className,
   disabled,
   type = 'button',
   ...p
}: ButtonProps) {
   
   return (
      <button
         type={type}
         onClick={onClick}
         className={clsx(
            'flex rounded-md border py-2 px-8 gap-1 text-base font-normal truncate justify-center items-center outline-none focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-green-100 hover:transition-transform duration-700 transform hover:scale-105 hover:shadow-md',
            TYPE[variant],
            className,
            {
               'cursor-not-allowed bg-opacity-40': disabled,
            }
         )}
         style={disabled ? { pointerEvents: 'none' } : undefined}
         disabled={loading || disabled}
         {...p}
         data-testid="core-button"
      >
         {title}
         {content}
      </button>
   );
}
