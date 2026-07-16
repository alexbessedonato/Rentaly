import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { ReceiptText } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { usePropertiesList } from "../hooks/usePropertiesList"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { PropertyForTable } from "../types"

export const PropertiesList = () => {
    const { properties, handleOpenFile } = usePropertiesList();

    const navigate = useNavigate();
    const navigateToAddProperty = () => navigate({ to: "/add-property" });
    const navigateToEditProperty = (property: PropertyForTable) => navigate({ to: "/edit-property/$propertyId", params: { propertyId: property.id }});

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
                        {properties.length > 0 && (
                            <Button variant="outline" className="bg-blue-950 text-white" onClick={navigateToAddProperty}>Add Property</Button>
                        )}
                    </div>
                </CardHeader>
                {properties.length === 0 ? (
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-6">
                            <h2 className="text-lg font-semibold text-gray-700">No properties found</h2>
                            <p className="mt-1 text-sm text-gray-500">Start by adding a new property.</p>
                            <Button variant="outline" className="mt-3" onClick={navigateToAddProperty}>Add Property</Button>
                        </div>
                    </CardContent>
                ) : (
                    <CardContent>
                        <div className="rounded-md border border-gray-300 overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead className="text-center font-semibold">PROPERTY</TableHead>
                                        <TableHead className="text-center font-semibold">TENANT</TableHead>
                                        <TableHead className="text-center font-semibold">MANAGER</TableHead>
                                        <TableHead className="text-center font-semibold">RENT</TableHead>
                                        <TableHead className="text-center font-semibold">MORTGAGE</TableHead>
                                        <TableHead className="text-center font-semibold">INSURANCE</TableHead>
                                        <TableHead className="text-center font-semibold">CONTRACT</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="text-blue-950">
                                    {properties.map((property) => (
                                        <TableRow key={property.name} onClick={() => navigateToEditProperty(property)}>
                                            <TableCell className="text-center">
                                                <div className="flex flex-col items-center leading-tight">
                                                    <span>{property.name}</span>
                                                    {property.address ? (
                                                        <span className="mt-1 text-xs italic text-[#1f3a8a]">{property.address}</span>
                                                    ) : null}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">{property.tenants?.[0]?.full_name ?? "Not assigned"}</TableCell>
                                            <TableCell className="text-center">{property.manager?.name ?? "Not assigned"}</TableCell>
                                            <TableCell className="text-center">{property.rent}€</TableCell>
                                            <TableCell className="text-center">{property.mortgage}€</TableCell>
                                            <TableCell className="text-center">
                                                {property.insurance_url ? (
                                                    <Button
                                                        variant="outline"
                                                        className="font-bold"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (property.insurance_url) {
                                                                void handleOpenFile(property.insurance_url)  
                                                            }}}
                                                        >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Insurance
                                                    </Button>
                                                ) : (
                                                    "No insurance assigned"
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center text-blue-950">
                                                {property.contract_url ? (
                                                    <Button
                                                        variant="outline"
                                                        className="font-bold"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (property.contract_url) {
                                                              void handleOpenFile(property.contract_url);
                                                            }}}
                                                        >
                                                        <ReceiptText className=" mr-2 h-4 w-4" />
                                                        View Contract
                                                    </Button>
                                                ) : (
                                                    "No contract assigned"
                                                )}
                                            </TableCell>
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
}
