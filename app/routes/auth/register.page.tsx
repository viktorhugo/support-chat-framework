
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import placeholder from '~/assets/placeholder.svg'
import { Link } from "react-router";
import { Label } from "~/components/ui/label";

const RegisterPage = () => {
    return (
        <div className={'flex flex-col gap-6'}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                <form className="p-6 md:p-8">
                    <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Welcome</h1>
                        <p className="text-balance text-muted-foreground">Register account</p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Username</Label>
                        <Input id="username" type="text" placeholder="Jhon doe" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                            Forgot your password?
                        </a>
                        </div>
                        <Input id="password" type="password" required placeholder="••••••••" />
                    </div>
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>

                    <div className="text-center text-sm">
                        Already have an account? {' '}
                        <Link to="/auth/login" className="underline underline-offset-4">
                            Login
                        </Link>
                    </div>
                    </div>
                </form>
                <div className="relative hidden bg-muted md:block">
                    <img
                    src={placeholder}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
    </div>
    )
}

export default RegisterPage;


