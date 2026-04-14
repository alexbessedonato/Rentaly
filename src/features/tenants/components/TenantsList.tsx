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
import { useTenantsNavigation } from "../hooks/useTenantsNavigation";
import { useTenantsListViewModel } from "../hooks/useTenantsListModelView";

export const TenantsList = () => {

    const { tenants, isLoading } = useTenantsListViewModel()
    const { navigateToAddTenant } = useTenantsNavigation();

    if (isLoading) return <div>Loading...</div>

    return (

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Tenants</CardTitle>
                        {tenants.length > 0 && (
                            <Button variant="outline" className="bg-blue-950 text-white" onClick={navigateToAddTenant}>Add Tenant</Button>
                        )}
                    </div>
                </CardHeader>
                {tenants.length === 0 ? (
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-6">
                            <h2 className="text-lg font-semibold text-gray-700">No tenants found</h2>
                            <p className="mt-1 text-sm text-gray-500">Start by adding a new tenant.</p>
                            <Button variant="outline" className="mt-3" onClick={navigateToAddTenant}>Add Tenant</Button>
                        </div>
                    </CardContent>
                ) : (
                    <CardContent>
                        <div className="rounded-md border border-gray-300 overflow-x-auto">
                            <Table className="w-full">
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead className="w-1/4 text-center font-semibold">NAME</TableHead>
                                        <TableHead className="w-1/4 text-center font-semibold">PROPERTY</TableHead>
                                        <TableHead className="w-1/4 text-center font-semibold">EMAIL</TableHead>
                                        <TableHead className="w-1/4 text-center font-semibold">PHONE</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="text-blue-950">
                                    {tenants.map((tenant) => (
                                        <TableRow key={`${tenant.full_name}-${tenant.email ?? tenant.phone ?? "-"}`}>
                                            <TableCell className="text-center">{tenant.full_name ?? "-"}</TableCell>
                                            <TableCell className="text-center">{tenant.property?.name ?? "-"}</TableCell>
                                            <TableCell className="text-center">{tenant.email ?? "-"}</TableCell>
                                            <TableCell className="text-center">{tenant.phone ?? "-"}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>

    );
};