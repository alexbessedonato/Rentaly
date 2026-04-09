import { useQuery } from '@tanstack/react-query';
import { getProperties } from '../api/propertiesService';
import { useNavigate } from '@tanstack/react-router';
import { addProperty } from '../api/propertiesService';
import type { AddPropertyFormValues } from '../types';
import { toast } from 'sonner';


export const usePropertiesActions = () => {
  const navigate = useNavigate();

  const closeAddPropertyModal = () => navigate({ to: "/" });
  const goToAddProperty = () => navigate({ to: "/add-property" });
  
  
  const executeAddProperty = async (property: AddPropertyFormValues) => {
    try {
      await addProperty(property);
    } catch (error: any) {
      toast.error("Error al agregar propiedad", { description: error.message });
      throw error;
    }
    toast.success("Propiedad añadida con éxito");
  };

  const useProperties = () => {
    return useQuery({
      queryKey: ['properties'], 
      queryFn: getProperties,
    });
  }

  return { useProperties, executeAddProperty, closeAddPropertyModal, goToAddProperty };
};