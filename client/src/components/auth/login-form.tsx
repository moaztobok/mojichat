import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useSignIn } from "@clerk/clerk-react"
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from 'zod'
import { InputField } from "../forms/InputField"
import { Form } from "../ui/form"
import AnimatedEmoji from "../AnimatedEmoji"
import { AuroraText } from "../magicui/aurora-text"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { signIn, isLoaded } = useSignIn();

  const loginSchema = z.object({
    email_address: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters")
  })

  type LoginSchema = z.infer<typeof loginSchema>

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email_address: '',
      password: ''
    }
  })

  const loginMutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      if (!isLoaded) throw new Error("Clerk not loaded");

      const result = await signIn.create({
        identifier: data.email_address,
        password: data.password,
      });

      return result;
    },
    onSuccess: (result) => {
      toast.success("Login successful",
        {
          className: "text-lg font-semibold",
          description: "Redirecting to dashboard...",
          duration: 5000,
          icon: "😊",
          position: 'top-center',
          classNames: {
            description: "ms-2 text-lg font-semibold text-muted-foreground",
            toast: "text-lg font-semibold text-muted-foreground",
            icon: "text-2xl",
          }
        }
      )
      if (result.status === "complete") {
        navigate("/dashboard");
      } else {
        console.log("Additional verification needed:", result);
      }
    },
    onError: (error: any) => {
      toast.error(loginMutation.error as string, {
        className: "text-lg font-semibold",
        description: "Please check your credentials and try again.",
        duration: 5000,
        icon: "😟",
        position: 'top-center',
        classNames: {
          description: "ms-2 text-lg font-semibold text-muted-foreground",
          toast: "text-lg font-semibold text-muted-foreground bg-red-500",
          icon: "text-2xl",
        }
      })
      console.error("Login error:", error);
      return error.errors?.[0]?.message || "Failed to sign in. Please check your credentials.";
    }
  });
  const googleMutation = useMutation({
    mutationFn: async () => {
      if (!isLoaded) throw new Error("Clerk not loaded");
      return await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard"
      });
    }
  });

  const onSubmit = (data: LoginSchema) => {
    loginMutation.mutate(data);
  }

  return (
    <div className={cn("flex flex-col gap-6 justify-center", className)} {...props}>
      <div className="flex items-center justify-center gap-2 text-primary font-bold text-3xl">
        MojiChat { }
        <AnimatedEmoji />
      </div>

      <p className="text-center text-sm text-muted-foreground font-semibold">
        Connect with friends using emojis! 🎉
      </p>
      <Card className="justify-center rounded-none md:rounded-2xl border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-4">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => googleMutation.mutate()}
              disabled={googleMutation.isPending || !isLoaded}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>

          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">


                <InputField
                  control={form.control}
                  name="email_address"
                  label="Email"
                  type="email"
                  className="rounded-full"
                  placeholder='Please enter your email'
                  InputProps={{
                    disabled: loginMutation.isPending,
                  }}
                />
                <InputField
                  control={form.control}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder='Please enter your password'
                  InputProps={{
                    disabled: loginMutation.isPending,
                  }}
                />
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full text-white"
                    variant={'gradient'}
                    disabled={loginMutation.isPending || !isLoaded}
                  >
                    {loginMutation.isPending ? <span className="text-xl animate-spin">
                      🌀
                    </span> : "Login"}
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}