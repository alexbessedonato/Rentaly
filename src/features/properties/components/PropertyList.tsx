import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { usePropertiesListViewModel } from "../hooks/usePropertiesListViewModel"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { usePropertiesNavigation } from "../hooks/usePropertiesNavigation"

export const PropertyList = () => {
    const { properties, isLoading } = usePropertiesListViewModel()
    const { navigateToAddProperty } = usePropertiesNavigation();

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
                        <Button variant="outline" onClick={navigateToAddProperty}>Add Property</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-gray-300 overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-100">
                                <TableRow>
                                    <TableHead className="text-center">PROPERTY</TableHead>
                                    <TableHead className="text-center">TENANT</TableHead>
                                    <TableHead className="text-center">MANAGER</TableHead>
                                    <TableHead className="text-center">RENT</TableHead>
                                    <TableHead className="text-center">MORTGAGE</TableHead>
                                    <TableHead className="text-center">INSURANCE</TableHead>
                                    <TableHead className="text-center">CONTRACT</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {properties.map((property) => (
                                    <TableRow key={property.name}>
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
                                        <TableCell className="text-center">{property.rent} €</TableCell>
                                        <TableCell className="text-center">{property.mortgage} €</TableCell>
                                        <TableCell className="text-center">
                                            {property.insurance_url ? (
                                                <Button asChild variant="outline" size="sm">
                                                    <a href={property.insurance_url} target="_blank" rel="noreferrer">
                                                        View Insurance
                                                    </a>
                                                </Button>
                                            ) : (
                                                "No insurance assigned"
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {property.contract_url ? (
                                                <Button asChild variant="outline" size="sm">
                                                    <a href={property.contract_url} target="_blank" rel="noreferrer">
                                                        View Contract
                                                    </a>
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
            </Card>
        </div>
    )
}