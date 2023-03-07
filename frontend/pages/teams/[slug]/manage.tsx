import Button from '@/components/atoms/Button'
import Paginate from '@/components/organisms/Paginate'
import Table, { ColumnType, DataType } from '@/components/organisms/Table'
import GET_MEMBERS from '@/helpers/graphql/queries/get_members'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

interface IMember {
    id: number
    teamRole: {
        id: number
        name: string
    }
    user: {
        id: number
        first_name: string
        last_name: string
    }
}

const TeamManage = () => {
    const router = useRouter()
    const { data, loading, error, refetch } = useQuery(GET_MEMBERS, {
        variables: {
            teamSlug: router.query.slug,
            first: 5,
            page: 0,
        },
    })

    if (loading) return loadingScreenShow()
    if (error) {
        console.log(error)
        errorNotify(`Error! ${error.message}`)
        router.push(`/teams/${router.query.slug}`)
        return
    }

    const { paginatorInfo, data: memberList } = data.teamMembers

    const onPageChange = (first: number, page: number) => {
        refetch({ teamSlug: router.query.slug, first, page })
    }

    const parseGetMembers = (memberList: IMember[]) => {
        let tableList: DataType[] = memberList.map((member) => {
            return {
                key: member.id,
                name: `${member.user.first_name} ${member.user.last_name}`,
                role: member.teamRole.name,
            } as DataType
        })
        return tableList
    }
    return (
        <div className="flex w-full flex-col gap-4 divide-y-2 p-8">
            <h1 className="text-3xl font-bold">{memberList[0].team.name || 'Undefined'}</h1>
            <div className="flex h-full flex-col gap-4">
                <div className="mt-4 flex items-center justify-between">
                    <Link
                        href={`/teams/${router.query.slug}`}
                        className="text-lg text-secondary-text"
                    >
                        {'< Go back'}
                    </Link>
                    <Button>Add Member</Button>
                </div>
                <div className="overflow-hidden border border-black">
                    <Table columns={columns} dataSource={parseGetMembers(memberList)} />
                </div>
                <div className="mt-auto">
                    {paginatorInfo.lastPage > 1 && (
                        <Paginate {...paginatorInfo} onPageChange={onPageChange} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TeamManage
