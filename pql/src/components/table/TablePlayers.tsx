import React, { useEffect, useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { usePlayers } from "../../hooks/usePlayers/usePlayers";
import { useAppContext } from "../../hooks/useAppContext/useAppContext";


const columnHelper = createColumnHelper<Player>()

const columns = [
    columnHelper.accessor('name', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('age', {
        header: () => 'Age',
        cell: info => info.renderValue(),
    }),
    columnHelper.accessor('position', {
        header: 'Profile Progress',
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (val) => (
          <button type="button" className="btn btn-danger rounded-circle" onClick={() => console.log(val.row.original)}>
            X
          </button>
        ),
      }),
    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <input
                type="checkbox"
                {...{
                    checked: table.getIsAllRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
            />
        ),
        cell: ({ row }) => (
            <input
                type="checkbox"
                {...{
                    checked: row.getIsSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
            />
        ),
    }),
]   

const TablePlayers = () => {
    const { state } = usePlayers();
    const { setPlayersSelected } = useAppContext();
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});;

    const table = useReactTable({
        data: state.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        getRowId: (row) => String(row.id),
    });

    useEffect(() => {
        const selectedIds = Object.keys(rowSelection).filter((id) => rowSelection[id]);
        setPlayersSelected(selectedIds.map(Number));
    }, [rowSelection, setPlayersSelected]);

    return (
        <React.Fragment>
            <table className="table">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </React.Fragment>
    );
}

export default TablePlayers;