import { useMemo } from 'react';
import type { CharacterState, Attributes } from '../../data/wizardConfig';

const getAttributeCost = (value: number): number => {
    switch (value) {
        case 0: return 0;
        case 1: return 2;
        case 2: return 3;
        case 3: return 4;
        case 4: return 5;
        case 5: return 6;
        case 6: return 8;
        case 7: return 10;
        case 8: return 13;
        default: return 0;
    }
};

const getMutationCost = (value: number): number => {
    switch (value) {
        case 0: return 0;
        case 1: return 2;
        case 2: return 4;
        case 3: return 6;
        case 4: return 8;
        case 5: return 10;
        default: return 0;
    }
};

const getLethalityModifier = (fuerza: number): number => {
    if (fuerza === 0) return +9;
    if (fuerza === 1) return +8;
    if (fuerza === 2) return +7;
    if (fuerza === 3) return +6;
    if (fuerza >= 4 && fuerza <= 6) return +5;
    if (fuerza >= 7 && fuerza <= 8) return +4;
    // Expanded rules from table
    if (fuerza === 9) return +3;
    if (fuerza === 10) return +2;
    if (fuerza > 10) return +1;
    return 0;
};

export const useCharacterCalculations = (characterData: CharacterState) => {
    return useMemo(() => {
        const finalAttributes: Attributes = { ...characterData.attributes };

        // 1. Costs
        let totalAttributePointsSpent = 0;
        let mutationCost = 0;

        Object.entries(finalAttributes).forEach(([key, value]) => {
            if (key === 'mutacion') {
                mutationCost = getMutationCost(value as number);
            } else {
                totalAttributePointsSpent += getAttributeCost(value as number);
            }
        });

        // The text says "Dispondrás de 48 puntos de creación a gastar en los atributos primarios."
        // "El Atributo Mutación es una excepción ... su coste es diferente". Is Mutacion paid from the 48 points or separate?
        // Usually it shares the pool in point-buy systems unless specified otherwise. We'll pool them.
        const totalPointsSpent = totalAttributePointsSpent + mutationCost;
        const remainingAttributePoints = 48 - totalPointsSpent;

        // 2. Secondary Attributes Calculation
        const { fuerza, destreza, voluntad, percepcion, inteligencia, mutacion } = finalAttributes;

        // BioTolerancia (only for mutants)
        // Valor inicial igual al nivel de Mutación +1 por cada nivel por encima de 4 en Voluntad y Fuerza.
        const baseBioTolerancia = mutacion > 0 ? mutacion + Math.max(0, voluntad - 4) + Math.max(0, fuerza - 4) : 0;

        // Defensa: Valor inicial 0 + nivel de Esquiva.
        const baseDefensa = 0 + (characterData.specializations['Esquiva'] || 0);

        // Iniciativa: Percepción +1 por cada nivel por encima de 4 en Destreza e Inteligencia.
        const baseIniciativa = percepcion + Math.max(0, destreza - 4) + Math.max(0, inteligencia - 4);

        // Letalidad Modifier
        const modLetalidad = getLethalityModifier(fuerza);

        // Puntos de Orgullo: 3 +1 por cada nivel superior a 4 en todos los Atributos Primarios.
        const primaryAttrs = [fuerza, destreza, voluntad, percepcion, inteligencia, finalAttributes.carisma, mutacion];
        const extraOrgullo = primaryAttrs.reduce((acc, val) => acc + Math.max(0, val - 4), 0);
        const baseOrgullo = 3 + extraOrgullo;

        // Resistencia: Fuerza +1 por cada nivel por encima de 5 en Voluntad
        const baseResistencia = fuerza + Math.max(0, voluntad - 5);

        const secondaryAttributes = {
            bioTolerancia: baseBioTolerancia,
            defensa: baseDefensa,
            iniciativa: baseIniciativa,
            letalidad: modLetalidad,
            orgullo: baseOrgullo,
            resistencia: baseResistencia
        };

        // Specializations spent
        let totalSpecPointsSpent = 0;
        let currentLevel2Count = 0;

        Object.values(characterData.specializations).forEach(lvl => {
            if (lvl === 1) totalSpecPointsSpent += 1;
            else if (lvl === 2) {
                totalSpecPointsSpent += 3;
                currentLevel2Count += 1;
            }
        });

        const remainingSpecPoints = 15 - totalSpecPointsSpent;
        const maxLevel2Allowed = Math.floor(inteligencia / 3);

        // Advantages & Disadvantages
        let totalAdvantageLevels = 0;
        Object.values(characterData.advantages).forEach(lvl => totalAdvantageLevels += lvl);

        let totalDisadvantageLevels = 0;
        Object.values(characterData.disadvantages).forEach(lvl => totalDisadvantageLevels += lvl);

        const freeAdvantageLevels = 1;
        const requiredDisadvantageLevels = Math.max(0, totalAdvantageLevels - freeAdvantageLevels);
        const remainingDisadvantagesNeeded = Math.max(0, requiredDisadvantageLevels - totalDisadvantageLevels);

        const isAdvantagesValid = totalAdvantageLevels <= 3 && totalDisadvantageLevels >= requiredDisadvantageLevels;

        return {
            finalAttributes,
            secondaryAttributes,
            points: {
                attributes: {
                    spent: totalPointsSpent,
                    remaining: remainingAttributePoints,
                    max: 48,
                    isValid: remainingAttributePoints >= 0
                },
                specializations: {
                    spent: totalSpecPointsSpent,
                    remaining: remainingSpecPoints,
                    max: 15,
                    currentLevel2Count,
                    maxLevel2Allowed,
                    isValid: remainingSpecPoints >= 0 && currentLevel2Count <= maxLevel2Allowed
                },
                advantages: {
                    totalAdvantageLevels,
                    totalDisadvantageLevels,
                    requiredDisadvantageLevels,
                    remainingDisadvantagesNeeded,
                    max: 3,
                    isValid: isAdvantagesValid
                }
            }
        };
    }, [characterData]);
};
