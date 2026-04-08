import { supabase } from "@/lib/supabaseClient";
import type { Property } from "../types";

// En propertiesService.ts

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
    console.log("Fetched properties:", data);
    return data;
}  

export const addProperty = async (property: Omit<Property, 'id'>): Promise<Property> => {
    const { data, error } = await supabase
        .from('property')
        .insert(property)
        .select()
        .single();

    if (error) {
        throw new Error("Error adding property: " + error.message);
    }

    return data as Property;

};