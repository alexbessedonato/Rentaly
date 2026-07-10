import { useState } from "react";
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
import { GenericAlertDialog } from "@/components/layout/GenericAlertDialog";
import { editManagerRoute } from "@/routes/router";
import {
  useDeleteManagerMutation,
  useEditManagerMutation,
  useManagersQuery,
} from "../hooks/queries";

export const EditManagerPage = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const navigate = useNavigate();
  const navigateToHome = () => navigate({ to: "/" });
  const { managerId } = editManagerRoute.useParams();
  const { data: managers = [] } = useManagersQuery();
  const manager = managers.find((m) => m.id === managerId);
  const editManager = useEditManagerMutation();
  const deleteManager = useDeleteManagerMutation();

  const form = useForm({
    defaultValues: {
      name: manager?.name || "",
      company: manager?.company || "",
      email: manager?.email || "",
      phone: manager?.phone || "",
    },
    onSubmit: async ({ value }) => {
      if (!manager) return;

      await editManager.mutateAsync({
        id: managerId,
        name: value.name,
        company: value.company || null,
        email: value.email || null,
        phone: value.phone || null,
      });
      navigateToHome();
    },
  });

  return (
    <>
      <Dialog open={true} onOpenChange={(open) => !open && navigateToHome()}>
        <DialogContent className="sm:max-w-sm backdrop-blur-md bg-white/90">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Edit Manager
            </DialogTitle>
            <DialogDescription className="text-center">
              Introduce los datos del manager a editar.
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
                  value && !value.includes("@") ? "Email inválido" : undefined,
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
                disabled={form.state.isSubmitting || editManager.isPending}
              >
                {form.state.isSubmitting || editManager.isPending
                  ? "Guardando..."
                  : "Guardar cambios"}
              </Button>
            </DialogFooter>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={() => setShowDeleteDialog(true)}
                disabled={editManager.isPending}
              >
                Eliminar Manager
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <GenericAlertDialog
        open={showDeleteDialog}
        onOpenChange={(open) => {
          if (!deleteManager.isPending) setShowDeleteDialog(open);
        }}
        isPending={deleteManager.isPending}
        title="Eliminar Manager"
        description={`¿Estás seguro de querer eliminar a "${manager?.name}"? Las propiedades asignadas quedarán sin manager.`}
        onConfirm={async () => {
          await deleteManager.mutateAsync(managerId);
          navigateToHome();
        }}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
};
