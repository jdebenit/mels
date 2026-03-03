import React, { type ReactNode } from 'react';
import './WizardSection.css';

interface WizardSectionProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
}

export const WizardSection: React.FC<WizardSectionProps> = ({ title, icon, children, className = '' }) => {
    return (
        <section className={`wizard-section panel ${className}`}>
            <header className="wizard-section-header">
                {icon && <span className="wizard-section-icon">{icon}</span>}
                <h3 className="wizard-section-title">{title}</h3>
            </header>
            <div className="wizard-section-content">
                {children}
            </div>
        </section>
    );
};
