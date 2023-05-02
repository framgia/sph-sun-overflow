import Search from '@/components/atoms/Icons/Search'
import InputField from '@/components/atoms/InputField'
import TeamCard from '@/components/molecules/TeamCard'
import Paginate from '@/components/organisms/Paginate'
import type { PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import GET_TEAMS from '@/helpers/graphql/queries/get_teams'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
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
    const [searchKey, setSearchKey] = useState(String(router.query.searchKey ?? ''))
    const [term, setTerm] = useState('')
    const [isSearchResult, setIsSearchResult] = useState(searchKey !== '')

    const userQuery = useQuery(GET_TEAMS, {
        variables: {
            first: 9,
            page: 1,
            name: '%%',
        },
    })

    useEffect(() => {
        const seachString = isSearchResult ? searchKey : ''
        void userQuery.refetch({
            first: 9,
            page: 1,
            name: `%${seachString}%`,
        })
        setSearchKey(seachString)
        setTerm(seachString)
        setIsSearchResult(seachString !== '')
    }, [router])

    if (userQuery.error) return <span>{errorNotify(`Error! ${userQuery.error?.message}`)}</span>

    const pageInfo: PaginatorInfo = userQuery?.data?.getUserTeams.paginatorInfo
    const teams: TeamType[] = userQuery?.data?.getUserTeams.data

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const target = e.target as typeof e.target & {
            search: { value: string }
        }

        setSearchKey(target.search.value)
        setTerm(target.search.value)
        target.search.value ? setIsSearchResult(true) : setIsSearchResult(false)

        void router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                searchKey: target.search.value,
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
            setIsSearchResult(false)
        }
        setSearchKey(value)
    }

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await userQuery.refetch({ first, page })
    }

    const renderSearchResultHeader = (): JSX.Element => {
        return (
            <div className="w-80">
                <div className="truncate px-2 pt-1 text-sm text-gray-600">
                    {`${pageInfo?.total} search ${
                        pageInfo?.total !== 1 ? `results` : `result`
                    } for "${term}"`}
                </div>
            </div>
        )
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
                    {isSearchResult && renderSearchResultHeader()}
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
