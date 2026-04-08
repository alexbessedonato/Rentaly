/**
 * TIPOS DE DOMINIO: PROPERTY
 * Basado en el esquema de base de datos de Supabase.
 * Usamos snake_case para mantener coherencia directa con la DB.
 */

export interface Property {
  id: string;                // uuid (Primary Key)
  user_id: string;           // uuid (FK a auth.users)
  name: string;              // text
  address: string | null;    // text
  rent: number;              // numeric
  mortgage: number | null;   // numeric
  insurance_url: string | null; // text
  contract_url: string | null;  // text
  manager_id? : string | null;    // uuid (FK a manager.id)
}

/**
 * Tipo para la creación de una propiedad.
 * Omitimos 'id' y 'created_at' ya que los genera la base de datos.
 */
export type PropertyInsert = Omit<Property, 'id' | 'created_at'>;

/**
 * Tipo para actualizaciones.
 * Usamos Partial para que todos los campos sean opcionales, 
 * permitiendo actualizar solo lo necesario (ej. solo el precio del alquiler).
 */
export type PropertyUpdate = Partial<PropertyInsert>;
