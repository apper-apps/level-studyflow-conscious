import React from "react"
import { cn } from "@/utils/cn"

const Badge = React.forwardRef(({ 
  children, 
  variant = "default", 
  className, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    primary: "bg-blue-100 text-blue-800 border-blue-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-red-100 text-red-800 border-red-200",
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    overdue: "bg-red-100 text-red-800 border-red-200"
  }

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge