import Button from '@/components/atoms/Button'
import Paginate from '@/components/organisms/Paginate'
import Table, { ColumnType, DataType } from '@/components/organisms/Table'
import { PaginatorInfo } from '@/pages/questions'
import Link from 'next/link'
import React from 'react'

const TeamManage = () => {
    const teamName = 'Sun Overflow'
    const teamSlug = 'sun-overflow'

    const pageInfo: PaginatorInfo = {
        perPage: 10,
        currentPage: 1,
        lastPage: 3,
        total: 20,
        hasMorePages: true,
    }

    const onPageChange = () => {
        console.log('Change page...')
    }

    const columns: ColumnType[] = [
        {
            title: 'Name',
            key: 'name',
        },
        {
            title: 'Role',
            key: 'role',
        },
        {
            title: 'Action',
            key: 'action',
            width: 20,
        },
    ]

    const data: DataType[] = [
        {
            key: 1,
            name: 'John Doe',
            role: 'Team Leader',
        },
        {
            key: 2,
            name: 'Precious Gift',
            role: 'Alice Gods',
        },
        {
            key: 3,
            name: 'Jhon Rhon',
            role: 'Benedetta Gods',
        },
        {
            key: 4,
            name: 'James Bow',
            role: 'FE',
        },
        {
            key: 5,
            name: 'Jane Dough',
            role: 'BE',
        },
    ]

    return (
        <div className="flex w-full flex-col gap-4 divide-y-2 p-8">
            <h1 className="text-3xl font-bold">{teamName}</h1>
            <div className="flex h-full flex-col gap-4">
                <div className="mt-4 flex items-center justify-between">
                    <Link href={`/teams/${teamSlug}`} className="text-secondary-text">
                        {'< Go back'}
                    </Link>
                    <Button>Add Member</Button>
                </div>
                <div className="overflow-hidden border border-black">
                    <Table columns={columns} dataSource={data} />
                </div>
                <div className="mt-auto">
                    {pageInfo.lastPage > 1 && (
                        <Paginate {...pageInfo} onPageChange={onPageChange} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TeamManage
