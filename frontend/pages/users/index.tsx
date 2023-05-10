import { CustomIcons } from '@/components/atoms/Icons'
import PageTitle from '@/components/atoms/PageTitle'
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

const { LoadingSpinner } = CustomIcons

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
    const search = String(router.query.search ?? '')
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
    const [searchKey, setSearchKey] = useState(search)
    const [term, setTerm] = useState('')
    const [selectedRole, setSelectedRole] = useState<{ id: number | null; label: string }>(
        initialRole
    )
    const [selectedScore, setSelectedScore] = useState<{ sort: string | null; label: string }>(
        initialScore
    )

    const rolesQuery = useQuery(GET_ROLES)
    const [userQuery, { data, loading, error, refetch }] = useLazyQuery<any, RefetchType>(
        GET_USERS,
        {
            notifyOnNetworkStatusChange: true,
        }
    )

    useEffect(() => {
        const roleObj: Role = rolesQuery.data?.roles.find(
            (role: Role) => role.name === initialRole.label
        )
        setSelectedRole((prevRole) => ({ ...prevRole, id: roleObj?.id }))
        void userQuery({
            variables: {
                first: 12,
                page: 1,
                filter: { keyword: term, role_id: roleObj?.id },
                sort: { reputation: selectedScore.sort },
            },
        })
    }, [rolesQuery, term, selectedScore])

    if (rolesQuery.loading) return loadingScreenShow()
    if (rolesQuery.error)
        return <span>{errorNotify(`Error! ${rolesQuery.error?.message ?? ''}`)}</span>
    if (error) return <span>{errorNotify(`Error! ${error?.message ?? ''}`)}</span>

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setTerm(searchKey)
        await router.push({
            pathname: router.pathname,
            query: { ...router.query, search: searchKey },
        })
    }

    const onSearchInputChange = (value: string): void => {
        if (value === '' && term !== '') {
            const { query } = router
            void refetch({
                first: 12,
                page: 1,
                filter: { keyword: '', role_id: selectedRole.id },
                sort: { reputation: selectedScore.sort },
            })
            setTerm('')
            delete query.search
            void router.replace({ query })
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

    roleFilters.unshift({
        id: 0,
        name: 'All Users',
        onClick: async () => {
            await refetch({
                first: 12,
                page: 1,
                filter: { keyword: searchKey },
                sort: { reputation: selectedScore.sort },
            })
            delete router.query.role
            void router.replace(router.query)
            setSelectedRole({ id: null, label: 'All Users' })
        },
    })

    const scoreSort = [
        {
            id: 1,
            name: 'Most Score',
            onClick: async () => {
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
                void router.push({
                    pathname: router.pathname,
                    query: { ...router.query, score: 'Least Score' },
                })
                setSelectedScore({ sort: 'ASC', label: 'Least Score' })
            },
        },
    ]

    const { data: users, paginatorInfo } = data?.users ?? {}
    const userList: IUser[] = users
    const pageInfo: PaginatorInfo = paginatorInfo

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await refetch({ first, page })
    }

    const renderSearchResultHeader = (): JSX.Element => {
        return (
            <div className="flex gap-1 truncate text-sm font-medium text-neutral-700">
                {!pageInfo ? <LoadingSpinner /> : <span>{pageInfo.total} </span>}
                {pageInfo?.total === 1 ? 'result' : 'results'} for {`"${term}"`}
            </div>
        )
    }

    return (
        <>
            <PageTitle title="Users" />
            <div
                className={`flex flex-col gap-4 overflow-hidden rounded-md border border-neutral-200 bg-white p-4 ${
                    loading ? 'pointer-events-none' : ''
                }`}
            >
                <div className="w-full">
                    <div className="text-xl font-semibold leading-[120%] text-neutral-900">
                        All Users
                    </div>
                </div>
                <div className="flex w-full flex-row">
                    <div className="mr-auto flex flex-col gap-2">
                        <form onSubmit={handleSearchSubmit}>
                            <SearchInput
                                placeholder="Search"
                                value={searchKey}
                                onChange={onSearchInputChange}
                            />
                        </form>
                        {term && renderSearchResultHeader()}
                    </div>
                    <div className="flex flex-row justify-end gap-1">
                        <SortDropdown filters={roleFilters} selectedFilter={selectedRole.label} />
                        <SortDropdown filters={scoreSort} selectedFilter={selectedScore.label} />
                    </div>
                </div>
                {loading ? (
                    loadingScreenShow()
                ) : (
                    <div className="scrollbar flex w-full flex-col gap-4 overflow-y-auto">
                        {!userList.length ? (
                            <span className="p-2 text-center text-lg font-semibold text-neutral-500">
                                No users to show
                            </span>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    {userList?.map((user: IUser) => (
                                        <UserCard user={user} key={user.id} />
                                    ))}
                                </div>
                                {pageInfo?.lastPage > 1 && (
                                    <Paginate {...pageInfo} onPageChange={onPageChange} />
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default UsersPage
