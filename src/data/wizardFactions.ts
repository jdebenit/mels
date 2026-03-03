export const FACTIONS = [
    {
        id: 'agente_libre',
        name: 'Agente Libre',
        description: 'Mercenarios, freelancers o supervivientes que operan fuera de las estructuras de poder tradicionales.',
        ventajas: [
            'Callejero', 'Dotado', 'Antiguo aliado', 'Inmunidad',
            'Entrenamiento antimutante', 'Entrenamiento de combate',
            'Contactos', 'Encanto', 'Reputación'
        ],
        desventajas: [
            'Reputación', 'Enemigo', 'Marca distintiva', 'Marioneta', 'Protegidos'
        ]
    },
    {
        id: 'servicio_m',
        name: 'Agente de Servicio M',
        description: 'Operativos integrados en la estructura oficial de control de mutantes.',
        ventajas: [
            'Entrenamiento de combate', 'Entrenamiento de combate avanzado',
            'Entrenamiento antimutante', 'Inmunidad', 'Rango',
            'Hombre gris', 'Apoyo táctico', 'Liderazgo', 'Lingüista'
        ],
        desventajas: [
            'Deber', 'Animosidad (mutantes)', 'Animosidad (Prometheus)',
            'Pesadillas', 'Sadismo'
        ]
    },
    {
        id: 'prometheus',
        name: 'Agente de Prometheus',
        description: 'Miembros de la corporación secreta con oscuros objetivos.',
        ventajas: [
            'Entrenamiento de combate', 'Entrenamiento de combate avanzado',
            'Entrenamiento antimutante', 'Inmunidad', 'Rango',
            'Antiguo aliado', 'Apoyo táctico', 'Recursos', 'Liderazgo', 'Lingüista'
        ],
        desventajas: [
            'Deber', 'Animosidad (Servicio M)', 'Protegidos', 'Pesadillas', 'Trauma'
        ]
    },
    {
        id: 'especialista_militar_inteligencia',
        name: 'Especialista Militar (Inteligencia)',
        description: 'Fuerzas armadas especializadas en recolección de información y espionaje.',
        ventajas: [
            'Entrenamiento de combate', 'Entrenamiento de combate avanzado',
            'Entrenamiento anti-mutante', 'Rango', 'Ventaja táctica',
            'Liderazgo', 'Supervivencia'
        ],
        desventajas: [
            'Deber', 'Enemigo', 'Fanatismo', 'Animosidad (Servicio M)',
            'Código', 'Pesadillas', 'Trauma'
        ]
    },
    {
        id: 'especialista_militar_ejercito',
        name: 'Especialista Militar (Ejército)',
        description: 'Fuerzas armadas especializadas en despliegue de campo táctico.',
        ventajas: [
            'Entrenamiento de combate', 'Entrenamiento de combate avanzado',
            'Entrenamiento anti-mutante', 'Rango', 'Ventaja táctica',
            'Liderazgo', 'Supervivencia'
        ],
        desventajas: [
            'Deber', 'Enemigo', 'Fanatismo', 'Animosidad (Servicio M)',
            'Código', 'Pesadillas', 'Trauma'
        ]
    }
];
