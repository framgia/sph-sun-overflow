import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Paginate from '@/components/organisms/Paginate'
import Table, { ColumnType } from '@/components/organisms/Table'
import { useRouter } from 'next/router'

const columns: ColumnType[] = [
    {
        title: 'Team Name',
        key: 'name',
    },
    {
        title: 'Description',
        key: 'description',
    },
    {
        title: 'Members',
        key: 'members_count',
    },
    {
        title: '',
        key: 'action',
        width: 20,
    },
]

const tempData = [
    {
        name: 'ABCD',
        description: 'a',
        members_count: 10,
        slug: 'abcd',
    },
    {
        name: 'ABCD',
        description: 'a',
        members_count: 10,
        slug: 'abcd',
    },
    {
        name: 'ABCD',
        description: 'a',
        members_count: 10,
        slug: 'abcd',
    },
    {
        name: 'ABCD',
        description: 'a',
        members_count: 10,
        slug: 'abcd',
    },
    {
        name: 'ABCD',
        description: 'a',
        members_count: 10,
        slug: 'abcd',
    },
]

const tempPaginateProps = {
    currentPage: 1,
    lastPage: 2,
    hasMorePages: true,
    onPageChange: (): void => console.log('next'),
}

const handleEdit = (event: React.MouseEvent<HTMLElement>): void => console.log('Edit')
const handleDelete = (event: React.MouseEvent<HTMLElement>): void => console.log('Delete')

const editAction = (key: number): JSX.Element => {
    return (
        <div onClick={handleEdit}>
            <Icons name="table_edit" additionalClass="fill-gray-500" />
        </div>
    )
}
const deleteAction = (key: number): JSX.Element => {
    return (
        <div onClick={handleDelete}>
            <Icons name="table_delete" additionalClass="fill-gray-500" />
        </div>
    )
}

const renderTeamsActions = (key: number): JSX.Element | undefined => {
    return (
        <div className="flex flex-row gap-4">
            {editAction(key)}
            {deleteAction(key)}
        </div>
    )
}

const AdminTeams = (): JSX.Element => {
    const router = useRouter()
    const clickableArr = [
        {
            column: 'name',
            onClick: (slug: string): void => {
                router.push({
                    pathname: '/admin/teams/[slug]', //Change to Proper URL
                    query: { slug },
                })
            },
        },
    ]
    return (
        <div className="mx-10 mt-[10vh] flex w-full flex-col gap-8">
            <div className="flex flex-row justify-between">
                <div className="text-3xl font-bold">Teams</div>
                <Button type="button" additionalClass="px-6 py-3">
                    New Team
                </Button>
            </div>
            <div className="TableContainer border-2 border-[#555555]">
                <Table
                    columns={columns}
                    dataSource={tempData}
                    isEmptyString="No Teams to Show"
                    actions={renderTeamsActions}
                    clickableArr={clickableArr}
                />
            </div>
            <Paginate {...tempPaginateProps} />
        </div>
    )
}
export default AdminTeams
