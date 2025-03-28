import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z, } from 'zod'
import { InputField } from "../forms/InputField"
import { Form } from "../ui/form"
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const loginSchema = z.object({
    email_address: z.string().email(),
    password: z.string().min(6)
  })
  type LoginSchema = z.infer<typeof loginSchema>
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email_address: '',
      password: ''
    }
  })
  const onSubmit = (data: LoginSchema) => {
    console.log(data)
  }
  return (
    <div className={cn("flex flex-col gap-6 justify-center", className)} {...props}>
      <h1 className="text-3xl font-bold text-center text-primary ">
        MojiChat      </h1>
      <p className="text-center text-sm text-muted-foreground font-semibold">
        Connect with friends using emojis! 🎉
      </p>
      <Card className="justify-center  rounded-none md:rounded-2xl border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                />
                <InputField
                  control={form.control}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder='Please enter your password'
                />
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full text-white" variant={'gradient'}>
                    Login
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
