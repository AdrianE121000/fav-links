import z from 'zod';

const linkSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  description: z.string(),
  user_id: z.number(),
});

export function validateLink(object) {
  return linkSchema.safeParse(object);
}

export function validatePartialLink(object) {
  return linkSchema.partial().safeParse(object);
}
