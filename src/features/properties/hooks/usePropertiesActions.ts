import { useQuery } from '@tanstack/react-query';
import { getProperties } from '../api/propertiesService';
import { useNavigate } from '@tanstack/react-router';
import { addProperty } from '../api/propertiesService';
import type { Property } from '../types';
import { toast } from 'sonner';


export const usePropertiesActions = () => {
  const navigate = useNavigate();

  // --- NAVEGACIÓN (Ir a pantallas) ---
  const closeAddPropertyModal = () => navigate({ to: "/" });
  
  
  const executeAddProperty = async (property: Property) => {
    try {
      await addProperty(property);
    } catch (error: any) {
      toast.error("Error al agregar propiedad", { description: error.message });
      throw error;
    }
  };

  // --- ACCIONES (Hablar con Supabase) ---
  const useProperties = () => {
    return useQuery({
      queryKey: ['properties'], 
      queryFn: getProperties,
    });
  }

  return { useProperties, executeAddProperty, closeAddPropertyModal };
};