export interface Tenant {
  id: string;
  owner_id: string;
  property_id: string | null;
  full_name: string;
  email: string | null;
  phone: string | null;
  end_of_contract: string | null;
  created_at?: string;
}

export interface AddTenantInput {
  property_id: string | null;
  full_name: string;
  email: string | null;
  phone: string | null;
  end_of_contract?: string | null;
}

export interface TenantEditInput extends AddTenantInput {
  id: string;
}

export interface TenantForTable {
  id: string;
  property_id: string | null;
  full_name: string;
  email: string | null;
  phone: string | null;
  end_of_contract: string | null;
  property: {
    id: string;
    name: string;
    address: string | null;
  } | null;
}
