import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/DataTable"
import { useManagerListController } from "../hooks/useManagerListController";
import { useManagerActions } from "../hooks/useManagerActions";

export const ManagersList = () => {

    const { tableData, isLoading } = useManagerListController()
    const { goToAddManager } = useManagerActions();

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Managers</CardTitle>
                        <Button variant="outline" onClick={goToAddManager}>Add Manager</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable tableData={tableData} />
                </CardContent>
            </Card>
        </div>
    )
};