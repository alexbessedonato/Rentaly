import { usePropertiesQuery } from "@/features/properties/hooks/usePropertiesQuery";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddTenantMutation } from "../hooks/queries";

export const AddTenantPage = () => {
  const addTenant = useAddTenantMutation();
  const navigate = useNavigate();
  const navigateToHome = () => navigate({ to: "/" });
  const { data: properties } = usePropertiesQuery();

  const form = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      property_id: "none",
    },
    onSubmit: async ({ value }) => {
      await addTenant.mutateAsync({
        full_name: value.full_name,
        email: value.email || null,
        phone: value.phone || null,
        property_id: value.property_id === "none" ? null : value.property_id,
      });
      navigateToHome();
    },
  });

  return (
    <Dialog open={true} onOpenChange={(open) => !open && navigateToHome()}>
      <DialogContent className="sm:max-w-sm backdrop-blur-md bg-white/90">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Add Tenant
          </DialogTitle>
          <DialogDescription className="text-center">
            Introduce los datos del nuevo inquilino.
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
          <form.Field name="full_name">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>Nombre</Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="nombre del inquilino"
                />
              </div>
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value.includes("@") ? "Email inválido" : undefined,
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

          <form.Field name="property_id">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>Propiedad (Opcional)</Label>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder="Selecciona una propiedad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sin propiedad</SelectItem>

                    {properties?.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.name}{" "}
                        {property.address ? `(${property.address})` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={form.state.isSubmitting || addTenant.isPending}
            >
              {form.state.isSubmitting || addTenant.isPending
                ? "Añadiendo..."
                : "Añadir Inquilino"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
