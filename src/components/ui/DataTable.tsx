import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const DataTable = ({ tableData }) => {
    const headers = tableData.headers ?? []
    const rows = tableData.rows ?? []

    return (
        <div className="rounded-md border border-gray-300 overflow-x-auto">
            <Table>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        {headers.map((header, i) => (
                            <TableHead key={i} className="text-center">
                                {header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex} className="text-center">
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}