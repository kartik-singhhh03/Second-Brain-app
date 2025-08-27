import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

interface ButtonProps {
  variant: Variants;
  size: "small" | "medium" | "large";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses = {
  primary: "bg-purple-600 text-white hover:bg-purple-700",
  secondary: "bg-purple-300 text-purple-900 hover:bg-purple-500",
};

const sizeStyles = {
  small: "px-3 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

const defaultStyles = "px-4 py-2 text-base rounded-md font-semibold transition-colors flex items-center font-light";

export function Button({ variant, size, text, startIcon, endIcon,fullWidth,loading, onClick }: ButtonProps) {
  return (
    <button onClick={onClick}
      className={`${variantClasses[variant]} ${sizeStyles[size]} ${defaultStyles} ${fullWidth ? ' w-full flex justify-center items-center': ''} ${loading ? "opacity-45 ": ""} `} disabled={loading}>
    
      <div className = "pr-2">
      {startIcon}
      </div>
      <span>{text}</span>
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
}
