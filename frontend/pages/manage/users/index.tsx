import Icons from '@/components/atoms/Icons'
import Paginate from '@/components/organisms/Paginate'
import type { ColumnType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
import { useRouter } from 'next/router'

const columns: ColumnType[] = [
    {
        title: 'Name',
        key: 'name',
    },
    {
        title: 'Questions Posted',
        key: 'question_count',
    },
    {
        title: 'Answers Posted',
        key: 'answer_count',
    },
    {
        title: 'Role',
        key: 'role',
    },
    {
        title: '',
        key: 'action',
        width: 20,
    },
]

const tempValues = [
    {
        id: 1,
        name: 'John Doe',
        slug: 'john-doe',
        question_count: 5,
        answer_count: 6,
        role: 'Admin',
    },
    {
        id: 2,
        name: 'Jane Doe',
        slug: 'jane-doe',
        question_count: 5,
        answer_count: 6,
        role: 'Admin',
    },
    {
        id: 3,
        name: 'John Smith',
        slug: 'john-smith',
        question_count: 5,
        answer_count: 6,
        role: 'Admin',
    },
    {
        id: 4,
        name: 'Jane Roe',
        slug: 'jane-roe',
        question_count: 5,
        answer_count: 6,
        role: 'Admin',
    },
]

const tempPaginateProps = {
    currentPage: 1,
    lastPage: 2,
    hasMorePages: true,
    onPageChange: () => {
        console.log('next')
    },
}

const editAction = (): JSX.Element => {
    return (
        <div>
            <Icons name="table_edit" additionalClass="fill-gray-500" />
        </div>
    )
}

const AdminUsers = (): JSX.Element => {
    const router = useRouter()

    const clickableArr = [
        {
            column: 'name',
            onClick: (slug: string): void => {
                void router.push({
                    pathname: '/manage/users/[slug]',
                    query: { slug },
                })
            },
        },
    ]

    return (
        <div className="flex w-full flex-col gap-4 p-8">
            <div className="flex h-full flex-col gap-4">
                <div className="mt-4 flex items-center">
                    <h1 className="text-3xl font-bold">Users</h1>
                </div>
                <div className="overflow-hidden border border-secondary-black">
                    <Table
                        columns={columns}
                        dataSource={tempValues}
                        actions={editAction}
                        clickableArr={clickableArr}
                    />
                </div>
                <Paginate {...tempPaginateProps} />
            </div>
        </div>
    )
}

export default AdminUsers
