import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Paginate from '@/components/organisms/Paginate'
import type { ColumnType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
import GET_TEAMS from '@/helpers/graphql/queries/get_teams'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

type TeamType = {
    id: number
    name: string
    slug: string
    description: string
    members_count: string
}

type TeamsQuery = {
    teams: {
        data: TeamType[]
        paginatorInfo: {
            currentPage: number
            hasMorePages: boolean
            lastPage: number
        }
    }
}

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

const handleEdit = (event: React.MouseEvent<HTMLElement>): void => {
    console.log('Edit')
}
const handleDelete = (event: React.MouseEvent<HTMLElement>): void => {
    console.log('Delete')
}

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

    const { data, loading, error, refetch } = useQuery<TeamsQuery>(GET_TEAMS, {
        variables: {
            first: 6,
            page: 1,
        },
    })

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await refetch({ first, page })
    }

    if (loading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error.message}`)
        return <></>
    }

    const { data: teamArr, paginatorInfo } = data?.teams ?? {
        data: [],
        paginatorInfo: { currentPage: 1, hasMorePages: false, lastPage: 1 },
    }

    const clickableArr = [
        {
            column: 'name',
            onClick: (slug: string): void => {
                void router.push({
                    pathname: '/admin/teams/[slug]',
                    query: { slug },
                })
            },
        },
    ]
    return (
        <div className="flex h-full w-full flex-col gap-4 p-8">
            <div className="mt-4 flex flex-row items-center justify-between">
                <h1 className="text-3xl font-bold">Teams</h1>
                <Button type="button" additionalClass="px-6 py-3">
                    New Team
                </Button>
            </div>
            <div className="TableContainer overflow-hidden border border-[#555555]">
                <Table
                    columns={columns}
                    dataSource={teamArr}
                    isEmptyString="No Teams to Show"
                    actions={renderTeamsActions}
                    clickableArr={clickableArr}
                />
            </div>
            <Paginate {...paginatorInfo} onPageChange={onPageChange} />
        </div>
    )
}
export default AdminTeams
