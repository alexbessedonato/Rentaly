import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { usePropertyListController } from "../hooks/usePropertyListController"
import { DataTable } from "@/components/ui/DataTable"
import { usePropertiesActions } from "../hooks/usePropertiesActions"

export const PropertyList = () => {
    const { tableData, isLoading } = usePropertyListController()
    const { goToAddProperty } = usePropertiesActions();

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Properties</CardTitle>
                            <CardDescription>
                                updated on: {new Date().toLocaleTimeString()}
                            </CardDescription>
                        </div>
                        <Button variant="outline" onClick={goToAddProperty}>Add Property</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable tableData={tableData} />
                </CardContent>
            </Card>
        </div>
    )
}