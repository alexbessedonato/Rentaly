import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { usePropertyListController } from "../hooks/usePropertyListController"
import { Button } from "@/components/ui/button"

export const PropertyList = () => {
    const config = usePropertyListController()

    return (
        <div className="px-0 md:px-6 lg:px-12">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Properties</CardTitle>
                    <CardDescription>
                        updated on: {new Date().toLocaleTimeString()}
                    </CardDescription>
                    <CardAction>
                        <Button variant="outline">
                            Add Property
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    {/* Contenedor para el scroll horizontal si hay muchas columnas */}
                    <div className="rounded-md border overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/80 dark:bg-slate-900/50">
                                <TableRow>
                                    <TableHead className="w-full font-semibold text-foreground py-3 text-left">PROPERTY</TableHead>
                                    <TableHead className="font-semibold text-foreground py-3 text-center px-4 sm:px-8 lg:px-16 xl:px-20">TENANT</TableHead>
                                    <TableHead className="font-semibold text-foreground py-3 text-center px-4 sm:px-8 lg:px-16 xl:px-20">MANAGER</TableHead>
                                    <TableHead className="font-semibold text-foreground py-3 text-center px-4 sm:px-8 lg:px-16 xl:px-20">RENT</TableHead>
                                    <TableHead className="font-semibold text-foreground py-3 text-center px-4 sm:px-8 lg:px-16 xl:px-20">MORTGAGE</TableHead>
                                    <TableHead className="font-semibold text-foreground py-3 text-center px-4 sm:px-8 lg:px-16 xl:px-20">INSURANCE</TableHead>
                                    <TableHead className="font-semibold text-foreground py-3 text-center px-4 sm:px-8 lg:px-16 xl:px-20">CONTRACT</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {config?.properties?.map((property) => (
                                    <TableRow key={property.id} className="hover:bg-transparent">
                                        <TableCell className="w-full font-medium py-4">
                                            {property.name}
                                            <p className=" mt-0.5 text-xs italic text-blue-900">{property.address}</p>
                                        </TableCell>
                                        <TableCell className="text-center px-4 sm:px-8 lg:px-16 xl:px-20 whitespace-nowrap">
                                            {property.tenants[0]?.full_name || "No tenant"}
                                        </TableCell>
                                        <TableCell className="text-center px-4 sm:px-8 lg:px-16 xl:px-20 whitespace-nowrap">
                                            {property.manager?.name || "No manager"}
                                        </TableCell>
                                        <TableCell className="text-center px-4 sm:px-8 lg:px-16 xl:px-20 whitespace-nowrap">{property.rent}€</TableCell>
                                        <TableCell className="text-center px-4 sm:px-8 lg:px-16 xl:px-20 whitespace-nowrap">{property.mortgage}€</TableCell>
                                        <TableCell className="text-center px-4 sm:px-8 lg:px-16 xl:px-20 whitespace-nowrap">{property.insurance_url}</TableCell>
                                        <TableCell className="text-center px-4 sm:px-8 lg:px-16 xl:px-20 whitespace-nowrap">
                                            {property.contract_url}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}