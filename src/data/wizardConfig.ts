export const STEPS = [
    { id: 'attributes', name: 'Atributos Primarios' },
    { id: 'faction', name: 'Elección de Facción' },
    { id: 'specializations', name: 'Especializaciones' },
    { id: 'advantages', name: 'Ventajas y Desventajas' },
    { id: 'fractals', name: 'Fractales' },
    { id: 'details', name: 'Detalles Personales' }
];

export const initialCharacterState = {
    name: "",
    concept: "",
    profession: "",
    rank: "",
    organization: "",
    attributes: {
        fuerza: 0,
        destreza: 0,
        carisma: 0,
        inteligencia: 0,
        percepcion: 0,
        voluntad: 0,
        mutacion: 0
    },
    derivedStats: {
        pointsRemaining: 48,
        factionPoints: 0,
        specPoints: 15,
        advPoints: 0,
        fractalPoints: 4
    },
    faction: null as string | null,
    specializations: {} as Record<string, number>,
    advantages: {} as Record<string, number>,
    disadvantages: {} as Record<string, number>,
    fractals: {
        principal: null as string | null,
        opuesto: null as string | null,
        levels: {} as Record<string, number>
    }
};
export type Attributes = typeof initialCharacterState.attributes;
export type CharacterState = typeof initialCharacterState;
