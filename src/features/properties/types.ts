export interface Property {
  id: string;
  user_id: string;
  name: string;
  address: string | null;
  rent: number;
  mortgage: number;
  insurance_url: string | null;
  contract_url: string | null;
  manager_id?: string | null;
}

export interface PropertyFormValues {
  name: string;
  address: string;
  rent: number;
  mortgage: number;
  insurance_file: File | null;
  contract_file: File | null;
  manager_id: string | null;
}

export interface FileUploadInput {
  file: File | null;
  path: string | null;
  errorPrefix: string;
}

export interface PropertyForTable {
  id: string;
  name: string;
  address: string | null;
  rent: number;
  mortgage: number;
  insurance_url: string | null;
  contract_url: string | null;
  manager: {
    name: string;
  } | null;
  tenants:
    | {
        full_name: string;
      }[]
    | null;
}
