import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useManagersListViewModel } from "../hooks/useManagersListViewModel";
import { useManagersNavigation } from "../hooks/useManagersNavigation";

export const ManagersList = () => {

    const { managers, isLoading } = useManagersListViewModel()
    const { navigateToAddManager } = useManagersNavigation();

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Managers</CardTitle>
                        <Button variant="outline" onClick={navigateToAddManager}>Add Manager</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-gray-300 overflow-x-auto">
                        <Table className="w-full">
                            <TableHeader className="bg-gray-100">
                                <TableRow>
                                    <TableHead className="w-1/4 text-center">NAME</TableHead>
                                    <TableHead className="w-1/4 text-center">COMPANY</TableHead>
                                    <TableHead className="w-1/4 text-center">EMAIL</TableHead>
                                    <TableHead className="w-1/4 text-center">PHONE</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {managers.map((manager) => (
                                    <TableRow key={manager.id}>
                                        <TableCell className="text-center">{manager.name ?? "-"}</TableCell>
                                        <TableCell className="text-center">{manager.company ?? "-"}</TableCell>
                                        <TableCell className="text-center">{manager.email ?? "-"}</TableCell>
                                        <TableCell className="text-center">{manager.phone ?? "-"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};