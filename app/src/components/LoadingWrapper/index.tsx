import React from "react";

interface Props extends React.PropsWithChildren {
  isLoading: boolean;
  fallback?: React.ReactNode;
  className?: string;
}

export function LoadingWrapper({ children, isLoading, fallback = null, className = "" }: Props) {
  return isLoading ? (
    fallback ? fallback : (
      <div className={`min-h-[50vh] w-full container bg-white rounded flex justify-center items-center shadow ${className}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36" height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin"
        >
          <path d="M12 2v4" />
          <path d="m16.2 7.8 2.9-2.9" />
          <path d="M18 12h4" />
          <path d="m16.2 16.2 2.9 2.9" />
          <path d="M12 18v4" />
          <path d="m4.9 19.1 2.9-2.9" />
          <path d="M2 12h4" />
          <path d="m4.9 4.9 2.9 2.9" />
        </svg>
      </div>
    )
  ) : children;
}