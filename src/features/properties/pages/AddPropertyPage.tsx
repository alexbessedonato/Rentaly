import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useManagersQuery } from "@/features/managers/hooks/queries";
import { useAddPropertyMutation } from "../hooks/queries";
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

export const AddPropertyPage = () => {
  const navigate = useNavigate();
  const navigateToHome = () => navigate({ to: "/" });
  const addProperty = useAddPropertyMutation();
  const { data: managers = [] } = useManagersQuery();

  const form = useForm({
    defaultValues: {
      name: "",
      rent: 0,
      mortgage: 0,
      address: "",
      insurance_file: null as File | null,
      contract_file: null as File | null,
      manager_id: "",
    },
    onSubmit: async ({ value }) => {
      await addProperty.mutateAsync({
        ...value,
        manager_id:
          !value.manager_id || value.manager_id === "none"
            ? null
            : value.manager_id,
      });
      navigateToHome();
    },
  });

  return (
    <Dialog open={true} onOpenChange={(open) => !open && navigateToHome()}>
      <DialogContent className="sm:max-w-sm backdrop-blur-md bg-white/90">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Add Property
          </DialogTitle>
          <DialogDescription className="text-center">
            Introduce los datos de la nueva propiedad.
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
              <div className="space-y-1">
                <Label htmlFor={field.name}>Nombre</Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="nombre de la propiedad"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="rent">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>rent</Label>
                <Input
                  id={field.name}
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  placeholder="renta"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="mortgage">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>mortgage</Label>
                <Input
                  id={field.name}
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  placeholder="hipoteca"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="insurance_file">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>
                  Póliza de seguro (PDF o Imagen)
                </Label>
                <Input
                  id={field.name}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.handleChange(file);
                  }}
                />
                {field.state.value instanceof File && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Seleccionado: {field.state.value.name}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="contract_file">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>
                  Contrato de alquiler (PDF o Imagen)
                </Label>
                <Input
                  id={field.name}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.handleChange(file);
                  }}
                />
                {field.state.value instanceof File && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Seleccionado: {field.state.value.name}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="manager_id">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>Manager (Opcional)</Label>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder="Selecciona un manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sin manager</SelectItem>

                    {managers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.id}>
                        {manager.name}{" "}
                        {manager.company ? `(${manager.company})` : ""}
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
              disabled={form.state.isSubmitting || addProperty.isPending}
            >
              {form.state.isSubmitting || addProperty.isPending
                ? "Añadiendo..."
                : "Añadir Propiedad"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
