/**
 * TIPOS DE DOMINIO: TENANT
 * Basado en el esquema de base de datos de Supabase.
 */

export interface Tenant {
  id: string;                 // uuid (Primary Key)
  property_id: string;        // uuid (FK a property.id)
  full_name: string;          // text
  email: string | null;       // text
  phone: string | null;       // text
  end_of_contract: string | null; // date (en TypeScript las fechas de DB suelen llegar como string)
  created_at?: string;        // timestamptz
}

/**
 * Tipo para la creación de un inquilino.
 * Omitimos 'id' y 'created_at'.
 */
export type TenantInsert = Omit<Tenant, 'id' | 'created_at'>;

/**
 * Tipo para actualizaciones de un inquilino.
 */
export type TenantUpdate = Partial<TenantInsert>;

/**
 * Tipo extendido opcional (UI/Tablas).
 * Útil si haces un JOIN en Supabase para traer el nombre de la propiedad en la que vive.
 */
export interface TenantWithProperty extends Tenant {
  property_name?: string; 
}