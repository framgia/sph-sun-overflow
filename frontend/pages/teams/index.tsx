import { CustomIcons } from '@/components/atoms/Icons'
import Search from '@/components/atoms/Icons/Search'
import InputField from '@/components/atoms/InputField'
import PageTitle from '@/components/atoms/PageTitle'
import TeamCard from '@/components/molecules/TeamCard'
import Paginate from '@/components/organisms/Paginate'
import type { PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import GET_TEAMS from '@/helpers/graphql/queries/get_teams'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'

const { LoadingSpinner } = CustomIcons

type TeamType = {
    id: number
    name: string
    description: string
    slug: string
    members_count: number
}

const TeamsListPage = (): JSX.Element => {
    const router = useRouter()
    const [searchKey, setSearchKey] = useState(String(router.query.search ?? ''))
    const [term, setTerm] = useState(String(router.query.search ?? ''))
    const userQuery = useQuery(GET_TEAMS, {
        variables: {
            first: 9,
            page: 1,
            name: `%${String(router.query.search ?? '')}%`,
        },
    })

    if (userQuery.error) return <span>{errorNotify(`Error! ${userQuery.error?.message}`)}</span>

    const { data: teams, paginatorInfo } = userQuery.data?.getUserTeams ?? {}
    const pageInfo: PaginatorInfo = paginatorInfo
    const userTeams: TeamType[] = teams

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await userQuery.refetch({ first, page })
    }

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const target = e.target as typeof e.target & {
            search: { value: string }
        }

        setSearchKey(target.search.value)

        void router
            .push({
                pathname: router.pathname,
                query: {
                    search: target.search.value,
                },
            })
            .then(() => {
                setTerm(target.search.value)
            })
    }

    const onSearchInputChange = (value: string): void => {
        if (value === '' && term !== '') {
            const { query } = router
            void userQuery.refetch({
                first: 9,
                page: 1,
                name: `%%`,
            })
            setTerm('')
            delete query.search
            void router.replace({ query })
        }
        setSearchKey(value)
    }

    return (
        <>
            <PageTitle title="Teams" />
            <div
                className={`flex max-h-full w-full justify-center rounded-[5px] border border-neutral-200 bg-neutral-white p-4 ${
                    userQuery.loading ? 'pointer-events-none' : ''
                }`}
            >
                <div className="flex w-full flex-col gap-4 align-middle">
                    <div className="flex w-full justify-between">
                        <div className="text-xl font-semibold text-neutral-900">My Teams</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <form onSubmit={handleSearchSubmit}>
                            <InputField
                                name="search"
                                placeholder="Search"
                                icon={
                                    <div className="absolute top-1/2 left-1.5 -translate-y-1/2 transform">
                                        <Search />
                                    </div>
                                }
                                additionalClass="h-10 w-72 pl-8"
                                value={searchKey}
                                onChange={(e) => {
                                    onSearchInputChange(e.target.value)
                                }}
                            />
                        </form>
                        {term && (
                            <div className="flex gap-1 truncate text-sm font-medium text-neutral-700">
                                {!pageInfo ? <LoadingSpinner /> : <span>{pageInfo.total} </span>}
                                {pageInfo?.total === 1 ? 'result' : 'results'} for {`"${term}"`}
                            </div>
                        )}
                    </div>

                    {userQuery.loading ? (
                        loadingScreenShow()
                    ) : userTeams.length ? (
                        <div className="scrollbar mt-4 flex w-full flex-col justify-between gap-4 overflow-y-auto ">
                            <div className="grid-rows-9 grid w-full grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3 2xl:grid-rows-2">
                                {userTeams?.map((team) => {
                                    return (
                                        <TeamCard
                                            key={team.id}
                                            slug={team.slug ?? ''}
                                            name={team.name}
                                            description={team.description}
                                            usersCount={team.members_count}
                                        />
                                    )
                                })}
                            </div>
                            {!userQuery.loading && pageInfo?.lastPage > 1 && (
                                <Paginate {...pageInfo} onPageChange={onPageChange} />
                            )}
                        </div>
                    ) : (
                        <span className="p-2 text-center text-base font-semibold text-primary-gray">
                            No teams to show
                        </span>
                    )}
                </div>
            </div>
        </>
    )
}

export default TeamsListPage
