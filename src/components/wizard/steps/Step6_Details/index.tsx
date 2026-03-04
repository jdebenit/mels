import React from 'react';
import type { CharacterState } from '../../../../data/wizardConfig';
import { WizardSection } from '../../shared/layout/WizardSection';
import './Step6_Details.css';

interface StepProps {
    data: CharacterState;
    onChange: (updates: Partial<CharacterState>) => void;
}

export const Step6_Details: React.FC<StepProps> = ({ data, onChange }) => {

    const handleChange = (field: keyof CharacterState, value: string) => {
        onChange({ [field]: value });
    };

    return (
        <div className="wizard-step step-details">
            <div className="details-header">
                <h3>DATOS DEL OPERATIVO</h3>
                <p className="opacity-80 text-sm mb-4">
                    Por favor, proporcione los datos identificativos finales para el registro en la base de datos de la agencia.
                </p>
            </div>

            <div className="details-grid">
                <WizardSection title="Identificación">
                    <div className="wizard-field">
                        <label>Nombre del Operativo / Alias</label>
                        <input
                            type="text"
                            className="wizard-input text-input"
                            placeholder="Ej. John Doe / 'Specter'"
                            value={data.name || ''}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                    </div>

                    <div className="wizard-field">
                        <label>Concepto (Breve descripción)</label>
                        <input
                            type="text"
                            className="wizard-input text-input"
                            placeholder="Ej. Ex-militar buscador de redención"
                            value={data.concept || ''}
                            onChange={(e) => handleChange('concept', e.target.value)}
                        />
                    </div>
                </WizardSection>

                <WizardSection title="Ficha Profesional">
                    <div className="wizard-field">
                        <label>Profesión / Ocupación Principal</label>
                        <input
                            type="text"
                            className="wizard-input text-input"
                            placeholder="Ej. Investigador Privado, Hacker"
                            value={data.profession || ''}
                            onChange={(e) => handleChange('profession', e.target.value)}
                        />
                    </div>

                    <div className="wizard-field">
                        <label>Rango / Nivel de Acceso</label>
                        <input
                            type="text"
                            className="wizard-input text-input"
                            placeholder="Ej. Agente de Campo Nivel 3"
                            value={data.rank || ''}
                            onChange={(e) => handleChange('rank', e.target.value)}
                        />
                    </div>

                    <div className="wizard-field">
                        <label>Organización / Departamento</label>
                        <input
                            type="text"
                            className="wizard-input text-input"
                            placeholder="Ej. Prometheus, División Táctica"
                            value={data.organization || ''}
                            onChange={(e) => handleChange('organization', e.target.value)}
                        />
                    </div>
                </WizardSection>
            </div>
        </div>
    );
};
