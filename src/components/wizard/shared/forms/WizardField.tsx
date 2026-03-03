import React, { type InputHTMLAttributes } from 'react';
import './WizardForms.css';

interface WizardFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const WizardField: React.FC<WizardFieldProps> = ({
    label,
    error,
    className = '',
    id,
    ...props
}) => {
    const inputId = id || `field-${label.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className={`wizard-field-container ${className}`}>
            <label htmlFor={inputId} className="wizard-field-label">
                &gt; {label}
            </label>
            <input
                id={inputId}
                className={`wizard-input ${error ? 'wizard-input-error' : ''}`}
                {...props}
            />
            {error && <span className="wizard-field-error">{error}</span>}
        </div>
    );
};
