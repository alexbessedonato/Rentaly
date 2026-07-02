import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useAddManagerMutation } from "../hooks/queries";

export const AddManagerPage = () => {
  const navigate = useNavigate();
  const navigateToHome = () => navigate({ to: "/" });
  const addManager = useAddManagerMutation();

  const form = useForm({
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
    },
    onSubmit: async ({ value }) => {
      await addManager.mutateAsync(value);
      navigateToHome();
    },
  });

  return (
    <Dialog open={true} onOpenChange={(open) => !open && navigateToHome()}>
      <DialogContent className="sm:max-w-sm backdrop-blur-md bg-white/90">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Add Manager
          </DialogTitle>
          <DialogDescription className="text-center">
            Introduce los datos del nuevo manager.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="nombre del manager"
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="company">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Empresa</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="nombre de la empresa"
                />
              </Field>
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value.includes("@") ? "Email inválido" : undefined,
            }}
          >
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="correo electrónico"
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          </form.Field>

          <form.Field
            name="phone"
            validators={{
              onChange: ({ value }) => {
                if (!value) return undefined;
                const isValid = /^\+?\d{9,15}$/.test(value);
                return !isValid
                  ? "Teléfono inválido (ej: +34600123456 o 600123456)"
                  : undefined;
              },
            }}
          >
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Teléfono</FieldLabel>
                <Input
                  id={field.name}
                  type="tel"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="número de teléfono"
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          </form.Field>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={form.state.isSubmitting || addManager.isPending}
            >
              {form.state.isSubmitting || addManager.isPending
                ? "Añadiendo..."
                : "Añadir Manager"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
