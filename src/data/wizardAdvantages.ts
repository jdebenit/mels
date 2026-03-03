export interface Trait {
    id: string;
    name: string;
    description: string;
    maxLevel: number;
}

export const ADVANTAGES: Trait[] = [
    { id: 'ambidextro', name: 'Ambidextro', description: 'No sufres dificultad por utilizar la mano mala.', maxLevel: 1 },
    { id: 'amigo_invisible', name: 'Amigo invisible', description: 'Un benefactor desconocido acude en tu ayuda.', maxLevel: 3 },
    { id: 'amistad_animal', name: 'Amistad animal', description: 'Los animales se sienten cómodos. +1 por punto a tiradas.', maxLevel: 3 },
    { id: 'atributo_extraordinario', name: 'Atributo Extraordinario', description: 'Desarrollo superior a lo normal, +1 en acciones de un atributo.', maxLevel: 3 },
    { id: 'belleza', name: 'Belleza', description: 'Atrae la atención, +1 por punto a Seducción y primera impresión.', maxLevel: 3 },
    { id: 'conduccion_defensiva', name: 'Conducción defensiva', description: '+1 a maniobras defensivas conduciendo.', maxLevel: 3 },
    { id: 'callejero', name: 'Callejero', description: 'Beneficios (+1 por punto) en Supervivencia Urbana y Callejeo.', maxLevel: 3 },
    { id: 'conduccion_ofensiva', name: 'Conducción ofensiva', description: '+1 a maniobras ofensivas conduciendo.', maxLevel: 3 },
    { id: 'calmado', name: 'Calmado', description: 'Beneficios en Combate (Frialdad). +1 por punto.', maxLevel: 3 },
    { id: 'camaleon_social', name: 'Camaleón social', description: 'Pasar desapercibido en sociedad. +1 por punto en Etiqueta y Vida Social.', maxLevel: 3 },
    { id: 'contacto', name: 'Contacto', description: 'Aliados de conveniencia. Activación única por capítulo.', maxLevel: 3 },
    { id: 'corpulento', name: 'Corpulento', description: 'Incrementa Resistencia el doble de lo invertido.', maxLevel: 3 },
    { id: 'curacion_rapida', name: 'Curación rápida', description: 'Recuperación acelerada ignorando efectos de rangos peores de daño.', maxLevel: 1 },
    { id: 'entrenamiento_antimutante', name: 'Entrenamiento antimutante', description: 'Ignoras poder mutante potenciado gastando orgullo igual al nivel.', maxLevel: 3 },
    { id: 'entrenamiento_combate', name: 'Entrenamiento de combate', description: '-1 letalidad C/C, puedes enfrentar a Especialización+1 enemigos.', maxLevel: 1 },
    { id: 'entrenamiento_combate_avanzado', name: 'Entrenamiento de combate avanzado', description: '+1 Iniciativa, reduce letalidad y no sufres penalización por múltiples.', maxLevel: 1 },
    { id: 'favores', name: 'Favores', description: 'Devolución de favores de gente influyente.', maxLevel: 3 },
    { id: 'felino', name: 'Felino', description: '+1 por punto en acciones de Atletismo.', maxLevel: 3 },
    { id: 'genio', name: 'Genio', description: 'Tirada de Cultura Difícil sin desventaja. Multiplicador de nivel 2 y 3 modificados.', maxLevel: 3 },
    { id: 'inquietante', name: 'Inquietante', description: 'Formidable para intimidar y sobornar. +1 por punto.', maxLevel: 3 },
    { id: 'hombre_gris', name: 'Hombre gris', description: 'Pasar desapercibido en infiltración y camuflaje. +1 por punto.', maxLevel: 3 },
    { id: 'juerguista', name: 'Juerguista', description: 'Resistir cansancio o alcohol. +1 por punto a resistir.', maxLevel: 3 },
    { id: 'memoria_eidetica', name: 'Memoria eidética', description: 'Recuerdas todo lo que ves, de forma consciente o inconsciente.', maxLevel: 1 },
    { id: 'punos_de_acero', name: 'Puños de acero', description: 'Reduce la letalidad de tus golpes desarmados en 1.', maxLevel: 1 },
    { id: 'reflejos_rapidos', name: 'Reflejos rápidos', description: '+2 a iniciativa, +1 a Defensa y reacción.', maxLevel: 1 },
    { id: 'reputacion', name: 'Reputación', description: '+1 por punto cuando tu palabra es importante.', maxLevel: 3 },
    { id: 'resistencia_bioenergetica', name: 'Resistencia bioenergética', description: 'Aumenta tu BioTolerancia tantos puntos como inviertas.', maxLevel: 3 },
    { id: 'sexto_sentido', name: 'Sexto sentido', description: 'Presientes el peligro de forma sobrenatural.', maxLevel: 1 },
    { id: 'suerte', name: 'Suerte', description: 'Repetir tiradas por capítulo tantas veces como puntos invertidos.', maxLevel: 3 },

    // Additional perks seen on Faction lists but not explicitly described above:
    { id: 'dotado', name: 'Dotado', description: 'Ventaja innata de Agente Libre.', maxLevel: 1 },
    { id: 'antiguo_aliado', name: 'Antiguo aliado', description: 'Aliado del pasado a tu disposición.', maxLevel: 3 },
    { id: 'inmunidad', name: 'Inmunidad', description: 'Cobertura legal o de agencia protectora.', maxLevel: 3 },
    { id: 'encanto', name: 'Encanto', description: 'Facilidad de trato.', maxLevel: 3 },
    { id: 'rango', name: 'Rango', description: 'Posición jerárquica.', maxLevel: 3 },
    { id: 'apoyo_tactico', name: 'Apoyo táctico', description: 'Recursos desplegables.', maxLevel: 3 },
    { id: 'liderazgo', name: 'Liderazgo', description: 'Capacidad de comandar operativos bajos tu mando.', maxLevel: 3 },
    { id: 'linguista', name: 'Lingüista', description: 'Hablas multitud de idiomas.', maxLevel: 3 },
    { id: 'recursos', name: 'Recursos', description: 'Fondos monetarios amplios.', maxLevel: 3 },
    { id: 'ventaja_tactica', name: 'Ventaja táctica', description: 'Beneficio de inteligencia militar.', maxLevel: 3 },
    { id: 'supervivencia_perk', name: 'Supervivencia (Ventaja)', description: 'Veterano superviviente.', maxLevel: 3 }
];

