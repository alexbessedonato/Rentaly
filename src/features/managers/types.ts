export interface Manager {
  id: string;
  owner_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  company: string | null;
  created_at: string;
}

export type ManagerFormValues = {
  name: string;
  phone: string;
  email: string;
  company: string;
};

export type AddManagerInput = {
  name: string;
  phone: string | null;
  email: string | null;
  company: string | null;
};

export type ManagerUpdate = Partial<AddManagerInput>;

export interface ManagerEditInput extends AddManagerInput {
  id: string;
}