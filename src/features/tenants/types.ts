export interface Tenant {
  id: string;
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

export interface TenantForTable {
  full_name: string;
  email: string | null;
  phone: string | null;
  end_of_contract: string | null;
  property: {
    name: string;
    address: string | null;
  };
}
