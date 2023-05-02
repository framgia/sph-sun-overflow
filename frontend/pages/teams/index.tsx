import Search from '@/components/atoms/Icons/Search'
import InputField from '@/components/atoms/InputField'
import TeamCard from '@/components/molecules/TeamCard'
import Paginate from '@/components/organisms/Paginate'
import type { PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import GET_TEAMS from '@/helpers/graphql/queries/get_teams'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
    const [term, setTerm] = useState('')

    const userQuery = useQuery(GET_TEAMS, {
        variables: {
            first: 9,
            page: 1,
            name: `%${String(router.query.search ?? '')}%`,
        },
    })

    if (userQuery.loading) return loadingScreenShow()
    if (userQuery.error) return <span>{errorNotify(`Error! ${userQuery.error?.message}`)}</span>

    const pageInfo: PaginatorInfo = userQuery?.data?.getUserTeams.paginatorInfo
    const teams: TeamType[] = userQuery?.data?.getUserTeams.data

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await userQuery.refetch({ first, page })
    }

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const target = e.target as typeof e.target & {
            search: { value: string }
        }

        setSearchKey(target.search.value)
        setTerm(target.search.value)

        void router.push({
            pathname: router.pathname,
            query: {
                search: target.search.value,
            },
        })
    }

    const onSearchInputChange = (value: string): void => {
        if (value === '') {
            void userQuery.refetch({
                first: 9,
                page: 1,
                name: `%%`,
            })
            setTerm('')
        }
        setSearchKey(value)
    }

    return (
        <div className="h-full w-full overflow-y-auto rounded-[5px] border border-neutral-200 bg-neutral-white p-4">
            <div className="flex w-full justify-between">
                <div className="text-xl font-semibold text-neutral-900">My Teams</div>
            </div>
            <div className="mt-4 w-full">
                <div>
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
                        <div className="w-80">
                            <div className="truncate px-2 pt-1 text-sm text-gray-600">
                                {`${pageInfo?.total} search ${
                                    pageInfo?.total !== 1 ? `results` : `result`
                                } for "${term}"`}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {teams?.length !== 0 ? (
                <div>
                    <div className="flex flex-wrap gap-4 pt-4 ">
                        {teams?.map((team) => {
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
                    <div className=" mt-4 flex h-14 w-full items-center justify-center">
                        {pageInfo?.lastPage > 1 && (
                            <Paginate {...pageInfo} onPageChange={onPageChange} />
                        )}
                    </div>
                </div>
            ) : (
                <span className="mt-4 flex h-20 w-full items-center justify-center p-2 text-center text-lg font-bold text-primary-gray">
                    No teams to show
                </span>
            )}
        </div>
    )
}

export default TeamsListPage
