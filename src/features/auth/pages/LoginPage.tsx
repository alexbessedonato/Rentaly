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
import { useLoginMutation } from "../hooks/mutations";

export function LoginPage() {
  const navigate = useNavigate();
  const navigateToHome = () => navigate({ to: "/" });
  const login = useLoginMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await login.mutateAsync(value);
      navigateToHome();
    },
  });

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
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 pt-4"
        >
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
                  placeholder="ejemplo@correo.com"
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

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={form.state.isSubmitting || login.isPending}
            >
              {form.state.isSubmitting || login.isPending
                ? "Entrando..."
                : "Iniciar Sesión"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
