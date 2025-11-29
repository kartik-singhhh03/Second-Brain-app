import type { ReactElement } from "react";

type Variants = "primary" | "secondary" | "ghost";

interface ButtonProps {
  variant: Variants;
  size: "small" | "medium" | "large";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const variantClasses = {
  primary: "bg-purple-600 text-white hover:bg-purple-500 border border-purple-500",
  secondary: "bg-[#18181f] text-gray-300 hover:text-white border border-gray-800/60 hover:border-gray-700",
  ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-gray-800/50",
};

const sizeStyles = {
  small: "px-4 py-2 text-sm gap-2",
  medium: "px-5 py-2.5 text-sm gap-2",
  large: "px-6 py-3 text-base gap-2.5",
};

const defaultStyles = "rounded-xl font-medium transition-all duration-200 flex items-center justify-center";

export function Button({ 
  variant, 
  size, 
  text, 
  startIcon, 
  endIcon, 
  fullWidth, 
  loading, 
  disabled,
  onClick 
}: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        ${variantClasses[variant]} 
        ${sizeStyles[size]} 
        ${defaultStyles} 
        ${fullWidth ? 'w-full' : ''} 
        ${loading || disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : startIcon ? (
        <span className="flex items-center justify-center">{startIcon}</span>
      ) : null}
      <span>{text}</span>
      {endIcon && <span className="flex items-center justify-center">{endIcon}</span>}
    </button>
  );
}
