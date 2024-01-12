import * as z from "zod";

export const SignUpValidationSchema = z.object({
    name: z.string().min(1),
    username: z.string().min(2, {message: 'Слишком короткий логин'}),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Слишком короткий пароль'})
  });