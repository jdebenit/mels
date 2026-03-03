import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';
import './WizardButton.css';

interface WizardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    children: ReactNode;
}

export const WizardButton: React.FC<WizardButtonProps> = ({
    variant = 'secondary',
    children,
    className = '',
    ...props
}) => {
    return (
        <button
            className={`btn wizard-btn wizard-btn-${variant} ${className}`}
            {...props}
        >
            {children}
            <span className="btn-glitch-layer"></span>
        </button>
    );
};
