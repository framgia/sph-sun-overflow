import Icons from '@/components/atoms/Icons'
import Link from 'next/link'

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
}

const Table = ({ columns, dataSource }: TableProps) => {
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
                                {dataSource.map((data) => {
                                    return (
                                        <tr
                                            key={data.key as number}
                                            className=" hover:bg-light-gray"
                                        >
                                            {Object.keys(data).map((key, index) => {
                                                if (key === 'id' || key === 'slug' || key === 'key')
                                                    return null

                                                return (
                                                    <td
                                                        className="whitespace-nowrap py-4 pl-16 pr-6 text-sm "
                                                        key={index}
                                                    >
                                                        {data[key] as string}
                                                    </td>
                                                )
                                            })}
                                            <td className="flex gap-4 whitespace-nowrap py-4 px-8">
                                                <Link
                                                    className="text-blue-500 hover:text-blue-700"
                                                    href="#"
                                                >
                                                    <Icons name="table_edit" />
                                                </Link>
                                                <Link
                                                    className="text-blue-500 hover:text-blue-700"
                                                    href="#"
                                                >
                                                    <Icons name="table_delete" />
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
