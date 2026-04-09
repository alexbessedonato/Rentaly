import type { TableData } from "@/components/ui/DataTable";
import { usePropertiesActions } from "./usePropertiesActions";

export const usePropertyListController = () => {
    const { useProperties } = usePropertiesActions();
    const { data: propertiesData, isLoading, isError, error } = useProperties();

    const properties = propertiesData ?? [];

    const tableData: TableData = {
        headers: ["PROPERTY", "TENANT", "MANAGER", "RENT", "MORTGAGE", "INSURANCE", "CONTRACT"],
        rows: properties.map((property) => [
            property.name,
            property.tenants?.[0]?.full_name ?? "-",
            property.manager?.name ?? "-",
            `${property.rent} €`,
            property.mortgage ? `${property.mortgage} €` : "-", 

            property.insurance_url ? (
                <a 
                    href={property.insurance_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-colors"
                >
                    📄 Seguro
                </a>
            ) : (
                <span className="text-gray-400 font-medium">-</span>
            ),

            property.contract_url ? (
                <a 
                    href={property.contract_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold transition-colors"
                >
                    📝 Contrato
                </a>
            ) : (
                <span className="text-gray-400 font-medium">-</span>
            ),
        ]),
    };

    return { tableData, isLoading, isError, error };
};