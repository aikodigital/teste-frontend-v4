import React from "react";

interface Props {
  time: string
  text: string
  color: string
}

export function TimlineItem({ time, text, color }: Props) {
  return (
    <li className="relative mb-2 mr-0">
      <i className="absolute w-3 h-3 rounded-full bg-white border-2 border-blue-900 left-[27px] top-2.5 z-20" />
      <div className="relative ml-12 mr-4 bg-white shadow rounded overflow-hidden flex items-center">
        <span className="h-9 w-4 shrink-0" style={{ backgroundColor: color }} />
        <p className="text-sm font-medium w-full p-2 text-gray-600 border-gray-200">
          {text}
        </p>
        <span className="text-sm p-2 text-gray-500 float-right flex items-center gap-1">
          <svg
            fill="currentColor"
            width="12px"
            height="12px"
            viewBox="0 0 0.36 0.36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.226 0.189 0.195 0.171V0.105a0.015 0.015 0 0 0 -0.03 0v0.075a0.015 0.015 0 0 0 0.007 0.013l0.039 0.022a0.015 0.015 0 1 0 0.015 -0.026M0.18 0.03a0.15 0.15 0 1 0 0.15 0.15 0.15 0.15 0 0 0 -0.15 -0.15m0 0.27A0.12 0.12 0 1 1 0.3 0.18 0.12 0.12 0 0 1 0.18 0.3" />
          </svg>
          {time}
        </span>
      </div>
    </li>
  )
}
