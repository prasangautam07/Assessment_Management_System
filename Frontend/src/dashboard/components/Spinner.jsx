import React from 'react'

export const Spinner = () => {
  return (
    <svg className="animate-spin h-10 w-10" viewBox="0 0 50 50">
        <circle
          className="text-gray-200"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        />
        <circle
          className="text-green-500"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray="90"
          strokeDashoffset="30"
          strokeLinecap="round"
        />
      </svg>
  )
}
