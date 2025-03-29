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
import { Link, useNavigate } from "react-router-dom"
import { z } from 'zod'
import { InputField } from "../forms/InputField"
import { Form } from "../ui/form"
import EmojiPickerField from "../forms/EmojiPickerField"
import { createUser } from "./_lib"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import AnimatedEmoji from "../AnimatedEmoji"

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();

    const registerSchema = z.object({
        email_address: z.string().email("Please enter a valid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        username: z.string().min(6, "Username must be at least 6 characters"),
        public_metadata: z.object({
            favoriteEmoji: z.string().min(1, "Please select a favorite emoji"),
        })
    })

    type RegisterSchema = z.infer<typeof registerSchema>

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email_address: '',
            password: '',
            username: '',
            public_metadata: {
                favoriteEmoji: ''
            }
        }
    })

    const registerMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            toast.success("Account created successfully!", {
                description: "You can now log in with your credentials.",
                duration: 5000
            });
            navigate("/login");
        },
        onError: (error: any) => {
            toast.error("Failed to create account", {
                description: error.message || "Please try again later.",
                duration: 5000
            });
        }
    });

    const onSubmit = (data: RegisterSchema) => {
        registerMutation.mutate(data);
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
                    <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
                    <CardDescription>
                        Enter information below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                {registerMutation.error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <span className="block sm:inline">{registerMutation.error.toString()}</span>
                                    </div>
                                )}

                                <InputField
                                    control={form.control}
                                    name="email_address"
                                    label="Email"
                                    className="rounded-full"
                                    placeholder='Please enter your email'
                                    InputProps={
                                        {
                                            disabled: registerMutation.isPending,
                                        }
                                    }
                                />
                                <InputField
                                    control={form.control}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    placeholder='Please enter your password'
                                    InputProps={
                                        {
                                            disabled: registerMutation.isPending,
                                        }
                                    }
                                />
                                <InputField
                                    control={form.control}
                                    name="username"
                                    label="Username"
                                    type="text"
                                    placeholder='Please enter your username'
                                    InputProps={
                                        {
                                            disabled: registerMutation.isPending,
                                        }
                                    }
                                />
                                <EmojiPickerField
                                    control={form.control}
                                    name="public_metadata.favoriteEmoji"
                                    label="Favorite Emoji"

                                />
                                <div className="flex flex-col gap-3">
                                    <Button
                                        type="submit"
                                        className="w-full text-white"
                                        variant={'gradient'}
                                        disabled={registerMutation.isPending}
                                    >
                                        {registerMutation.isPending ? "Creating Account..." : "Sign Up"}
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <Link to="/login" className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}