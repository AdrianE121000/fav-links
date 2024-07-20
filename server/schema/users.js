import z from 'zod';

const userSchema = z.object({
  username: z
    .string()
    .min(4, 'The username must be at least 4 characters long')
    .max(16, 'The username cannot be longer that 16 characters')
    .regex(
      /^[a-zA-Z0-9_.*]+$/,
      'The username must only contain letters (uppercase, lowercase), numbers, _ , . o *'
    ),
  password: z
    .string()
    .min(8, 'The password must be at least 8 characters long')
    .max(256, 'The password cannot be longer that 256 characters')
    .regex(
      /^[a-zA-Z0-9_.*]+$/,
      'The password must only contain letters (uppercase,lowercase), numbers, _ , . o *'
    )
    .regex(
      /^(?=.*[._*])/,
      'The password must have at least 1 point, undercore or asterisk'
    ),
  fullname: z
    .string()
    .min(4, 'The full name must be at least 4 characters long')
    .max(256, 'The full name cannot be longer that 256 characters')
    .regex(/^[a-zA-Z ]+$/, 'The full name must only contain letters'),
});

export function validateUser(object) {
  return userSchema.safeParse(object);
}

export function validatePartialUser(object) {
  return userSchema.partial().safeParse(object);
}
