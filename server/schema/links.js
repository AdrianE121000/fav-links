import z from 'zod';

const linkSchema = z.object({
  title: z
    .string()
    .max(150, 'The title cannot be longer that 150 characters')
    .regex(
      /^[a-zA-Z0-9_ .*]+$/,
      'The title field must only contain letters (uppercase, lowercase), numbers, underscore , points or asterisk'
    ),
  url: z.string().max(255, 'The url cannot be longer that 255 characters').url({
    message: 'Url field must be a valid url',
  }),
  description: z
    .string()
    .regex(
      /^[a-zA-Z0-9_ ,:.*]+$/,
      'The description field must only contain letters (uppercase, lowercase), numbers, underscore , points, comma, two-points or asterisk'
    ),
  user_id: z.number(),
});

export function validateLink(object) {
  return linkSchema.safeParse(object);
}

export function validatePartialLink(object) {
  return linkSchema.partial().safeParse(object);
}
