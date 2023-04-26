import SearchInput from '@/components/molecules/SearchInput'
import SortDropdown from '@/components/molecules/SortDropdown'
import UserCard from '@/components/molecules/UserCard'
import type { IUser } from '@/components/molecules/UserTab'
import Paginate from '@/components/organisms/Paginate'
import type { FilterType, PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import GET_ROLES from '@/helpers/graphql/queries/get_roles'
import GET_USERS from '@/helpers/graphql/queries/get_users'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useLazyQuery, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Role = {
    id: number
    name: string
}

type RefetchType = {
    first: number
    page: number
    filter?: { keyword?: string; role_id?: number | null }
    sort?: { reputation?: string | null }
}

const scoreFilterOptions: Record<string, string> = {
    'Most Score': 'DESC',
    'Least Score': 'ASC',
}

const UsersPage = (): JSX.Element => {
    const router = useRouter()
    const roleFilter = String(router.query.role ?? '')
    const scoreFilter = String(router.query.score ?? '')
    const initialRole: { id: number | null; label: string } = {
        id: null,
        label: roleFilter || 'Sort by Role',
    }
    const initialScore: { sort: string | null; label: string } = {
        sort: scoreFilterOptions[scoreFilter] ?? null,
        label: scoreFilter || 'Sort by Score',
    }
    const [isSearchResult, setIsSearchResult] = useState(false)
    const [searchKey, setSearchKey] = useState(String(router.query.search ?? ''))
    const [term, setTerm] = useState('')
    const [selectedRole, setSelectedRole] = useState<{ id: number | null; label: string }>(
        initialRole
    )
    const [selectedScore, setSelectedScore] = useState<{ sort: string | null; label: string }>(
        initialScore
    )

    const rolesQuery = useQuery(GET_ROLES)
    const [userQuery, { data, loading, error, refetch }] = useLazyQuery<any, RefetchType>(GET_USERS)

    useEffect(() => {
        const roleObj: Role = rolesQuery.data?.roles.find(
            (role: Role) => role.name === initialRole.label
        )
        setSelectedRole((prevRole) => ({ ...prevRole, id: roleObj?.id }))
        void userQuery({
            variables: {
                first: 12,
                page: 1,
                filter: { keyword: searchKey, role_id: roleObj?.id },
                sort: { reputation: initialScore.sort },
            },
        })
    }, [rolesQuery])

    if (rolesQuery.loading || loading) return loadingScreenShow()
    if (rolesQuery.error)
        return <span>{errorNotify(`Error! ${rolesQuery.error?.message ?? ''}`)}</span>
    if (error) return <span>{errorNotify(`Error! ${error?.message ?? ''}`)}</span>

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        setSelectedRole(initialRole)
        setSelectedScore(initialScore)

        e.preventDefault()

        const target = e.target as typeof e.target & {
            search: { value: string }
        }

        await refetch({
            first: 12,
            page: 1,
            filter: { keyword: target.search.value, role_id: selectedRole.id },
            sort: { reputation: selectedScore.sort },
        })

        setSearchKey(target.search.value)
        setTerm(target.search.value)
        target.search.value ? setIsSearchResult(true) : setIsSearchResult(false)
        void router.push({
            pathname: router.pathname,
            query: { ...router.query, search: target.search.value },
        })
    }

    const onSearchInputChange = (value: string): void => {
        if (value === '') {
            void refetch({
                first: 12,
                page: 1,
                filter: { keyword: '', role_id: null },
                sort: { reputation: null },
            })
            setTerm('')
            setIsSearchResult(false)
        }
        setSearchKey(value)
    }

    const roleFilters: FilterType[] = rolesQuery.data.roles.map((role: Role) => ({
        ...role,
        onClick: async () => {
            await refetch({
                first: 12,
                page: 1,
                filter: { keyword: searchKey, role_id: role.id },
                sort: { reputation: selectedScore.sort },
            })
            void router.push({
                pathname: router.pathname,
                query: { ...router.query, role: role.name },
            })
            setSelectedRole({ id: role.id, label: role.name })
        },
    }))

    const scoreSort = [
        {
            id: 1,
            name: 'Most Score',
            onClick: async () => {
                await refetch({
                    first: 12,
                    page: 1,
                    filter: {
                        keyword: searchKey,
                        role_id: selectedRole.id,
                    },
                    sort: { reputation: 'DESC' },
                })
                void router.push({
                    pathname: router.pathname,
                    query: { ...router.query, score: 'Most Score' },
                })
                setSelectedScore({ sort: 'DESC', label: 'Most Score' })
            },
        },
        {
            id: 2,
            name: 'Least Score',
            onClick: async () => {
                await refetch({
                    first: 12,
                    page: 1,
                    filter: {
                        keyword: searchKey,
                        role_id: selectedRole.id,
                    },
                    sort: { reputation: 'ASC' },
                })
                void router.push({
                    pathname: router.pathname,
                    query: { ...router.query, score: 'Least Score' },
                })
                setSelectedScore({ sort: 'ASC', label: 'Least Score' })
            },
        },
    ]

    const userList: IUser[] = data?.users.data
    const pageInfo: PaginatorInfo = data?.users.paginatorInfo

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await refetch({ first, page })
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
        <div className="flex flex-col">
            <div className="w-full">
                <div className="text-3xl font-bold text-gray-800">Users</div>
            </div>
            <div className="mt-4 flex w-full flex-row">
                <div className="mr-auto">
                    <form onSubmit={handleSearchSubmit}>
                        <SearchInput
                            placeholder="Search user"
                            value={searchKey}
                            onChange={onSearchInputChange}
                        />
                    </form>
                </div>
                <div className="flex flex-row justify-end gap-2">
                    <SortDropdown filters={roleFilters} selectedFilter={selectedRole.label} />
                    <SortDropdown filters={scoreSort} selectedFilter={selectedScore.label} />
                </div>
            </div>
            {isSearchResult && renderSearchResultHeader()}
            <div className="my-4 flex h-full w-full flex-col">
                <div className="grid grid-cols-3 justify-center gap-3">
                    {userList?.map((user: IUser) => (
                        <UserCard user={user} key={user.id} />
                    ))}
                </div>
                <div className="mt-auto ">
                    {pageInfo?.lastPage > 1 && (
                        <Paginate {...pageInfo} onPageChange={onPageChange} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default UsersPage
