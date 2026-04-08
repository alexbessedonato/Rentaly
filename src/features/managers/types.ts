/**
 * TIPOS DE DOMINIO: MANAGER
 * Basado en el esquema de base de datos de Supabase.
 */

export interface Manager {
  id: string;                 // uuid (Primary Key)
  owner_id: string;           // uuid (FK a auth.users.id)
  name: string;               // text
  phone: string | null;       // text
  email: string | null;       // text
  company: string | null;     // text
  created_at?: string;        // timestamptz
}

/**
 * Tipo para la creación de un manager.
 */
export type ManagerInsert = Omit<Manager, 'id' | 'created_at'>;

/**
 * Tipo para actualizaciones de un manager.
 */
export type ManagerUpdate = Partial<ManagerInsert>;