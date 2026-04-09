export const PROPERTY_WITH_RELATIONS_SELECT = `
  *,
  manager:manager_id (
    name
  ),
  tenants:tenant (
    full_name,
    email
  )
`;
