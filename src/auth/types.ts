import { z } from "zod";

export const signupBodySchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  username: z.string().min(1),
});

export type SignupBody = z.infer<typeof signupBodySchema>;

export const signinBodySchema = z.object({
  emailOrUsername: z.string().min(1),
  password: z.string().min(1),
});

export type SigninBody = z.infer<typeof signinBodySchema>;
