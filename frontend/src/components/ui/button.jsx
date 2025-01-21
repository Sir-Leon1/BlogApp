import React from 'react';

export const Button = ({
                  children,
                  variant = 'primary',
                  size = 'md',
                  className = '',
                  ...props
                }) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors';

  const variants = {
    primary: 'bg-purple-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;