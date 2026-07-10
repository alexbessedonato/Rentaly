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
import { useManagersQuery } from "../hooks/queries";
import { useNavigate } from '@tanstack/react-router';
import type { Manager } from "../types";

export const ManagersList = () => {

    const { data: managers = [], isLoading } = useManagersQuery();
    const navigate = useNavigate();
    const navigateToAddManager = () => navigate({ to: "/add-manager" });
    const navigateToEditManager = (manager: Manager) =>
        navigate({ to: "/edit-manager/$managerId", params: { managerId: manager.id } });

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Managers</CardTitle>
                        {managers.length > 0 && (
                            <Button variant="outline" className="bg-blue-950 text-white" onClick={navigateToAddManager}>Add Manager</Button>
                        )}
                    </div>
                </CardHeader>
                {managers.length === 0 ? (
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-6">
                            <h2 className="text-lg font-semibold text-gray-700">No managers found</h2>
                            <p className="mt-1 text-sm text-gray-500">Start by adding a new manager.</p>
                            <Button variant="outline" className="mt-3" onClick={navigateToAddManager}>Add Manager</Button>
                        </div>
                    </CardContent>
                ) : (
                    <CardContent>
                        <div className="rounded-md border border-gray-300 overflow-x-auto">
                            <Table className="w-full">
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead className="w-1/4 text-center font-semibold">NAME</TableHead>
                                        <TableHead className="w-1/4 text-center font-semibold">COMPANY</TableHead>
                                        <TableHead className="w-1/4 text-center font-semibold">EMAIL</TableHead>
                                        <TableHead className="w-1/4 text-center font-semibold">PHONE</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="text-blue-950">
                                    {managers.map((manager) => (
                                        <TableRow key={manager.id} onClick={() => navigateToEditManager(manager)}>
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
                )}
            </Card>
        </div>
    )
};