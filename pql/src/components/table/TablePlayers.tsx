import React, { useEffect, useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { usePlayers } from "../../hooks/usePlayers/usePlayers";
import { useAppContext } from "../../hooks/useAppContext/useAppContext";
import { PlayerModal } from "../modal/PlayerModal";

const abilities: Record<string, string[]> = {
    Seeker: ["Ability X", "Ability Y"],
    Beater: ["Ability A", "Ability B"],
    Keeper: ["Ability C", "Ability D"],
    Chaser: ["Ability F", "Ability G"],
};

const columnHelper = createColumnHelper<Player>()

const TablePlayers = () => {
    // const { deletePlayer } = usePlayers();
    const { players, setPlayersSelected } = useAppContext();
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [stateModalPlayer, setModalPlayer] = useState<{name: string}>({name: ''});

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
            id: "specialAbility",
            header: "Special Ability",
            cell: (val) => (
                <select className="form-select">
                    {
                        abilities[val.row.original.position].map((ability) => (
                            <option key={ability} value={ability}>{ability}</option>
                        ))
                    }
                </select>
            ),
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: (val) => (
                <React.Fragment>
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal"
                        onClick={
                            () => {
                                setModalPlayer(() => ({
                                    name: val.row.original.name
                                }))
                            }
                        }
                    >
                        Launch demo modal
                    </button>
                </React.Fragment>

                // <button type="button" className="btn btn-danger" onClick={() => {
                //     deletePlayer(val.row.original.id)
                // }
                // }>
                //     X
                // </button>
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

    const table = useReactTable({
        data: players,
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

            <PlayerModal name={ stateModalPlayer.name } />

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