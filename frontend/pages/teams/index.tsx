import PageHeader from '@/components/atoms/PageHeader'
import SearchInput from '@/components/molecules/SearchInput'
import Paginate from '@/components/organisms/Paginate'
import Card from '@/components/templates/Card'
import type { PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import GET_TEAMS from '@/helpers/graphql/queries/get_teams'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type TeamType = {
    id: number
    name: string
    description: string
    slug: string
    members_count: number
}

const TeamsListPage = (): JSX.Element => {
    const router = useRouter()
    const [searchKey, setSearchKey] = useState('')
    const [term, setTerm] = useState('')

    const userQuery = useQuery(GET_TEAMS, {
        variables: {
            first: 6,
            page: 1,
            name: '%%',
        },
    })

    useEffect(() => {
        void userQuery.refetch({
            first: 6,
            page: 1,
            name: '%%',
        })
        setSearchKey('')
        setTerm('')
    }, [router])

    if (userQuery.error) return <span>{errorNotify(`Error! ${userQuery.error?.message}`)}</span>

    const pageInfo: PaginatorInfo = userQuery?.data?.getUserTeams.paginatorInfo
    const teams: TeamType[] = userQuery?.data?.getUserTeams.data

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const target = e.target as typeof e.target & {
            search: { value: string }
        }

        await userQuery.refetch({
            first: 6,
            page: 1,
            name: `%${target.search.value}%`,
        })
        setSearchKey(target.search.value)
        setTerm(target.search.value)
    }

    const onChange = (value: string): void => {
        setSearchKey(value)
    }

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await userQuery.refetch({ first, page })
    }

    return (
        <div className="flex h-full w-full flex-col gap-3 divide-y-2 divide-primary-gray px-10 pt-8 pb-5">
            <PageHeader>Teams</PageHeader>
            {teams?.length !== 0 ? (
                <div className="flex h-full w-full flex-col gap-2 px-5 pt-3">
                    <div className="flex w-full flex-row items-center justify-between">
                        <div className="mt-2 flex flex-row items-center justify-between px-2">
                            <form onSubmit={handleSearchSubmit}>
                                <SearchInput
                                    placeholder="Search team"
                                    value={searchKey}
                                    onChange={onChange}
                                />
                            </form>
                        </div>
                    </div>
                    {term && (
                        <div className="px-3">
                            {pageInfo.total} {pageInfo.total === 1 ? 'result' : 'results'} for{' '}
                            {`"${term}"`}
                        </div>
                    )}
                    <div className="mt-4 flex h-full w-full flex-col justify-between gap-5">
                        <div className="grid w-full grid-cols-2 gap-y-5 gap-x-10 px-3">
                            {teams?.map((team: TeamType) => (
                                <Link key={team.id} href={`teams/${team.slug}`}>
                                    <Card
                                        header={team.name}
                                        footer={`${team.members_count} members`}
                                    >
                                        {team.description}
                                    </Card>
                                </Link>
                            ))}
                        </div>
                        {pageInfo?.lastPage > 1 && (
                            <Paginate {...pageInfo} onPageChange={onPageChange} />
                        )}
                    </div>
                </div>
            ) : (
                <text className="mt-4 p-2 text-center text-lg font-bold text-primary-gray">
                    No teams to show
                </text>
            )}
        </div>
    )
}

export default TeamsListPage
