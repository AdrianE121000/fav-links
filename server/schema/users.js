import z from 'zod';

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  fullname: z.string(),
});

export function validateUser(object) {
  return userSchema.safeParse(object);
}

export function validatePartialUser(object) {
  return userSchema.partial().safeParse(object);
}
