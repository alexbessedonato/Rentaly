export interface AddPropertyFormValues {
  name: string;
  address: string;
  rent: number;
  mortgage: number | null;
  insurance_file: File | null;
  contract_file: File | null;
  manager_id: string | null;
}

export interface Property {
  id: string;
  user_id: string;
  name: string;
  address: string | null;
  rent: number;
  mortgage: number | null;
  insurance_url: string | null;
  contract_url: string | null;
  manager_id? : string | null;
}

export type PropertyInsert = Omit<Property, 'id' | 'created_at'>;

export type PropertyUpdate = Partial<PropertyInsert>;
