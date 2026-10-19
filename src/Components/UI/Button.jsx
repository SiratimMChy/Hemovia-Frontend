import React from 'react';
import { COMPONENT_STYLES } from '../../styles/designSystem';

const Button = ({
  children,
  variant = 'primary',
  size = 'default',
  className = '',
  disabled = false,
  loading = false,
  as: Component = 'button',
  ...props
}) => {
  const getButtonStyle = () => {
    let baseStyle = COMPONENT_STYLES.button[variant] || COMPONENT_STYLES.button.primary;

    if (size === 'small' || size === 'sm') {
      baseStyle = baseStyle
        .replace('px-6 py-4', 'px-3.5 py-1.5 text-xs sm:text-sm')
        .replace('px-6 py-3', 'px-3.5 py-1.5 text-xs sm:text-sm')
        .replace('min-h-[3rem]', 'min-h-[2.25rem]');
    } else if (size === 'large' || size === 'lg') {
      baseStyle = baseStyle
        .replace('px-6 py-4', 'px-8 py-4 text-lg')
        .replace('px-6 py-3', 'px-8 py-4 text-lg')
        .replace('min-h-[3rem]', 'min-h-[4rem]');
    }

    if (disabled || loading) {
      baseStyle += ' opacity-70 cursor-not-allowed';
    }

    return baseStyle;
  };

  return (
    <Component
      className={`${getButtonStyle()} ${className} flex items-center justify-center gap-1.5 rounded-lg`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></div>
      )}
      {children}
    </Component>
  );
};

export default Button;