export const DISADVANTAGES: Trait[] = [
    { id: 'adiccion', name: 'Adicción', description: 'Dependencia a sustancia. Mono incrementa dificultad.', maxLevel: 3 },
    { id: 'amnesia', name: 'Amnesia', description: 'Parte de tu vida es una incógnita. AJ añade desventajas ocultas.', maxLevel: 3 },
    { id: 'antipatia_animal', name: 'Antipatía animal', description: 'Los animales se sienten amenazados y atacarán si pueden. -1 por punto.', maxLevel: 3 },
    { id: 'atributo_debil', name: 'Atributo débil', description: 'Tara que disminuye efectividad. -1 en acciones del atributo.', maxLevel: 1 },
    { id: 'cobardia', name: 'Cobardía', description: 'El peligro crea estrés. Tirada de Voluntad o -1/incremento de dificultad.', maxLevel: 3 },
    { id: 'codicia', name: 'Codicia', description: 'Interés por recompensas jugosas. Tirada de Voluntad requerida.', maxLevel: 3 },
    { id: 'codigo', name: 'Código', description: 'Regido por un fuerte código ético, moral o religioso.', maxLevel: 3 },
    { id: 'curiosidad', name: 'Curiosidad', description: 'Tratas de descubrir secretos a toda costa. Modificador negativo si no puedes.', maxLevel: 3 },
    { id: 'deuda', name: 'Deuda', description: 'Favores debidos. Pueden suponer retrasos o peligro para la vida.', maxLevel: 3 },
    { id: 'doble', name: 'Doble', description: 'Alguien se parece a ti y te causa problemas operativos.', maxLevel: 3 },
    { id: 'fantasma', name: 'Fantasma', description: 'Exageras logros. Penalizadores al interactuar al ser descubierto.', maxLevel: 3 },
    { id: 'enemigo', name: 'Enemigo', description: 'Alguien te guarda rencor y tratará de perjudicarte activamente.', maxLevel: 3 },
    { id: 'fealdad', name: 'Fealdad', description: 'Penalizador igual a puntos en Influecia por ser muy poco agraciado.', maxLevel: 3 },
    { id: 'fobia', name: 'Fobia', description: 'Miedo irracional. Penalizador igual a puntos obtenidos en presencia.', maxLevel: 3 },
    { id: 'mala_reputacion', name: 'Mala reputación', description: 'Reputación que marca interacciones negativamente.', maxLevel: 3 },
    { id: 'mala_suerte', name: 'Mala suerte', description: 'El AJ puede obligarte a repetir tiradas quedándose con el peor resultado.', maxLevel: 3 },
    { id: 'marca_distintiva', name: 'Marca distintiva', description: 'Dejas un rastro evidente tras cometer actos delictivos o encargos.', maxLevel: 3 },
    { id: 'marioneta', name: 'Marioneta', description: 'Alguien controla tu vida (chantaje, fanatismo).', maxLevel: 3 },
    { id: 'pesadilla', name: 'Pesadillas', description: 'Pasado atormentado. Si fallas Voluntad diaria sufres -1 a todo.', maxLevel: 1 },
    { id: 'sueno_profundo', name: 'Sueño profundo', description: 'Marmota. -2 al intento de ser despertado.', maxLevel: 2 },

    // Additional flaws seen on Faction lists but not explicitly described:
    { id: 'protegidos', name: 'Protegidos', description: 'Personas inocentes a las que debes cuidar.', maxLevel: 3 },
    { id: 'deber', name: 'Deber', description: 'Obligaciones ineludibles para con tu facción.', maxLevel: 3 },
    { id: 'animosidad_mutantes', name: 'Animosidad (mutantes)', description: 'Odio mutuo con raza mutante.', maxLevel: 3 },
    { id: 'animosidad_prometheus', name: 'Animosidad (Prometheus)', description: 'Odio mutuo con agentes Prometheus.', maxLevel: 3 },
    { id: 'animosidad_servicio_m', name: 'Animosidad (Servicio M)', description: 'Odio mutuo con el Servicio M.', maxLevel: 3 },
    { id: 'sadismo', name: 'Sadismo', description: 'Disfrute del sufrimiento ajeno.', maxLevel: 3 },
    { id: 'trauma', name: 'Trauma', description: 'Trastorno por estrés post-traumático severo.', maxLevel: 3 },
    { id: 'fanatismo', name: 'Fanatismo', description: 'Ceguera ideológica absoluta.', maxLevel: 3 }
];
