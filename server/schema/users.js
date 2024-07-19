import z from 'zod';

const userSchema = z.object({
  username: z
    .string()
    .min(4, 'Username must be at least 4 characters long')
    .max(16, 'Username cannot be longer that 16 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(256, 'Username cannot be longer that 256 characters'),
  fullname: z.string(),
});

export function validateUser(object) {
  return userSchema.safeParse(object);
}

export function validatePartialUser(object) {
  return userSchema.partial().safeParse(object);
}
