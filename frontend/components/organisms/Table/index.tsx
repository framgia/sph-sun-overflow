import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Link from 'next/link'
import Dropdown, { OptionType } from '@/components/molecules/Dropdown'
import Modal from '@/components/templates/Modal'
import { Fragment, useState } from 'react'
import RemoveMember from '../RemoveMember'
import EditMember from '../EditMember'

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
    roles: OptionType[]
}

<<<<<<< HEAD
const roles: OptionType[] = [
    { id: 1, name: 'FE' },
    { id: 2, name: 'BE' },
    { id: 3, name: 'QA' },
]

const Table = ({ columns, dataSource }: TableProps) => {
    const [activeModal, setActiveModal] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleEditSubmit = () => {
        //member role updated
    }

    const openModal = (modal: string) => {
        setActiveModal(modal)
        setIsOpen(true)
    }

    const closeModal = (modal: string) => {
        setActiveModal(modal)
        setIsOpen(false)
    }
=======
const Table = ({ columns, dataSource, roles }: TableProps) => {
>>>>>>> [Overflow-284] [MARKUP] Create Deleting confimation modal in manage team
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
                                {dataSource.map((data, key) => {
                                    return (
                                        <tr key={key} className=" hover:bg-light-gray">
                                            <td className="whitespace-nowrap py-4 pl-16 pr-6 text-sm ">
                                                {String(data.name)}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-16 pr-6 text-sm ">
                                                {String(data.role)}
                                            </td>
                                            <td className="flex gap-4 whitespace-nowrap py-4 px-8">
                                                <EditMember id={Number(data.key)} roles={roles} />
                                                <RemoveMember
                                                    id={Number(data.key)}
                                                    name={String(data.name)}
                                                    role={String(data.role)}
                                                />
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
