export interface Tenant {
  id: string;
  property_id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  end_of_contract: string | null;
  created_at?: string;
}

export type TenantInsert = Omit<Tenant, 'id' | 'created_at'>;

export type TenantUpdate = Partial<TenantInsert>;

export interface TenantWithProperty extends Tenant {
  property_name?: string; 
}