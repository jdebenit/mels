import React, { useState, useEffect } from 'react';
import { initialCharacterState, STEPS, type CharacterState } from '../../data/wizardConfig';
import { APP_VERSIONS } from '../../data/appVersions';
import { useCharacterCalculations } from '../../hooks/wizard/useCharacterCalculations';
import { WizardButton } from './shared/ui/WizardButton';
import { Step1_Attributes } from './steps/Step1_Attributes';
import { Step2_Faction } from './steps/Step2_Faction';
import { Step3_Specializations } from './steps/Step3_Specializations';
import { Step4_Advantages } from './steps/Step4_Advantages';
import { Step5_Fractals } from './steps/Step5_Fractals';
import { Step6_Details } from './steps/Step6_Details';
import './CharacterWizard.css';

// Placeholder for Steps until Step 5 is implemented
const StepPlaceholder = ({ title }: { title: string }) => (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>[EN CONSTRUCCIÓN] {title}</h3>
    </div>
);


export const CharacterWizard = () => {
    // 1. Lifted State Management
    const [characterData, setCharacterData] = useState<CharacterState>(initialCharacterState);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    // 2. Calculations Hook
    const calc = useCharacterCalculations(characterData);

    // 3. handleStepChange for Partial Updates
    const handleStepChange = (updates: Partial<CharacterState>) => {
        setCharacterData(prev => {
            const nextState = { ...prev };

            // Deep merge logic for specific keys
            Object.keys(updates).forEach((key) => {
                const k = key as keyof CharacterState;
                if (typeof updates[k] === 'object' && updates[k] !== null && !Array.isArray(updates[k])) {
                    // It's a nested object like attributes or fractals
                    (nextState as any)[k] = { ...(prev as any)[k], ...(updates as any)[k] };
                } else {
                    // It's a primitive or array
                    (nextState as any)[k] = updates[k];
                }
            });

            return nextState;
        });
    };

    // 4. Navigation
    const nextStep = () => setCurrentStepIndex(prev => Math.min(prev + 1, STEPS.length - 1));
    const prevStep = () => setCurrentStepIndex(prev => Math.max(prev - 1, 0));

    // Keyboard bindings
    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    if (!isOpen) return null;

    const currentStepConfig = STEPS[currentStepIndex];

    return (
        <div className="wizard-overlay">
            <header className="wizard-header">
                <h2>{characterData.name || 'NUEVO OPERATIVO'} // CREACIÓN</h2>
                <button className="wizard-close-btn" onClick={() => setIsOpen(false)}>
                    Cerrar [ESC]
                </button>
            </header>

            <main className="wizard-content">
                <div className="step-indicator">
                    {STEPS.map((s, idx) => (
                        <div
                            key={s.id}
                            className={`step-dot ${idx === currentStepIndex ? 'active' : ''} ${idx < currentStepIndex ? 'completed' : ''}`}
                            title={s.name}
                        />
                    ))}
                </div>

                {/* Render current step based on config */}
                {currentStepConfig.id === 'attributes' && <StepPlaceholder title={currentStepConfig.name} />}
                {currentStepConfig.id === 'faction' && <StepPlaceholder title={currentStepConfig.name} />}
                {currentStepConfig.id === 'specializations' && <StepPlaceholder title={currentStepConfig.name} />}
                {currentStepConfig.id === 'advantages' && <StepPlaceholder title={currentStepConfig.name} />}
                {currentStepConfig.id === 'fractals' && <StepPlaceholder title={currentStepConfig.name} />}
                {currentStepConfig.id === 'details' && <StepPlaceholder title={currentStepConfig.name} />}

            </main>

            <footer className="wizard-footer">
                <WizardButton onClick={prevStep} disabled={currentStepIndex === 0} variant="outline">
                    Anterior
                </WizardButton>

                <div className="wizard-status font-mono text-xs opacity-60">
                    PUNTOS RESTANTES: {calc.points.attributes.remaining} | PASO {currentStepIndex + 1}/{STEPS.length}
                </div>

                <WizardButton onClick={nextStep} variant="primary">
                    {currentStepIndex === STEPS.length - 1 ? 'Finalizar' : 'Siguiente'}
                </WizardButton>
            </footer>
        </div>
    );
};

export const WizardTrigger = () => {
    // In actual Astro integration, checking 'isOpen' requires context if they are separated.
    // For this architecture to work completely standalone in React:
    // We should either wrap it, or just control state inside CharacterWizard 
    // and expose a global event or window method to open it since Astro islands isolate state.

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-wizard'))}
                className="btn wizard-btn wizard-btn-primary"
                style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
            >
                COMENZAR CREACIÓN DE FICHA
            </button>
        </div>
    );
};

// Global listener wrapper for the Astro Island
export const CharacterWizardApp = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-wizard', handleOpen);
        return () => window.removeEventListener('open-wizard', handleOpen);
    }, []);

    if (!isOpen) return null;

    // We clone CharacterWizard logic but inject isOpen from the wrapper to maintain simplicity
    // Actually, let's just use the CharacterWizard as is, but modify it to accept isOpen props
    return <CharacterWizardCore isOpen={isOpen} setIsOpen={setIsOpen} />;
};

