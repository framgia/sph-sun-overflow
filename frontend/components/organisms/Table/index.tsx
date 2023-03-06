import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Link from 'next/link'
import Dropdown, { OptionType } from '@/components/molecules/Dropdown'
import Modal from '@/components/templates/Modal'
import { useState } from 'react'

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

const roles: OptionType[] = [
    { id: 1, name: 'FE' },
    { id: 2, name: 'BE' },
    { id: 3, name: 'QA' },
]

const Table = ({ columns, dataSource }: TableProps) => {
    const [activeModal, setActiveModal] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleEditSubmit = () => {
        console.log('member role updated!')
    }

    const openModal = (modal: string) => {
        setActiveModal(modal)
        setIsOpen(true)
    }

    const closeModal = (modal: string) => {
        setActiveModal(modal)
        setIsOpen(false)
    }
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
                                                if (key === 'id' || key === 'key') return null

                                                if (key === 'slug') {
                                                    return (
                                                        <td
                                                            className="flex gap-4 whitespace-nowrap py-4 px-8"
                                                            key={index}
                                                        >
                                                            <Button
                                                                usage="toggle-modal"
                                                                onClick={() =>
                                                                    openModal(`edit-${data[key]}`)
                                                                }
                                                            >
                                                                <Icons name="table_edit" />
                                                            </Button>
                                                            {activeModal === `edit-${data[key]}` &&
                                                                isOpen && (
                                                                    <Modal
                                                                        title={`Assign Role`}
                                                                        submitLabel="Save"
                                                                        isOpen={isOpen}
                                                                        handleSubmit={
                                                                            handleEditSubmit
                                                                        }
                                                                        handleClose={() =>
                                                                            closeModal(
                                                                                `edit-${data[key]}`
                                                                            )
                                                                        }
                                                                    >
                                                                        <form
                                                                            onSubmit={
                                                                                handleEditSubmit
                                                                            }
                                                                        >
                                                                            <Dropdown
                                                                                name=""
                                                                                label="Select Role"
                                                                                options={roles}
                                                                            />
                                                                        </form>
                                                                    </Modal>
                                                                )}
                                                            <Link
                                                                className="text-blue-500 hover:text-blue-700"
                                                                href="#"
                                                            >
                                                                <Icons name="table_delete" />
                                                            </Link>
                                                        </td>
                                                    )
                                                }

                                                return (
                                                    <td
                                                        className="whitespace-nowrap py-4 pl-16 pr-6 text-sm "
                                                        key={index}
                                                    >
                                                        {data[key] as string}
                                                    </td>
                                                )
                                            })}
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
