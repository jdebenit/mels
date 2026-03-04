export interface FractalDef {
    id: string;
    name: string;
    description: string;
}

export const FRACTALS: Record<string, FractalDef> = {
    alpha: {
        id: 'alpha',
        name: 'Alpha',
        description: 'Refleja la conexión del mutante con la energía psíquica, permitiéndole manipularla.'
    },
    beta: {
        id: 'beta',
        name: 'Beta',
        description: 'Representa la conexión con el cuerpo y los objetos materiales.'
    },
    gamma: {
        id: 'gamma',
        name: 'Gamma',
        description: 'Refleja la capacidad del mutante de manipular y controlar la energía elemental.'
    },
    delta: {
        id: 'delta',
        name: 'Delta',
        description: 'Este fractal es la capacidad del mutante de convertir la bioenergía en una energía capaz de dañar tanto el mundo físico como psíquico.'
    },
    epsilon: {
        id: 'epsilon',
        name: 'Epsilon',
        description: 'Refleja la comprensión, control y manipulación del espacio y del tiempo.'
    }
};
