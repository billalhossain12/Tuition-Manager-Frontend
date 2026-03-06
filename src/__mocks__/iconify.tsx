import React from 'react';

// Type for Icon component props
interface IconProps {
  icon: string;
  className?: string;
}

// Mock Icon component
export const Icon: React.FC<IconProps> = ({ icon, className }) => (
  <span className={className} data-icon={icon} />
);