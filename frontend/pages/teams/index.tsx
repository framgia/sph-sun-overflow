import PageHeader from '@/components/atoms/PageHeader'
import SearchInput from '@/components/molecules/SearchInput'
import Paginate from '@/components/organisms/Paginate'
import type { PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import GET_TEAMS from '@/helpers/graphql/queries/get_teams'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { Card, CardBody, CardFooter, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsPeopleFill } from 'react-icons/bs'

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
    const [isSearchResult, setIsSearchResult] = useState(false)

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
        setIsSearchResult(false)
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
        target.search.value ? setIsSearchResult(true) : setIsSearchResult(false)
    }

    const onChange = (value: string): void => {
        setSearchKey(value)
    }

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await userQuery.refetch({ first, page })
    }

    const renderSearchResultHeader = (): JSX.Element => {
        return (
            <div className="w-80">
                <div className="truncate px-2 pt-1 text-sm text-gray-600">
                    {`${pageInfo.total} search ${
                        pageInfo.total !== 1 ? `results` : `result`
                    } for "${term}"`}
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-full w-full flex-col">
            <PageHeader>Teams</PageHeader>
            <div className="flex h-full w-full flex-col">
                <div className="flex w-full flex-row">
                    <div className="ml-auto">
                        <form onSubmit={handleSearchSubmit}>
                            <SearchInput
                                placeholder="Search team"
                                value={searchKey}
                                onChange={onChange}
                            />
                        </form>
                        {isSearchResult && renderSearchResultHeader()}
                    </div>
                </div>
                {teams?.length !== 0 ? (
                    <div className="mt-6 flex h-full w-full flex-col justify-between">
                        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
                            {teams?.map((team: TeamType) => (
                                <Link key={team.id} href={`teams/${team.slug}`}>
                                    <Card className="h-48 justify-between">
                                        <CardBody className="justify-content-end items-center">
                                            <Typography
                                                variant="h5"
                                                className="truncate text-gray-800"
                                                title={`${team.name}`}
                                            >
                                                {team.name}
                                            </Typography>
                                            <div className="mt-2 leading-tight text-gray-600 line-clamp-3">
                                                {team.description}
                                            </div>
                                        </CardBody>
                                        <CardFooter className="py-3 text-sm text-gray-500">
                                            <div className="flex justify-center gap-2">
                                                <BsPeopleFill className="text-base" />
                                                {team.members_count}
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                        {pageInfo?.lastPage > 1 && (
                            <Paginate {...pageInfo} onPageChange={onPageChange} />
                        )}
                    </div>
                ) : (
                    !isSearchResult && (
                        <span className="mt-4 p-2 text-center text-lg font-bold text-primary-gray">
                            No teams to show
                        </span>
                    )
                )}
            </div>
        </div>
    )
}

export default TeamsListPage
