import z from 'zod';

const groupSchema = z.object({
  name: z
    .string()
    .max(150, 'The group name cannot be longer that 150 characters')
    .regex(
      /^[a-zA-Z0-9_ .*]+$/,
      'The name field must only contain letters (uppercase, lowercase), numbers, underscore , points or asterisk'
    ),
});

export function validateGroup(object) {
  return groupSchema.safeParse(object);
}
