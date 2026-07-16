import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
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
import { useDismissDialog } from "@/hooks/useDismissDialog";
import { useSignUpMutation } from "../hooks/mutations";

export function SignUpPage() {
  const navigate = useNavigate();
  const dismissDialog = useDismissDialog("/");
  const navigateToDashboard = () => navigate({ to: "/dashboard", replace: true });
  const signUp = useSignUpMutation();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      await signUp.mutateAsync(value);
      navigateToDashboard();
    },
  });

  return (
    <Dialog open={true} onOpenChange={(open) => !open && dismissDialog()}>
      <DialogContent className="sm:max-w-sm backdrop-blur-md bg-white/90">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Crear Cuenta
          </DialogTitle>
          <DialogDescription className="text-center">
            Únete para empezar a gestionar tus propiedades.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 pt-2"
        >
          <form.Field
            name="fullName"
            validators={{
              onChange: ({ value }) =>
                !value ? "El nombre es obligatorio" : undefined,
            }}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Nombre Completo</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Juan Pérez"
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value.includes("@") ? "Email inválido" : undefined,
            }}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="tu@email.com"
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                value.length < 6 ? "Mínimo 6 caracteres" : undefined,
            }}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                <Input
                  id={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <form.Field
            name="confirmPassword"
            validators={{
              onChange: ({ value, fieldApi }) => {
                if (value !== fieldApi.form.getFieldValue("password")) {
                  return "Las contraseñas no coinciden";
                }
                return undefined;
              },
            }}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Confirmar Contraseña</FieldLabel>
                <Input
                  id={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={form.state.isSubmitting || signUp.isPending}
            >
              {form.state.isSubmitting || signUp.isPending
                ? "Creando cuenta..."
                : "Registrarse"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
