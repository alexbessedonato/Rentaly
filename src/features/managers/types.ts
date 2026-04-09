export interface Manager {
  id: string;
  owner_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  company: string | null;
  created_at?: string;
}

export type ManagerInsert = Omit<Manager, 'id' | 'created_at'>;

export type ManagerUpdate = Partial<ManagerInsert>;