import { supabase } from "@/lib/supabaseClient";
import type { AddPropertyFormValues } from "../types";
import { getFilePath } from "../utils/getFilePath";

export const getProperties = async (): Promise<any[]> => {
    const { data, error } = await supabase
        .from("property")
        .select(`
            *,
            manager:manager_id (
                name
            ),
            tenants:tenant (
                full_name,
                email
            )
        `)
        .order("name", { ascending: true });

    if (error) {
        throw new Error("Error fetching properties: " + error.message);
    }
    return data;
}  

   export const addProperty = async (property: AddPropertyFormValues) => {
    const { data: { user }, error: UserError } = await supabase.auth.getUser();
    
    if (UserError || !user) throw new Error("No user found");

    const { insurancePath, contractPath } = await getFilePath(property, user.id);

    let insurance_url = null;
    let contract_url = null;

    if (property.insurance_file && insurancePath) {
        const { error: StorageErrorIns } = await supabase.storage
            .from("PropertyContracts")
            .upload(insurancePath, property.insurance_file);
            
        if (StorageErrorIns) throw new Error("Error subiendo seguro: " + StorageErrorIns.message);
        
        insurance_url = supabase.storage.from("PropertyContracts").getPublicUrl(insurancePath).data.publicUrl;
    }

    if (property.contract_file && contractPath) {
        const { error: StorageErrorCon } = await supabase.storage
            .from("PropertyContracts")
            .upload(contractPath, property.contract_file);
            
        if (StorageErrorCon) throw new Error("Error subiendo contrato: " + StorageErrorCon.message);
        
        contract_url = supabase.storage.from("PropertyContracts").getPublicUrl(contractPath).data.publicUrl;
    }

    const { insurance_file, contract_file, ...cleanPropertyData } = property;

    const { error: DbError } = await supabase
        .from('property')
        .insert({
            ...cleanPropertyData, 
            insurance_url,      
            contract_url,       
            user_id: user.id    
        })
       
    if (DbError) {
        throw new Error("Error adding property: " + DbError.message);
    }

    };