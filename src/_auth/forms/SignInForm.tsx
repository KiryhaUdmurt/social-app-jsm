import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInValidationSchema } from "@/lib/validation";
import { z } from "zod";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useSignInAccountMutation,
} from "@/lib/tan-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignInForm = () => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount } =
    useSignInAccountMutation();

  const form = useForm<z.infer<typeof SignInValidationSchema>>({
    resolver: zodResolver(SignInValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInValidationSchema>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title: "Ошибка при регистрации. Попробуйте ещё раз.",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      return toast({
        title: "Ошибка при регистрации. Попробуйте ещё раз.",
      });
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Войти в аккаунт
        </h2>
        <p className="text-light-3 small-medium md:base-regular">
          Введите свои данные чтобы войти в Snapgram
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Загрузка...
              </div>
            ) : (
              "Создать аккаунт"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Еще нет профиля?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-2"
            >
              Создать
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
