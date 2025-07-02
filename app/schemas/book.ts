import { z } from "zod";

const bookActionBaseSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().min(10, "La descripción es obligatoria"),
  image: z.string().url("Debe ser una URL de imagen válida"),

  total_copies: z.coerce.number().int().min(1),
  available_copies: z.coerce.number().int().min(0),

  author_id: z.coerce.number().optional(),
  new_author_name: z.string().optional(),
  genre_id: z.coerce.number().optional(),
  new_genre_name: z.string().optional(),
});

export const createBookApiSchema = bookActionBaseSchema
  .refine((data) => data.author_id || data.new_author_name, {
    message: "Debes seleccionar un autor o ingresar uno nuevo.",
    path: ["author_id"],
  })
  .refine((data) => !(data.author_id && data.new_author_name), {
    message: "Elige un autor O crea uno nuevo, no ambos.",
    path: ["author_id"],
  })
  .refine((data) => data.genre_id || data.new_genre_name, {
    message: "Debes seleccionar un género o ingresar uno nuevo.",
    path: ["genre_id"],
  })
  .refine((data) => !(data.genre_id && data.new_genre_name), {
    message: "Elige un género O crea uno nuevo, no ambos.",
    path: ["genre_id"],
  });

export const updateBookApiSchema = bookActionBaseSchema
  .partial()
  .refine((data) => !(data.author_id && data.new_author_name), {
    message: "Si actualizas el autor, elige un ID O un nombre nuevo, no ambos.",
    path: ["author_id"],
  })
  .refine((data) => !(data.genre_id && data.new_genre_name), {
    message:
      "Si actualizas el género, elige un ID O un nombre nuevo, no ambos.",
    path: ["genre_id"],
  });

export type CreateBookApiPayload = z.infer<typeof createBookApiSchema>;
export type UpdateBookApiPayload = z.infer<typeof updateBookApiSchema>;
