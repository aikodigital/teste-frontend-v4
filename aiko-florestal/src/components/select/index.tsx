/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx';
import React, { ComponentProps, forwardRef } from 'react';

type SelectFieldProps = {
   placeholder: string;
   options: { value: string; label: string }[];
   errors?: string;
   disabled?: boolean;
   defaultValue?: string;
   className?: string;
} & ComponentProps<'select'>;

const SelectField: React.ForwardRefRenderFunction<HTMLSelectElement, SelectFieldProps> = (
   { placeholder, options, errors, disabled, defaultValue, className, ...props },
   forwardedRef
) => {
   const hasErrors = !!errors;

   return (
      <div>
         <div className='focus-within:border-green-200 focus-within:ring-2 focus-within:ring-green-100 rounded-md'>
            <select
               ref={forwardedRef}
               defaultValue={defaultValue}
               disabled={disabled}
               className={clsx(
                  'block h-10 w-full appearance-none rounded-md border border-gray-400 px-3 py-2 shadow-sm placeholder:text-gray-400 placeholder:text-lg focus:outline-none sm:text-lg',
                  { 'focus:border-primary-400 focus:ring-primary-400': !hasErrors },
                  { 'border-red-500': hasErrors },
                  disabled && 'bg-off-white text-gray-500 cursor-not-allowed',
                  className
               )}
               {...props}
            >
               <option value="" disabled>{placeholder}</option>
               {options.map((option) => (
                  <option key={option.value} value={option.value}>
                     {option.label}
                  </option>
               ))}
            </select>
         </div>
         {hasErrors && <p className="mt-2 text-sm text-red-600">{errors}</p>}
      </div>
   );
};

export default forwardRef(SelectField);
