import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react"

interface propsHome{
    
}

type Person = {
    Name: string,
    Age: number,
    Position: string
}

const defaultData: Person[] = [
    {
      Name: 'tanner',
      Age: 15,
      Position: 'Chaser',
    },
    {
      Name: 'tandy',
      Age: 17,
      Position: 'Chaser'
    },
    {
      Name: 'joe',
      Age: 19,
      Position: 'Chaser'    },
  ];

  const columnHelper = createColumnHelper<Person>()

  const columns = [
    columnHelper.accessor('Name', {
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('Age', {
      header: () => 'Age',
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor('Position', {
        header: 'Position',
      }),
  ]

const Home = (props: propsHome) => {

    const [data, _setData] = React.useState(() => [...defaultData])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      })

    return(
        <React.Fragment>
           <div>
            <form action="" method="post">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />

                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" />
            </form>
           </div>

           <div>
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