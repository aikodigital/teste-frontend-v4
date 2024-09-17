import clsx from 'clsx';
import React, { ComponentProps, forwardRef, useRef } from 'react';

type TextFieldProps = {
   placeholder: string;
   type?: 'password' | 'text' | 'number' | 'email' | 'tel' | 'date' | 'datetime-local';
   errors?: string;
   disabled?: boolean;
   defaultValue?: string;
   className?: string; 
} & ComponentProps<'input'>;

const TextField: React.ForwardRefRenderFunction<HTMLInputElement, TextFieldProps> = (
   { placeholder, type = 'text', errors, disabled, defaultValue, className, ...props },
   forwardedRef
) => {
   const hasErrors = !!errors;
   const inputRef = useRef<HTMLInputElement | null>(null);

   return (
      <div>
         <div className='focus-within:border-green-200 focus-within:ring-2 focus-within:ring-green-100 rounded-md'>
         <input
            ref={(el) => {
               inputRef.current = el;
               if (forwardedRef && typeof forwardedRef === 'function') {
                  forwardedRef(el);
               } else if (forwardedRef && 'current' in forwardedRef) {
                  forwardedRef.current = el;
               }
            }}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            defaultValue={defaultValue}
            className={clsx(
               'block h-10 w-full appearance-none rounded-md border border-gray-400 px-3 py-2 shadow-sm placeholder:text-gray-400 placeholder:text-lg focus:outline-none sm:text-lg',
               { 'focus:border-primary-400 focus:ring-primary-400': !hasErrors },
               { 'border-red-500': hasErrors },
               disabled && 'bg-off-white text-gray-500 cursor-not-allowed',
               className
            )}
            {...props}
         />
         </div>
      </div>
   );
};

export default forwardRef(TextField);
