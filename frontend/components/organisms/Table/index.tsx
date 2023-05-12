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
    footer?: JSX.Element | null
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
            className="cursor-pointer text-left text-xs font-semibold text-neutral-900 hover:text-primary-900"
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
    footer = null,
    isEmptyString = 'No data to show',
    clickableArr = [],
}: TableProps): JSX.Element => {
    return (
        <div className="w-full place-self-center overflow-hidden rounded-md drop-shadow-xsm 2xl:w-[60rem]">
            <div className="relative overflow-x-auto bg-white sm:rounded-lg">
                <table className="w-full text-left">
                    <thead className="border-0 bg-primary-200 uppercase text-neutral-900">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    scope="col"
                                    style={{
                                        width: column.width,
                                    }}
                                    className="space-x-4 p-4 text-sm font-semibold"
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="border border-t-0">
                        {dataSource.length > 0 ? (
                            dataSource.map((data, key) => {
                                return (
                                    <tr
                                        key={key}
                                        className="cursor-default border-b bg-white text-neutral-900 hover:bg-neutral-100"
                                    >
                                        {columns.map((column, key) => {
                                            const clickable = clickableArr.find(
                                                (item) => item.column === column.key
                                            )
                                            if (column.key === 'action' && actions) {
                                                return (
                                                    <td key={key} className="items-center p-4">
                                                        {actions(Number(data.key))}
                                                    </td>
                                                )
                                            }
                                            return (
                                                <td key={key} className="whitespace-nowrap p-4">
                                                    {clickable !== undefined ? (
                                                        renderClickable(
                                                            data[column.key],
                                                            clickable,
                                                            data.slug as string
                                                        )
                                                    ) : (
                                                        <span className="text-left text-xs font-normal text-neutral-900">
                                                            {data[column.key]}
                                                        </span>
                                                    )}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })
                        ) : (
                            <tr className="bg-white">
                                <td
                                    colSpan={columns.length}
                                    className="p-4 font-semibold text-primary-gray"
                                >
                                    {isEmptyString}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {footer && (
                    <div className="cursor-default rounded-b-md border border-t-0 bg-white p-4 ">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Table
