import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', children, className, ...props }: ButtonProps) => {
  const baseStyles = "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border";
  
  const variants = {
    primary: "bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-900/20 dark:border-rose-800",
    outline: "bg-slate-50 border-slate-200 text-slate-500 hover:border-rose-300 hover:text-rose-500 dark:bg-slate-800 dark:border-slate-700"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};