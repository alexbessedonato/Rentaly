import { useManagerActions } from "./useManagerActions";
import type { TableData } from "@/components/ui/DataTable";


export const useManagerListController = () => {
    const { useManagers } = useManagerActions();
    const { data: managers, isLoading } = useManagers();


    const tableData: TableData = {
        headers: ["NAME", "COMPANY", "EMAIL", "PHONE"],
        rows: (managers ?? []).map((manager) => [
            manager.name ?? "-",
            manager.company ?? "-",
            manager.email ?? "-",
            manager.phone ?? "-"
        ]),
    };


    return {tableData, isLoading}
};