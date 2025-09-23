import { Input } from "@/components/retroui/Input";
import { Text } from "@/components/retroui/Text";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/retroui/Button";
import { Eye, EyeOff, Github, Mail } from "lucide-react";
import HeroText from "./../../components/Hero-Text.component";
import { useState } from "react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen p-4">
      <div className="h-full max-w-5xl mx-auto flex flex-col justify-center">
        <a href="/">
          <HeroText size="90px" />
        </a>
        <div className="h-fit mx-auto max-w-md border-2 bg-card mt-6">
          <div className="grid grid-cols-1 bg-amber-300 p-6">
            <Text as="h3">Sign In</Text>
            <p className="font-sans text-sm">
              Welcome back! Enter your details to access your account.
            </p>
          </div>
          <div className="p-6">
            <form action="">
              <div className="space-y-6">
                <div className="space-y-2 ">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    autoFocus
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href=""
                      className="text-sm font-sans underline underline-offset-4"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-8 space-y-6">
                <Button className="w-full flex items-center justify-center">
                  Sign In
                </Button>
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
                  Don&apos;t have an account?{" "}
                  <a
                    href="/sign-up"
                    className="font-bold underline underline-offset-4"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
