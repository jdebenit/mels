import React, { useState } from 'react';
import type { CharacterState } from '../../../../data/wizardConfig';
import { SKILL_CATEGORIES } from '../../../../data/wizardSkills';
import { useCharacterCalculations } from '../../../../hooks/wizard/useCharacterCalculations';
import { WizardSection } from '../../shared/layout/WizardSection';
import './Step3_Specializations.css';

interface StepProps {
    data: CharacterState;
    onChange: (updates: Partial<CharacterState>) => void;
}

export const Step3_Specializations: React.FC<StepProps> = ({ data, onChange }) => {
    const calc = useCharacterCalculations(data);
    const { specializations } = data;
    const points = calc.points.specializations;

    // Local state for search filter
    const [searchTerm, setSearchTerm] = useState('');

    const handleSpecChange = (specName: string, newLevel: number) => {
        const currentLevel = specializations[specName] || 0;

        // Validation logic
        if (newLevel < 0 || newLevel > 2) return;

        // Check max level 2 slots if trying to upgrade from 1 to 2
        if (newLevel === 2 && currentLevel === 1) {
            if (points.currentLevel2Count >= points.maxLevel2Allowed) {
                // Cannot upgrade, reached max level 2 slots
                return;
            }
        }

        const newSpecs = { ...specializations };

        if (newLevel === 0) {
            delete newSpecs[specName]; // Clean up
        } else {
            newSpecs[specName] = newLevel;
        }

        onChange({ specializations: newSpecs });
    };

    // Filter categories based on search
    const filteredCategories = SKILL_CATEGORIES.map(cat => {
        const filteredSpecs = cat.specializations.filter(s =>
            s.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { ...cat, specializations: filteredSpecs };
    }).filter(cat => cat.specializations.length > 0);

    return (
        <div className="wizard-step step-specializations">
            <div className="specs-header">
                <h3>HABILIDADES Y ESPECIALIZACIONES</h3>
                <p className="opacity-80 text-sm mb-4">
                    Las 13 habilidades básicas otorgan 1d20 a la acción.
                    Las especializaciones añaden +1d20 por cada nivel. Dispone de 15 puntos.
                    (Nivel 1 = 1 pt, Nivel 2 = 3 pts totales).
                    Basado en tu Inteligencia ({calc.finalAttributes.inteligencia}), puedes tener hasta {points.maxLevel2Allowed} especializaciones a nivel 2.
                </p>
                <div className={`points-counter ${!points.isValid ? 'error' : ''}`}>
                    PUNTOS: <strong>{points.remaining}</strong> / {points.max} |
                    NIVEL 2: <strong>{points.currentLevel2Count}</strong> / {points.maxLevel2Allowed}
                </div>
            </div>

            <div className="specs-search-container mb-6">
                <input
                    type="text"
                    className="wizard-input search-input"
                    placeholder="> Buscar especialización..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="specs-grid">
                {filteredCategories.map(cat => (
                    <WizardSection key={cat.id} title={cat.name} className="skill-category-section">
                        <p className="skill-description">{cat.description}</p>
                        <ul className="specializations-list">
                            {cat.specializations.map(spec => {
                                const level = specializations[spec] || 0;
                                const isMaxLvl2Reached = points.currentLevel2Count >= points.maxLevel2Allowed;
                                const disableIncrease = level === 2 || (level === 1 && isMaxLvl2Reached);
                                const costNext = level === 1 ? 2 : 1; // 1 to 2 costs +2 points
                                const notEnoughPoints = points.remaining < costNext;

                                return (
                                    <li key={spec} className={`spec-item ${level > 0 ? 'active' : ''}`}>
                                        <div className="spec-info">
                                            <span className="spec-name">{spec}</span>
                                            {level > 0 && <span className="spec-level-badge">Nivel {level}</span>}
                                        </div>
                                        <div className="spec-controls">
                                            <button
                                                className="spec-btn minus"
                                                onClick={() => handleSpecChange(spec, level - 1)}
                                                disabled={level === 0}
                                            >
                                                -
                                            </button>
                                            <div className="spec-blocks">
                                                <span className={`spec-block ${level >= 1 ? 'filled' : ''}`}></span>
                                                <span className={`spec-block ${level >= 2 ? 'filled' : ''}`}></span>
                                            </div>
                                            <button
                                                className="spec-btn plus"
                                                onClick={() => handleSpecChange(spec, level + 1)}
                                                disabled={disableIncrease || (level < 2 && notEnoughPoints)}
                                                title={isMaxLvl2Reached && level === 1 ? 'Límite de Nivel 2 alcanzado' : ''}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </WizardSection>
                ))}
            </div>
        </div>
    );
};
