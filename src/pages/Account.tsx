import Header from "@/components/Header";
import { Button } from "@/components/retroui/Button";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Loader } from "@/components/retroui/Loader";
import { Text } from "@/components/retroui/Text";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" }),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .optional()
    .or(z.literal("")),
});

export default function Profile() {
  const { appUser, updateAccount } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: appUser?.username,
      newPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmittingForm(true);
    setError("");

    try {
      await updateAccount(values.username, values.newPassword!).then();
      toast.success("Profile updated successfully", {
        richColors: true,
      });
    } catch (error) {
      setIsSubmittingForm(false);
      setError(`${error}`);
    } finally {
      setIsSubmittingForm(false);
      values.newPassword = "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 home-bg flex justify-center items-center">
        <div className="w-xl mx-4 border-4 bg-white p-8">
          <Text as="h3" className="text-center mb-8">
            My account
          </Text>
          {error && (
            <div className="mb-5 bg-red-300 rounded-md px-5 py-2 text-red-800 border-2 border-red-800 flex items-center gap-2">
              <span>
                <CircleAlert size={20} />
              </span>
              <p>{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="space-y-2 md:w-1/2">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  className="w-2/4"
                  {...register("username")}
                />
                {errors.username && (
                  <span className="text-red-600">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New password</Label>
                <div className="relative md:w-1/2">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    {...register("newPassword")}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.newPassword && (
                  <span className="mt-4 text-red-600 md:w-3/4">
                    {errors.newPassword.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <Button
                type="submit"
                className="w-1/3 md:w-1/4 flex items-center justify-center min-h-[40px]"
                disabled={isSubmittingForm}
              >
                {isSubmittingForm ? (
                  <div>
                    <Loader variant="secondary" size="sm" />
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