const CharacterWizardCore = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (o: boolean) => void }) => {
    // 1. Lifted State Management
    const [characterData, setCharacterData] = useState<CharacterState>(initialCharacterState);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    // 2. Calculations Hook
    const calc = useCharacterCalculations(characterData);

    // 3. handleStepChange for Partial Updates
    const handleStepChange = (updates: Partial<CharacterState>) => {
        setCharacterData(prev => {
            const nextState = { ...prev };
            Object.keys(updates).forEach((key) => {
                const k = key as keyof CharacterState;
                if (typeof updates[k] === 'object' && updates[k] !== null && !Array.isArray(updates[k])) {
                    (nextState as any)[k] = { ...(prev as any)[k], ...(updates as any)[k] };
                } else {
                    (nextState as any)[k] = updates[k];
                }
            });
            return nextState;
        });
    };

    // 4. Navigation
    const nextStep = () => setCurrentStepIndex(prev => Math.min(prev + 1, STEPS.length - 1));
    const prevStep = () => setCurrentStepIndex(prev => Math.max(prev - 1, 0));

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('wizard-mode-active');
        } else {
            document.body.classList.remove('wizard-mode-active');
        }

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.classList.remove('wizard-mode-active'); // Cleanup on unmount
        };
    }, [isOpen, setIsOpen]);

    // JSON Export/Import Handlers
    const handleExport = () => {
        const exportPayload = {
            meta: {
                version: APP_VERSIONS.WIZARD,
                generator: "MELS Wizard"
            },
            ...characterData
        };

        const dataStr = JSON.stringify(exportPayload, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ficha_${characterData.name || 'operativo'}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                // Basic validation
                if (json && typeof json === 'object') {
                    // Strip meta chunk when importing
                    const { meta, ...characterPayload } = json;
                    // We merge with initial state to ensure all fields exist
                    setCharacterData({ ...initialCharacterState, ...characterPayload });
                }
            } catch (err) {
                console.error("Error parsing JSON:", err);
                alert("Error al leer el archivo JSON.");
            }
        };
        reader.readAsText(file);
        // Reset input so the same file could be selected again if needed
        e.target.value = '';
    };

    const currentStepConfig = STEPS[currentStepIndex];

    return (
        <div className="wizard-overlay">
            <header className="wizard-header">
                <h2>
                    {characterData.name || 'NUEVO OPERATIVO'} // CREACIÓN
                    <span style={{ fontSize: '0.6rem', color: 'var(--color-secondary)', marginLeft: '10px', verticalAlign: 'top' }}>
                        [{APP_VERSIONS.WIZARD}]
                    </span>
                </h2>
                <div className="wizard-header-actions">
                    <label className="wizard-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                        IMPORTAR JSON
                        <input type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
                    </label>
                    <button className="wizard-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={handleExport}>
                        EXPORTAR JSON
                    </button>
                    <button className="wizard-close-btn" onClick={() => setIsOpen(false)}>
                        Cerrar [ESC]
                    </button>
                </div>
            </header>

            <main className="wizard-content">
                <div className="step-indicator">
                    {STEPS.map((s, idx) => (
                        <div
                            key={s.id}
                            className={`step-dot ${idx === currentStepIndex ? 'active' : ''} ${idx < currentStepIndex ? 'completed' : ''}`}
                            title={s.name}
                        />
                    ))}
                </div>

                {currentStepConfig.id === 'attributes' && (
                    <Step1_Attributes
                        data={characterData}
                        onChange={handleStepChange}
                    />
                )}
                {currentStepConfig.id === 'faction' && (
                    <Step2_Faction
                        data={characterData}
                        onChange={handleStepChange}
                    />
                )}
                {currentStepConfig.id === 'specializations' && (
                    <Step3_Specializations
                        data={characterData}
                        onChange={handleStepChange}
                    />
                )}
                {currentStepConfig.id === 'advantages' && (
                    <Step4_Advantages
                        data={characterData}
                        onChange={handleStepChange}
                    />
                )}
                {currentStepConfig.id === 'fractals' && (
                    <Step5_Fractals
                        data={characterData}
                        onChange={handleStepChange}
                    />
                )}
                {currentStepConfig.id === 'details' && (
                    <Step6_Details
                        data={characterData}
                        onChange={handleStepChange}
                    />
                )}

            </main>

            <footer className="wizard-footer">
                <WizardButton onClick={prevStep} disabled={currentStepIndex === 0} variant="outline">
                    Anterior
                </WizardButton>

                <div className="wizard-status font-mono text-xs opacity-60">
                    PASO {currentStepIndex + 1}/{STEPS.length}
                </div>

                <WizardButton onClick={nextStep} variant="primary">
                    {currentStepIndex === STEPS.length - 1 ? 'Finalizar' : 'Siguiente'}
                </WizardButton>
            </footer>
        </div>
    );
};
