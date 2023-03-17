export type ColumnType = {
    key: string
    title: string
    width?: number | string
}
export type DataType = Record<string, string | number | JSX.Element>

type ClickableType = {
    column: string extends 'actions' ? never : string
    onClick: (slug: string) => void
}
type TableProps = {
    columns: ColumnType[]
    dataSource: DataType[]
    actions?: (key: number) => JSX.Element | undefined
    isEmptyString?: string
    clickableArr?: ClickableType[]
}

const renderClickable = (
    text: string | number | JSX.Element,
    clickable: ClickableType,
    slug: string = ''
): JSX.Element => {
    const handleClick = (e: React.MouseEvent): void => {
        e.preventDefault()
        clickable.onClick(slug)
    }
    return (
        <span
            className="cursor-pointer text-blue-500 underline hover:text-blue-400"
            onClick={handleClick}
        >
            {text}
        </span>
    )
}

const Table = ({
    columns,
    dataSource,
    actions,
    isEmptyString = 'No members to show',
    clickableArr = [],
}: TableProps): JSX.Element => {
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
                                            style={{
                                                width: column.width,
                                            }}
                                            className={`py-3 text-center text-sm font-medium uppercase ${
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
                                            <tr key={key} className="hover:bg-light-gray">
                                                {columns.map((column, key) => {
                                                    const clickable = clickableArr.find(
                                                        (item) => item.column === column.key
                                                    )
                                                    if (column.key === 'action' && actions) {
                                                        return (
                                                            <td
                                                                key={key}
                                                                className="whitespace-nowrap py-4 px-8"
                                                            >
                                                                {actions(Number(data.key))}
                                                            </td>
                                                        )
                                                    }
                                                    return (
                                                        <td
                                                            key={key}
                                                            className="min-w-[200px] whitespace-nowrap py-4 text-center text-sm"
                                                        >
                                                            {clickable !== undefined
                                                                ? renderClickable(
                                                                      data[column.key],
                                                                      clickable,
                                                                      data.slug as string
                                                                  )
                                                                : data[column.key]}
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
                                            {isEmptyString}
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
