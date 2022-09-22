import { HTMLAttributes } from 'react';

interface ButtonProps {
  label: string;
  color?: 'success' | 'danger' | 'warning';
  submit?: boolean;
  className?: string | undefined;
  onClick?: () => void;
}

export function Button({
  color = 'success',
  label,
  submit,
  className,
  onClick,
}: ButtonProps) {
  const colorSelector = (color: 'success' | 'danger' | 'warning'): string => {
    switch (color) {
      case 'success':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      case 'danger':
        return 'bg-red-500 hover:bg-red-600 text-white';
      default:
        return '';
    }
  };
  return (
    <>
      <button
        type={submit ? 'submit' : 'button'}
        className={`px-4 py-2 ${colorSelector(color)} rounded-md ${className}`}
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
}
