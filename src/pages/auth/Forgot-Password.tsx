import { Input } from "@/components/retroui/Input";
import { Text } from "@/components/retroui/Text";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/retroui/Button";
import HeroText from "../../components/Hero-Text.component";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
});

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: unknown) => console.log(data);

  return (
    <div className="h-screen p-4">
      <div className="h-full max-w-5xl mx-auto flex flex-col justify-center">
        <Link to={"/home"}>
          <HeroText size="90px" />
        </Link>
        <div className="h-fit mx-auto max-w-md border-2 bg-card mt-6">
          <div className="grid grid-cols-1 bg-amber-300 p-6">
            <Text as="h3">Forgot password?</Text>
            <p className="font-sans text-sm">
              Enter your user account's email address and we will send you a
              password reset link.
            </p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div className="space-y-2 ">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    autoFocus
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-red-600">{errors.email.message}</span>
                  )}
                </div>
              </div>
              <div className="mt-8 space-y-6">
                <Button className="w-full flex items-center justify-center">
                  Reset password
                </Button>
                <div className="mt-6 text-center text-sm">
                  Remember your password?{" "}
                  <Link
                    to={`/sign-in`}
                    className="font-bold underline underline-offset-4"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
