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
            className="text-l cursor-pointer text-left font-semibold text-gray-800 hover:text-primary-red"
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
        <div className="max-w-[960px] place-self-center overflow-hidden rounded-md pt-4">
            <div className="relative overflow-x-auto border-2 shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm">
                    <thead className="bg-primary-200 font-semibold uppercase text-gray-900">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    scope="col"
                                    style={{
                                        width: column.width,
                                    }}
                                    className="p-4"
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource.length > 0 ? (
                            dataSource.map((data, key) => {
                                return (
                                    <tr
                                        key={key}
                                        className="cursor-default border-b bg-white text-gray-600 hover:bg-gray-50"
                                    >
                                        {columns.map((column, key) => {
                                            const clickable = clickableArr.find(
                                                (item) => item.column === column.key
                                            )
                                            if (column.key === 'action' && actions) {
                                                return (
                                                    <td key={key} className="p-4">
                                                        {actions(Number(data.key))}
                                                    </td>
                                                )
                                            }
                                            return (
                                                <td key={key} className="whitespace-nowrap p-4">
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
                            <tr className="bg-white">
                                <td colSpan={columns.length} className="p-4">
                                    {isEmptyString}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
