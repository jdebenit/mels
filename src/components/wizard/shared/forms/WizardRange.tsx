import React, { type InputHTMLAttributes } from 'react';
import './WizardForms.css';

interface WizardRangeProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
    value: number;
    min?: number;
    max?: number;
    onChangeValue: (val: number) => void;
}

export const WizardRange: React.FC<WizardRangeProps> = ({
    label,
    value,
    min = 0,
    max = 8,
    onChangeValue,
    className = '',
    ...props
}) => {
    return (
        <div className={`wizard-range-container ${className}`}>
            <div className="wizard-range-header">
                <label className="wizard-range-label">&gt; {label}</label>
                <span className="wizard-range-value">{value}</span>
            </div>
            <input
                type="range"
                className="wizard-range-input"
                value={value}
                min={min}
                max={max}
                onChange={(e) => onChangeValue(Number(e.target.value))}
                {...props}
            />
            <div className="wizard-range-ticks">
                {Array.from({ length: max - min + 1 }).map((_, i) => (
                    <span key={i} className={`wizard-range-tick ${value >= min + i ? 'active' : ''}`} />
                ))}
            </div>
        </div>
    );
};
