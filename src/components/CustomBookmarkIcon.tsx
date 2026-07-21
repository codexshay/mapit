import React from 'react';

interface CustomBookmarkIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  fill?: string;
}

export const CustomBookmarkIcon: React.FC<CustomBookmarkIconProps> = ({
  size,
  className = '',
  fill = 'none',
  ...props
}) => {
  // If size is provided, override width and height, otherwise let Tailwind classes (w-*, h-*) handle it
  const dimensionProps = size ? { width: size, height: size } : {};
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="square"
      strokeLinejoin="round"
      className={className}
      {...dimensionProps}
      {...props}
    >
      <path d="M5 2h14v20l-7-6-7 6V2z" />
    </svg>
  );
};

export default CustomBookmarkIcon;
