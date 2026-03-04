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
        fuerza: 2,
        destreza: 2,
        carisma: 2,
        inteligencia: 2,
        percepcion: 2,
        voluntad: 2,
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
