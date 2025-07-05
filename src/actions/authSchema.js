import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  // Add other signup fields here if your form expands (e.g., username, birthdate)
  // username: z.string().min(3, { message: "Username must be at least 3 characters." }),
});