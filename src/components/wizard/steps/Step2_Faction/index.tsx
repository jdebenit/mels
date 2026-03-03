import React from 'react';
import type { CharacterState } from '../../../../data/wizardConfig';
import { FACTIONS } from '../../../../data/wizardFactions';
import { WizardSection } from '../../shared/layout/WizardSection';
import './Step2_Faction.css';

interface StepProps {
    data: CharacterState;
    onChange: (updates: Partial<CharacterState>) => void;
}

export const Step2_Faction: React.FC<StepProps> = ({ data, onChange }) => {

    const handleSelectFaction = (factionId: string) => {
        onChange({ faction: factionId });
    };

    const selectedFaction = FACTIONS.find(f => f.id === data.faction);

    return (
        <div className="wizard-step step-faction">
            <div className="step-faction-header">
                <h3>ELECCIÓN DE FACCIÓN</h3>
                <p className="opacity-80 text-sm mb-4">
                    La pertenencia a una facción representa el tipo de entrenamiento que ha recibido el operativo antes de comenzar a vivir sus aventuras. Selecciona tu lealtad.
                </p>
            </div>

            <div className="faction-grid">
                <WizardSection title="Facciones Disponibles" className="faction-selection-section">
                    <div className="faction-list">
                        {FACTIONS.map(faction => (
                            <button
                                key={faction.id}
                                className={`faction-btn ${data.faction === faction.id ? 'active' : ''}`}
                                onClick={() => handleSelectFaction(faction.id)}
                            >
                                <span className="faction-name">{faction.name}</span>
                                {data.faction === faction.id && <span className="faction-selected-mark">[X]</span>}
                            </button>
                        ))}
                    </div>
                </WizardSection>

                {selectedFaction ? (
                    <WizardSection title="Información Clasificada" className="faction-details-section">
                        <div className="faction-details">
                            <h4 className="faction-details-title">{selectedFaction.name}</h4>
                            <p className="faction-description">{selectedFaction.description}</p>

                            <div className="faction-traits mt-6">
                                <div className="traits-column">
                                    <h5 className="text-accent mb-2">VENTAJAS DISPONIBLES</h5>
                                    <ul className="traits-list positive">
                                        {selectedFaction.ventajas.map((v, i) => (
                                            <li key={i}>+ {v}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="traits-column mt-4">
                                    <h5 className="text-alert mb-2">DESVENTAJAS (RIESGOS)</h5>
                                    <ul className="traits-list negative">
                                        {selectedFaction.desventajas.map((d, i) => (
                                            <li key={i}>- {d}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <p className="traits-info-note mt-6 text-xs opacity-60">
                                <em>*Nota: Podrás adquirir una ventana gratuitamente a nivel 1 en pasos posteriores. Podrás ampliar hasta un máximo de 3 niveles compensando su coste con desventajas.</em>
                            </p>
                        </div>
                    </WizardSection>
                ) : (
                    <WizardSection title="Información Clasificada" className="faction-details-section empty">
                        <div className="empty-state text-center opacity-50 p-8">
                            <p>Esperando selección de parámetros...</p>
                        </div>
                    </WizardSection>
                )}
            </div>
        </div>
    );
};
