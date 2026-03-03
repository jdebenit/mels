import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// --- CONTEXT & TYPES ---
export type Attributes = {
    fuerza: number;
    destreza: number;
    carisma: number;
    inteligencia: number;
    percepcion: number;
    voluntad: number;
    mutacion: number;
};

export type CharacterData = {
    name: string;
    attributes: Attributes;
    pointsRemaining: number;
    faction: string | null;
    specializations: string[];
    advantages: string[];
    disadvantages: string[];
    fractals: string[];
};

const initialData: CharacterData = {
    name: '',
    attributes: {
        fuerza: 2,
        destreza: 2,
        carisma: 2,
        inteligencia: 2,
        percepcion: 2,
        voluntad: 2,
        mutacion: 0,
    },
    pointsRemaining: 48,
    faction: null,
    specializations: [],
    advantages: [],
    disadvantages: [],
    fractals: [],
};

type WizardContextType = {
    characterData: CharacterData;
    setCharacterData: React.Dispatch<React.SetStateAction<CharacterData>>;
    currentStep: number;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
    const [characterData, setCharacterData] = useState<CharacterData>(initialData);
    const [currentStep, setCurrentStep] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
    const goToStep = (step: number) => setCurrentStep(step);

    return (
        <WizardContext.Provider
            value={{
                characterData,
                setCharacterData,
                currentStep,
                nextStep,
                prevStep,
                goToStep,
                isOpen,
                setIsOpen,
            }}
        >
            {children}
        </WizardContext.Provider>
    );
};

export const useWizard = () => {
    const context = useContext(WizardContext);
    if (!context) {
        throw new Error('useWizard must be used within a WizardProvider');
    }
    return context;
};

// --- COMPONENTS ---

const WizardContent = () => {
    const { currentStep, nextStep, prevStep, setIsOpen, characterData } = useWizard();

    const renderStep = () => {
        switch (currentStep) {
            case 1: return (<div><h3>Paso 1: Atributos Primarios</h3><p>Repartiremos 48 puntos entre los siete atributos.</p></div>);
            case 2: return (<div><h3>Paso 2: Elección de Facción</h3><p>Elige una de las cinco facciones disponibles.</p></div>);
            case 3: return (<div><h3>Paso 3: Especializaciones</h3><p>Distribuye 15 puntos en especializaciones.</p></div>);
            case 4: return (<div><h3>Paso 4: Ventajas y Desventajas</h3><p>Compensa ventajas con desventajas.</p></div>);
            case 5: return (<div><h3>Paso 5: Fractales</h3><p>Solo para mutantes.</p></div>);
            default: return null;
        }
    };

    return (
        <div className="wizard-overlay">
            <header className="wizard-header">
                <h2>Creación de Personaje</h2>
                <button className="wizard-close-btn" onClick={() => setIsOpen(false)}>Cerrar [ESC]</button>
            </header>
            <main className="wizard-content">
                <div className="step-indicator">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className={`step-dot ${currentStep === s ? 'active' : ''} ${currentStep > s ? 'completed' : ''}`} />
                    ))}
                </div>
                {renderStep()}
            </main>
            <footer className="wizard-footer">
                <button className="wizard-btn" onClick={prevStep} disabled={currentStep === 1}>Anterior</button>
                <div className="wizard-status font-mono text-xs opacity-60">PUNTOS: {characterData.pointsRemaining} | PASO {currentStep}/5</div>
                <button className="wizard-btn primary" onClick={nextStep} disabled={currentStep === 5}>
                    {currentStep === 5 ? 'Finalizar' : 'Siguiente'}
                </button>
            </footer>
        </div>
    );
};

const CharacterWizard = () => {
    const { isOpen, setIsOpen } = useWizard();

    useEffect(() => {
        if (isOpen) {
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === 'Escape') setIsOpen(false);
            };
            window.addEventListener('keydown', handleEsc);
            return () => window.removeEventListener('keydown', handleEsc);
        }
    }, [isOpen, setIsOpen]);

    if (!isOpen) return null;
    return <WizardContent />;
};

const WizardTrigger = () => {
    const { setIsOpen } = useWizard();

    return React.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' } },
        React.createElement(
            'button',
            {
                onClick: () => setIsOpen(true),
                className: 'wizard-btn primary',
                style: { fontSize: '1.2rem', padding: '1rem 3rem' }
            },
            'COMENZAR CREACIÓN DE EXPEDIENTE'
        )
    );
};

export const WizardContainer = () => {
    return React.createElement(
        WizardProvider,
        null,
        React.createElement(CharacterWizard, null),
        React.createElement(WizardTrigger, null)
    );
};

export default WizardContainer;
