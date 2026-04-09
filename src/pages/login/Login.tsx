import { useForm } from "@tanstack/react-form"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthNavigation } from "@/features/auth/hooks/useAuthNavigation"
import { loginAction } from "@/features/auth/actions/authActions"

export function Login() {
    const { navigateToHome } = useAuthNavigation();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            await loginAction(value);
            navigateToHome();
        },
    })

    return (
        <Dialog open={true} onOpenChange={(open) => !open && navigateToHome()}>
            <DialogContent className="sm:max-w-sm backdrop-blur-md bg-white/90">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Login</DialogTitle>
                    <DialogDescription className="text-center">
                        Introduce tus datos para entrar.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                    className="space-y-4 pt-4"
                >
                    <form.Field
                        name="email"
                        validators={{
                            onChange: ({ value }) =>
                                !value.includes('@') ? 'Email inválido' : undefined
                        }}
                        children={(field) => (
                            <div className="space-y-1">
                                <Label htmlFor={field.name}>Email</Label>
                                <Input
                                    id={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="ejemplo@correo.com"
                                />
                                {field.state.meta.errors && (
                                    <p className="text-xs text-red-500">{field.state.meta.errors}</p>
                                )}
                            </div>
                        )}
                    />

                    <form.Field
                        name="password"
                        validators={{
                            onChange: ({ value }) => value.length < 6 ? 'Mínimo 6 caracteres' : undefined
                        }}
                        children={(field) => (
                            <div className="space-y-1">
                                <Label htmlFor={field.name}>Contraseña</Label>
                                <Input
                                    id={field.name}
                                    type="password"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.errors && (
                                    <p className="text-xs text-red-500">{field.state.meta.errors}</p>
                                )}
                            </div>
                        )}
                    />

                    <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full" disabled={form.state.isSubmitting}>
                            {form.state.isSubmitting ? "Entrando..." : "Iniciar Sesión"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}