import React from 'react';

export type TMenuIcon = {
   text?: string;
   Icon?: React.ElementType;
   onClick?: () => void;
};

export default function MenuIcon({ Icon }: TMenuIcon) {
   return Icon ? <Icon className={`mr-4 h-5 w-5`} aria-hidden="true" /> : null;
}
