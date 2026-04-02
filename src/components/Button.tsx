import React from 'react';
import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, sx, variant = 'contained', ...props }) => {
  return (
    <MuiButton
      disableElevation
      disableRipple
      variant={variant}
      {...props}
      sx={{
        borderRadius: '4px',
        textTransform: 'none',
        fontWeight: 600,
        padding: '4px 12px',
        transition: 'all 150ms ease-in-out',
        justifyContent: 'flex-start',
        border: '1px solid transparent',
        ...(variant === 'contained' && {
          backgroundColor: 'var(--accent-gold)',
          color: 'var(--text-inverse)',
          '&:hover': {
            backgroundColor: '#B38B3A',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
          },
        }),
        ...(variant === 'outlined' && {
          backgroundColor: 'transparent',
          borderColor: 'var(--border-default)',
          color: 'var(--text-main)',
          '&:hover': {
            backgroundColor: 'transparent',
            borderColor: 'var(--accent-gold)',
          },
        }),
        ...(variant === 'text' && {
          color: 'var(--text-muted)',
          backgroundColor: 'transparent',
          '&:hover': {
            color: 'var(--text-main)',
            backgroundColor: 'transparent',
          },
        }),
        ...sx,
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;