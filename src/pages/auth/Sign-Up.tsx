import { Input } from "@/components/retroui/Input";
import { Text } from "@/components/retroui/Text";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/retroui/Button";
import { CircleAlert, Eye, EyeOff, Github, Mail } from "lucide-react";
import HeroText from "../../components/Hero-Text.component";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "@/components/retroui/Loader";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" }),
});

export default function SignUp() {
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmittingForm(true);
    setError("");

    try {
      await signUp(
        values.email,
        values.password,
        values.username.toLowerCase()
      );
      navigate("/home");
    } catch (error) {
      setIsSubmittingForm(false);
      setError(`${error}`);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <div className="h-screen p-4">
      <div className="h-full max-w-5xl mx-auto flex flex-col justify-center">
        <div className="flex justify-center">
          <Link to={"/"} className="inline-block">
            <HeroText size="90px" />
          </Link>
        </div>
        <div className="h-fit mx-auto md:w-2xl border-2 bg-card mt-6">
          <div className="grid grid-cols-1 bg-amber-300 p-6">
            <Text as="h3">Sign Up</Text>
            <p className="font-sans text-sm">
              New here? Enter your details to sign up.
            </p>
          </div>
          <div className="p-6">
            {error && (
              <div className="mb-5 bg-red-300 rounded-md px-5 py-2 text-red-800 border-2 border-red-800 flex items-center gap-2">
                <span>
                  <CircleAlert />
                </span>
                <p>{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                      autoFocus
                      {...register("email")}
                    />
                    {errors.email && (
                      <span className="mt-4 text-red-800">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="••••••"
                        {...register("password")}
                      />
                      <button
                        type="button"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="mt-4 text-red-600">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2 ">
                  <Label htmlFor="email">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    placeholder="username"
                    {...register("username")}
                  />
                  {errors.username && (
                    <span className="mt-4 text-red-600">
                      {errors.username.message}
                    </span>
                  )}
                </div>
              </div>
              <Button
                className="w-full flex items-center justify-center mt-8 min-h-[40px]"
                disabled={isSubmittingForm}
              >
                {isSubmittingForm ? (
                  <div>
                    <Loader variant="secondary" size="sm" />
                  </div>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
            <div className="mt-6 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="secondary"
                  className="w-full flex items-center justify-center"
                >
                  <Mail size={16} className="mr-2" />
                  Google
                </Button>
                <Button
                  variant="secondary"
                  className="w-full flex items-center justify-center"
                >
                  <Github size={16} className="mr-2" />
                  Github
                </Button>
              </div>
              <div className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link
                  to={"/sign-in"}
                  className="font-bold underline underline-offset-4"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
