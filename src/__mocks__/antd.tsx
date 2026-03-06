import React, { ReactNode, CSSProperties } from 'react';

// Type for ConfigProvider props
interface ConfigProviderProps {
  children?: ReactNode;
  theme?: {
    algorithm?: string | string[];
    token?: {
      colorPrimary?: string;
      colorLink?: string;
      colorLinkHover?: string;
      borderRadius?: number;
      wireframe?: boolean;
    };
    components?: {
      Modal?: {
        paddingContentHorizontal?: number;
      };
    };
  };
}

// Type for Modal props
interface ModalProps {
  children?: ReactNode;
  open?: boolean;
  onCancel?: () => void;
  footer?: ReactNode | null;
  styles?: {
    content?: CSSProperties;
    body?: CSSProperties;
  };
  className?: string;
  centered?: boolean;
  width?: number | string;
  closeIcon?: ReactNode | null;
}

// Mock ConfigProvider component
export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => (
  <div>{children}</div>
);

// Mock Modal component
export const Modal: React.FC<ModalProps> = ({ children, open, onCancel, footer, styles }) => {
  if (!open) return null;
  return (
    <div role="dialog" style={styles?.content}>
      {children}
      {footer !== null && (
        <div>
          <button onClick={onCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

// Mock theme object
export const theme = {
  darkAlgorithm: 'dark',
  defaultAlgorithm: 'default'
} as const
