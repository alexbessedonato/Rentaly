import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export interface TableData<TCell = React.ReactNode> {
    headers: string[];
    rows: TCell[][];
}

interface DataTableProps<TCell = React.ReactNode> {
    tableData: TableData<TCell>;
}

export const DataTable = <TCell extends React.ReactNode>({ tableData }: DataTableProps<TCell>) => {
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