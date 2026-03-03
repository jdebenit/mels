import React, { useState } from 'react';
import type { CharacterState } from '../../../../data/wizardConfig';
import { FACTIONS } from '../../../../data/wizardFactions';
import { ADVANTAGES, DISADVANTAGES, type Trait } from '../../../../data/wizardAdvantages';
import { useCharacterCalculations } from '../../../../hooks/wizard/useCharacterCalculations';
import { WizardSection } from '../../shared/layout/WizardSection';
import './Step4_Advantages.css';

interface StepProps {
    data: CharacterState;
    onChange: (updates: Partial<CharacterState>) => void;
}

export const Step4_Advantages: React.FC<StepProps> = ({ data, onChange }) => {
    const calc = useCharacterCalculations(data);
    const { advantages, disadvantages, faction } = data;
    const points = calc.points.advantages;

    // Filter traits that belong to the selected faction to highlight them
    const selectedFaction = FACTIONS.find(f => f.id === faction);
    const factionVentajas = selectedFaction?.ventajas.map(v => v.toLowerCase()) || [];
    const factionDesventajas = selectedFaction?.desventajas.map(d => d.toLowerCase()) || [];

    const handleTraitChange = (type: 'advantages' | 'disadvantages', traitId: string, newLevel: number, maxLevel: number) => {
        if (newLevel < 0 || newLevel > maxLevel) return;

        // If it's an advantage, ensure we don't exceed the global max of 3 levels
        if (type === 'advantages' && newLevel > (advantages[traitId] || 0)) {
            if (points.totalAdvantageLevels >= points.max) {
                return; // Cannot add more advantages
            }
        }

        const currentTraits = data[type];
        const newTraits = { ...currentTraits };

        if (newLevel === 0) {
            delete newTraits[traitId];
        } else {
            newTraits[traitId] = newLevel;
        }

        onChange({ [type]: newTraits });
    };

    const renderTraitList = (traits: Trait[], type: 'advantages' | 'disadvantages', factionList: string[]) => {
        return (
            <ul className={`traits-selection-list ${type}`}>
                {traits.map(trait => {
                    const level = data[type][trait.id] || 0;
                    const isFactionTrait = factionList.some(ft => ft.includes(trait.name.toLowerCase()));
                    const disableIncrease = level >= trait.maxLevel || (type === 'advantages' && points.totalAdvantageLevels >= points.max);

                    return (
                        <li key={trait.id} className={`trait-item ${level > 0 ? 'active' : ''} ${isFactionTrait ? 'faction-trait' : ''}`}>
                            <div className="trait-info">
                                <div className="trait-header">
                                    <span className="trait-name">{trait.name}</span>
                                    {isFactionTrait && <span className="faction-badge">FACCIÓN</span>}
                                    {level > 0 && <span className="trait-level-badge">Nivel {level}</span>}
                                </div>
                                <p className="trait-description">{trait.description}</p>
                            </div>
                            <div className="trait-controls">
                                <button
                                    className="spec-btn minus"
                                    onClick={() => handleTraitChange(type, trait.id, level - 1, trait.maxLevel)}
                                    disabled={level === 0}
                                >
                                    -
                                </button>
                                <div className="spec-blocks">
                                    {[...Array(3)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`spec-block ${level > i ? 'filled' : ''} ${i >= trait.maxLevel ? 'unavailable' : ''}`}
                                            title={i >= trait.maxLevel ? 'Nivel no disponible en esta ventaja' : ''}
                                        ></span>
                                    ))}
                                </div>
                                <button
                                    className="spec-btn plus"
                                    onClick={() => handleTraitChange(type, trait.id, level + 1, trait.maxLevel)}
                                    disabled={disableIncrease}
                                >
                                    +
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="wizard-step step-advantages">
            <div className="advantages-header">
                <h3>VENTAJAS Y DESVENTAJAS</h3>
                <p className="opacity-80 text-sm mb-4">
                    Obtienes 1 nivel de ventaja gratuito por tu facción. Puedes adquirir hasta 3 niveles de Ventajas.
                    Por cada nivel extra de Ventaja adquirido, deberás obtener un nivel en Desventajas para equilibrar los costes.
                </p>
                <div className={`points-counter ${!points.isValid ? 'error' : ''}`}>
                    VENTAJAS: <strong>{points.totalAdvantageLevels}</strong>/3 |
                    DESVENTAJAS: <strong>{points.totalDisadvantageLevels}</strong>/Necesarias: {points.requiredDisadvantageLevels}
                    {!points.isValid && <div className="text-alert text-xs mt-1">Requiere más desventajas para compensar.</div>}
                </div>
            </div>

            <div className="advantages-grid">
                <WizardSection title="Ventajas">
                    {renderTraitList(ADVANTAGES, 'advantages', factionVentajas)}
                </WizardSection>

                <WizardSection title="Desventajas">
                    <p className="text-xs opacity-60 mb-4 block">
                        Las Desventajas equilibran el coste de las Ventajas adicionales, pero suponen un lastre para tu operativo durante sus misiones y su día a día.
                    </p>
                    {renderTraitList(DISADVANTAGES, 'disadvantages', factionDesventajas)}
                </WizardSection>
            </div>
        </div>
    );
};
