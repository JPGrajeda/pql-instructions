import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react"
import TablePlayers from "../components/table/TablePlayers";
import { usePlayers } from "../hooks/usePlayers";

interface propsHome {

}


const defaultData: Player[] = [
    {
        name: 'tanner',
        age: 24,
        position: 'In Relationship',
    },
    {
        name: 'tanner',
        age: 24,
        position: 'In Relationship',
    },
    {
        name: 'tanner',
        age: 24,
        position: 'In Relationship',
    },
]

const columnHelper = createColumnHelper<Player>()

const columns = [
    columnHelper.accessor('name', {
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('age', {
        header: () => 'Age',
        cell: info => info.renderValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('position', {
        header: 'Profile Progress',
        footer: info => info.column.id,
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (val) => (
          <button onClick={() => console.log(val.row.original)}>
            View
          </button>
        ),
      }),
]



const Home = (props: propsHome) => {

    const { state } = usePlayers();
    console.log("🚀 ~ Home ~ state:", state.data)

    const table = useReactTable({
        data: state.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <React.Fragment>
            <div>
                <form action="" method="post">
                    <label htmlFor="name">* Name</label>
                    <input type="text" name="name" id="name" />

                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" />
                </form>
            </div>

            <div>

                <TablePlayers />


                <table>
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

            </div>


        </React.Fragment>
    )
}

export default Home;