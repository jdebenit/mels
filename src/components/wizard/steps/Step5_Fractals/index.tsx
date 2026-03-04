import React from 'react';
import type { CharacterState } from '../../../../data/wizardConfig';
import { FRACTALS } from '../../../../data/wizardFractals';
import { useCharacterCalculations } from '../../../../hooks/wizard/useCharacterCalculations';
import { WizardSection } from '../../shared/layout/WizardSection';
import { WizardRange } from '../../shared/forms/WizardRange';
import './Step5_Fractals.css';

interface StepProps {
    data: CharacterState;
    onChange: (updates: Partial<CharacterState>) => void;
}

export const Step5_Fractals: React.FC<StepProps> = ({ data, onChange }) => {
    const calc = useCharacterCalculations(data);
    const isMutant = data.attributes.mutacion > 0;

    if (!isMutant) {
        return (
            <div className="wizard-step step-fractals step-fractals-disabled">
                <div className="fractals-warning-box">
                    <h3>FRACTALES NO DISPONIBLES</h3>
                    <p>Los fractales representan la comprensión de la naturaleza de las habilidades mutantes.</p>
                    <p>Como tu personaje <strong>NO es mutante</strong> (Mutación = 0), no tiene acceso a los Fractales.</p>
                    <p className="opacity-60 mt-4">Puedes avanzar al siguiente paso.</p>
                </div>
            </div>
        );
    }

    const { principal, opuesto, levels } = data.fractals;
    const points = calc.points.fractals;

    const handleSelectPrincipal = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value || null;
        onChange({ fractals: { ...data.fractals, principal: val } });
    };

    const handleSelectOpuesto = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value || null;
        onChange({ fractals: { ...data.fractals, opuesto: val } });
    };

    const handleLevelChange = (fractalId: string, value: number) => {
        onChange({
            fractals: {
                ...data.fractals,
                levels: {
                    ...data.fractals.levels,
                    [fractalId]: value
                }
            }
        });
    };

    return (
        <div className="wizard-step step-fractals">
            <div className="fractals-header">
                <h3>LOS FRACTALES</h3>
                <p className="opacity-80 text-sm mb-4">
                    Los fractales representan la comprensión que los mutantes tienen de la naturaleza de sus propias habilidades. Cuanto mayor sea el nivel, más vasta será esta comprensión.
                </p>

                <div className="fractals-points-box">
                    PUNTOS DISPONIBLES: <strong>{points.remaining} / {points.max}</strong>
                </div>

                {points.errors && points.errors.length > 0 && (
                    <div className="fractals-errors">
                        {points.errors.map((err, i) => <div key={i} className="error-text">! {err}</div>)}
                    </div>
                )}
            </div>

            <div className="fractals-layout">
                <WizardSection title="Asignación">
                    <p className="text-xs opacity-70 mb-4">
                        Elige tu Fractal Principal (recibe +1 nivel gratuito) y tu Fractal Opuesto. Ningún fractal puede superar el nivel del Principal, y el Opuesto no puede superar al Principal - 1.
                    </p>

                    <div className="wizard-field">
                        <label>Fractal Principal [+1 Gratis]</label>
                        <select className="wizard-select" value={principal || ''} onChange={handleSelectPrincipal}>
                            <option value="">-- Seleccionar --</option>
                            {Object.values(FRACTALS).map(f => (
                                <option key={f.id} value={f.id} disabled={f.id === opuesto}>{f.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="wizard-field">
                        <label>Fractal Opuesto [Limitado]</label>
                        <select className="wizard-select" value={opuesto || ''} onChange={handleSelectOpuesto}>
                            <option value="">-- Seleccionar --</option>
                            {Object.values(FRACTALS).map(f => (
                                <option key={f.id} value={f.id} disabled={f.id === principal}>{f.name}</option>
                            ))}
                        </select>
                    </div>
                </WizardSection>

                <WizardSection title="Niveles de Fractal">
                    <div className="fractals-list">
                        {Object.values(FRACTALS).map(fractal => {
                            const isPrincipal = fractal.id === principal;
                            const isOpuesto = fractal.id === opuesto;

                            // The actual level stored
                            const rawLevel = levels[fractal.id] || 0;
                            // Effective level: logic says "reciben un nivel gratuito". 
                            // Meaning if rawLevel = 0, and is principal, it becomes 1? 
                            // If they increase it, it's 2. 
                            // WAIT: Is the +1 added directly to the raw score or visually?
                            // Let's make the RAW score minimum 1 if principal.
                            // If user sets it to 2, it costs 1 point.
                            // Actually, let's just make the slider start at 1 if Principal.
                            const minVal = isPrincipal ? 1 : 0;
                            const currentVal = Math.max(minVal, rawLevel);

                            return (
                                <div key={fractal.id} className={`fractal-item ${isPrincipal ? 'is-principal' : ''} ${isOpuesto ? 'is-opuesto' : ''}`}>
                                    <div className="fractal-name">
                                        <h4>{fractal.name}</h4>
                                        {isPrincipal && <span className="fractal-badge badge-principal">PRINCIPAL</span>}
                                        {isOpuesto && <span className="fractal-badge badge-opuesto">OPUESTO</span>}
                                    </div>
                                    <p className="fractal-desc text-xs opacity-60 mb-2">{fractal.description}</p>

                                    <WizardRange
                                        label="Nivel de Sintonía"
                                        value={currentVal}
                                        min={minVal}
                                        max={5}
                                        onChangeValue={(v) => handleLevelChange(fractal.id, v)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </WizardSection>
            </div>
        </div>
    );
};
