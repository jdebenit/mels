import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Esquema unificado para todos los documentos MD de M.E.L.S.
const melsSchema = z.object({
    title: z.string(),
    categoria: z.string().optional(),
    tags: z.array(z.string()).optional(),
    clasificacion: z.string().optional(),
});

// Definir las colecciones utilizando Loader Glob para Astro v5
const recursos = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/recursos" }),
    schema: melsSchema
});

const universo = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/universo" }),
    schema: melsSchema
});

const historia = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/historia" }),
    schema: melsSchema
});

const facciones = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/facciones" }),
    schema: melsSchema
});

const operaciones = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/operaciones" }),
    schema: melsSchema
});

const sistema = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/sistema" }),
    schema: melsSchema
});

export const collections = {
    recursos,
    universo,
    historia,
    facciones,
    operaciones,
    sistema
};
