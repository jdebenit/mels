import React from 'react';
import { type CharacterState } from '../../../../data/wizardConfig';
import { useCharacterCalculations } from '../../../../hooks/wizard/useCharacterCalculations';
import { WizardSection } from '../../shared/layout/WizardSection';
import { WizardRange } from '../../shared/forms/WizardRange';
import './Step1_Attributes.css';

interface StepProps {
    data: CharacterState;
    onChange: (updates: Partial<CharacterState>) => void;
    onShowHelp?: () => void;
}

export const Step1_Attributes: React.FC<StepProps> = ({ data, onChange }) => {
    const calc = useCharacterCalculations(data);
    const { attributes } = data;
    const points = calc.points.attributes;

    const handleAttributeChange = (key: keyof typeof attributes, value: number) => {
        onChange({
            attributes: {
                ...attributes,
                [key]: value
            }
        });
    };

    return (
        <div className="wizard-step step-attributes">
            <div className="attributes-header">
                <h3>ATRIBUTOS PRIMARIOS</h3>
                <p className="opacity-80 mb-4 text-sm">
                    Dispondrás de 48 puntos de creación. Puedes aumentar el valor hasta un máximo de 8. Mutación es una excepción, su valor máximo es 5 y sólo es aplicable a mutantes.
                </p>
                <div className={`points-counter ${!points.isValid ? 'error' : ''}`}>
                    PUNTOS DISPONIBLES: <strong>{points.remaining}</strong> / {points.max}
                </div>
            </div>

            <div className="attributes-grid">
                <WizardSection title="Físicos y Mentales">
                    <WizardRange
                        label="FUERZA"
                        value={attributes.fuerza}
                        onChangeValue={(v) => handleAttributeChange('fuerza', v)}
                    />
                    <WizardRange
                        label="DESTREZA"
                        value={attributes.destreza}
                        onChangeValue={(v) => handleAttributeChange('destreza', v)}
                    />
                    <WizardRange
                        label="VOLUNTAD"
                        value={attributes.voluntad}
                        onChangeValue={(v) => handleAttributeChange('voluntad', v)}
                    />
                    <WizardRange
                        label="PERCEPCIÓN"
                        value={attributes.percepcion}
                        onChangeValue={(v) => handleAttributeChange('percepcion', v)}
                    />
                    <WizardRange
                        label="INTELIGENCIA"
                        value={attributes.inteligencia}
                        onChangeValue={(v) => handleAttributeChange('inteligencia', v)}
                    />
                    <WizardRange
                        label="CARISMA"
                        value={attributes.carisma}
                        onChangeValue={(v) => handleAttributeChange('carisma', v)}
                    />
                </WizardSection>

                <WizardSection title="Poder Latente" className="mutacion-section">
                    <WizardRange
                        label="MUTACIÓN"
                        value={attributes.mutacion}
                        max={5}
                        onChangeValue={(v) => handleAttributeChange('mutacion', v)}
                    />
                    <p className="mt-2 text-xs opacity-60">
                        *Los seres humanos no mutantes poseen este atributo con valor 0 inmodificable.
                    </p>
                </WizardSection>
            </div>

            <WizardSection title="Atributos Secundarios Generados">
                <div className="secondary-stats-grid">
                    <div className="stat-box">
                        <span className="stat-label">RESISTENCIA</span>
                        <span className="stat-value">{calc.secondaryAttributes.resistencia}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">INICIATIVA</span>
                        <span className="stat-value">{calc.secondaryAttributes.iniciativa}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">DEFENSA</span>
                        <span className="stat-value">{calc.secondaryAttributes.defensa}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">LETALIDAD</span>
                        <span className="stat-value">
                            {calc.secondaryAttributes.letalidad > 0 ? '+' : ''}{calc.secondaryAttributes.letalidad}
                        </span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">PUNTOS DE ORGULLO</span>
                        <span className="stat-value">{calc.secondaryAttributes.orgullo}</span>
                    </div>
                    {attributes.mutacion > 0 && (
                        <div className="stat-box mutacion-stat">
                            <span className="stat-label">BIOTOLERANCIA</span>
                            <span className="stat-value">{calc.secondaryAttributes.bioTolerancia}</span>
                        </div>
                    )}
                </div>
            </WizardSection>
        </div>
    );
};
