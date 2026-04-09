import { useForm } from "@tanstack/react-form"
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
import { useManagerActions } from "@/features/managers/hooks/useManagerActions"
import { Button } from "@/components/ui/button"

export const AddManager = () => {
    const { closeAddManagerModal, executeAddManager } = useManagerActions();

    const form = useForm({
        defaultValues: {
            name: "",
            company: "",
            email: "",
            phone: "",
        },
        onSubmit: async ({ value }) => {
            await executeAddManager(value);
            closeAddManagerModal();
        }
    });

    return (
        <Dialog open={true} onOpenChange={(open) => !open && closeAddManagerModal()}>
            <DialogContent className="sm:max-w-sm backdrop-blur-md bg-white/90">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Add Manager</DialogTitle>
                    <DialogDescription className="text-center">
                        Introduce los datos del nuevo manager.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }} className="flex flex-col gap-4">

                    <form.Field name="name">
                        {(field) => (
                            <div className="space-y-1">
                                <Label htmlFor={field.name}>Nombre</Label>
                                <Input
                                    id={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="nombre del manager"
                                />
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="company">
                        {(field) => (
                            <div className="space-y-1">
                                <Label htmlFor={field.name}>Empresa</Label>
                                <Input
                                    id={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="nombre de la empresa"
                                />
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="email" validators={{
                        onChange: ({ value }) =>
                            !value.includes('@') ? 'Email inválido' : undefined
                    }}>
                        {(field) => (
                            <div className="space-y-1">
                                <Label htmlFor={field.name}>Email</Label>
                                <Input
                                    id={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="correo electrónico"
                                />
                                {field.state.meta.errors && (
                                    <p className="text-xs text-red-500">{field.state.meta.errors}</p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="phone" validators={{
                        onChange: ({ value }) => {
                            if (!value) return undefined;
                            const isValid = /^\+?\d{9,15}$/.test(value);
                            return !isValid ? 'Teléfono inválido (ej: +34600123456 o 600123456)' : undefined;
                        }
                    }}>
                        {(field) => (
                            <div className="space-y-1">
                                <Label htmlFor={field.name}>Teléfono</Label>
                                <Input
                                    id={field.name}
                                    type="tel"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="número de teléfono"
                                />
                                {field.state.meta.errors && (
                                    <p className="text-xs text-red-500">{field.state.meta.errors}</p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full" disabled={form.state.isSubmitting}>
                            {form.state.isSubmitting ? "Añadiendo..." : "Añadir Manager"}
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    )
};