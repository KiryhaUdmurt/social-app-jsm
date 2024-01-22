import * as z from "zod";

export const SignUpValidationSchema = z.object({
    name: z.string().min(1, {message: 'Введите имя'}),
    username: z.string().min(2, {message: 'Слишком короткий логин'}),
    email: z.string().email({message: 'Некорректный e-mail'}),
    password: z.string().min(8, {message: 'Слишком короткий пароль'})
  });

  export const SignInValidationSchema = z.object({
    email: z.string().email({message: 'Некорректный e-mail'}),
    password: z.string().min(8, {message: 'Слишком короткий пароль'})
  });

  export const PostValidationSchema = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(2200),
    tags: z.string()
  });

  export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Имя должно содержать хотя бы 2 буквы" }),
  username: z.string().min(2, { message: "Логин должно содержать хотя бы 2 буквы" }),
  email: z.string().email(),
  bio: z.string(),
});