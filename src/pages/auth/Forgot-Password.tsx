import { Input } from "@/components/retroui/Input";
import { Text } from "@/components/retroui/Text";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/retroui/Button";
import HeroText from "../../components/Hero-Text.component";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { firebaseAuth } from "@/config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { Loader } from "@/components/retroui/Loader";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
});

export default function ForgotPassword() {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmittingForm(true);
    setError("");
    setSuccess(false);

    sendPasswordResetEmail(firebaseAuth, values.email)
      .then(() => {
        setIsSubmittingForm(false);
        setSuccess(true);
      })
      .catch((error) => {
        setIsSubmittingForm(false);
        setError(`${error}`);
      });
  };

  return (
    <div className="h-screen p-4 home-bg">
      <div className="h-full max-w-5xl mx-auto flex flex-col justify-center">
        <div className="h-fit mx-auto max-w-md border-4 bg-card mt-6">
          <div className="grid grid-cols-1 bg-amber-300 p-6">
            <div className="flex justify-center mb-4">
              <Link to={"/"} className="inline-block">
                <HeroText size="90px" />
              </Link>
            </div>
            <Text as="h3">Forgot password?</Text>
            <p className="font-sans text-sm">
              Enter your user account's email address and we will send you a
              password reset link.
            </p>
          </div>
          <div className="p-6">
            {error && (
              <div className="mb-5 bg-red-300 rounded-md px-5 py-2 text-red-800 border-2 border-red-800 flex items-center gap-2">
                <span>
                  <CircleAlert size={20} />
                </span>
                <p>{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-5 bg-green-200 rounded-md px-5 py-2 text-green-800 border-2 border-green-700 flex items-center gap-2">
                <span>
                  <CircleCheck size={20} />
                </span>
                <p>
                  Password reset link sent! Check your inbox or spam folder.
                </p>
              </div>
            )}
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
                <Button
                  className="w-full flex items-center justify-center mt-8 min-h-[40px]"
                  disabled={isSubmittingForm}
                >
                  {isSubmittingForm ? (
                    <div>
                      <Loader variant="secondary" size="sm" />
                    </div>
                  ) : (
                    "Reset password"
                  )}
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
