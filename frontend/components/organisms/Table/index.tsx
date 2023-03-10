export type ColumnType = {
    key: string
    title: string
    width?: number
}

export type DataType = {
    [key: string]: unknown
}

type TableProps = {
    columns: ColumnType[]
    dataSource: DataType[]
    actions?: (key: number) => JSX.Element | undefined
}

const Table = ({ columns, dataSource, actions }: TableProps) => {
    return (
        <div className="flex flex-col border-black">
            <div className="-m-1.5 overflow-x-auto">
                <div className="inline-block min-w-full p-1.5 align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-black">
                            <thead className="bg-primary-gray">
                                <tr>
                                    {columns.map((column) => (
                                        <th
                                            key={column.key}
                                            scope="col"
                                            style={{ width: column.width }}
                                            className={`py-3 pl-16 pr-6 text-left text-sm font-medium uppercase ${
                                                column.key === 'action' ? 'pl-9' : ''
                                            }`}
                                        >
                                            {column.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black">
                                {dataSource.length > 0 ? (
                                    dataSource.map((data, key) => {
                                        return (
                                            <tr key={key} className=" hover:bg-light-gray">
                                                {columns.map((column, key) => {
                                                    if (column.key === 'action' && actions) {
                                                        return (
                                                            <td
                                                                key={key}
                                                                className="flex gap-4 whitespace-nowrap py-4 px-8"
                                                            >
                                                                {actions(Number(data.key))}
                                                            </td>
                                                        )
                                                    }
                                                    return (
                                                        <td
                                                            key={key}
                                                            className="whitespace-nowrap py-4 pl-16 pr-6 text-sm "
                                                        >
                                                            {String(data[column.key])}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={columns.length}
                                            className="w-full py-10 text-center text-lg font-bold text-primary-gray"
                                        >
                                            No members to show
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
