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
import { useQuery } from '@apollo/client'
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

const UsersPage = (): JSX.Element => {
    const router = useRouter()
    const initialRole: { id: number | null; label: string } = { id: null, label: 'Sort by Role' }
    const initialScore: { sort: string | null; label: string } = {
        sort: null,
        label: 'Sort by Score',
    }
    const [isSearchResult, setIsSearchResult] = useState(false)
    const [searchKey, setSearchKey] = useState('')
    const [term, setTerm] = useState('')
    const [selectedRole, setSelectedRole] = useState<{ id: number | null; label: string }>(
        initialRole
    )
    const [selectedScore, setSelectedScore] = useState<{ sort: string | null; label: string }>(
        initialScore
    )

    const rolesQuery = useQuery(GET_ROLES)
    const userQuery = useQuery<any, RefetchType>(GET_USERS, {
        variables: {
            first: 12,
            page: 1,
            filter: { keyword: '', role_id: null },
            sort: { reputation: null },
        },
    })

    useEffect(() => {
        setSearchKey('')
        setIsSearchResult(false)
        void userQuery.refetch({
            first: 12,
            page: 1,
            filter: { keyword: '', role_id: null },
            sort: { reputation: null },
        })
    }, [router, userQuery.refetch])

    if (rolesQuery.loading || userQuery.loading) return loadingScreenShow()
    if (rolesQuery.error)
        return <span>{errorNotify(`Error! ${rolesQuery.error?.message ?? ''}`)}</span>
    if (userQuery.error)
        return <span>{errorNotify(`Error! ${userQuery.error?.message ?? ''}`)}</span>

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        setSelectedRole(initialRole)
        setSelectedScore(initialScore)

        e.preventDefault()

        const target = e.target as typeof e.target & {
            search: { value: string }
        }

        await userQuery.refetch({
            first: 12,
            page: 1,
            filter: { keyword: target.search.value, role_id: null },
            sort: { reputation: null },
        })

        setSearchKey(target.search.value)
        setTerm(target.search.value)
        target.search.value ? setIsSearchResult(true) : setIsSearchResult(false)
    }

    const onSearchInputChange = (value: string): void => {
        if (value === '') {
            void userQuery.refetch({
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
            await userQuery.refetch({
                first: 12,
                page: 1,
                filter: { keyword: searchKey, role_id: role.id },
                sort: { reputation: selectedScore.sort },
            })
            setSelectedRole({ id: role.id, label: role.name })
        },
    }))

    const scoreSort = [
        {
            id: 1,
            name: 'Most Score',
            onClick: async () => {
                await userQuery.refetch({
                    first: 12,
                    page: 1,
                    filter: {
                        keyword: searchKey,
                        role_id: selectedRole.id,
                    },
                    sort: { reputation: 'DESC' },
                })
                setSelectedScore({ sort: 'DESC', label: 'Most Score' })
            },
        },
        {
            id: 2,
            name: 'Least Score',
            onClick: async () => {
                await userQuery.refetch({
                    first: 12,
                    page: 1,
                    filter: {
                        keyword: searchKey,
                        role_id: selectedRole.id,
                    },
                    sort: { reputation: 'ASC' },
                })
                setSelectedScore({ sort: 'ASC', label: 'Least Score' })
            },
        },
    ]

    const userList: IUser[] = userQuery.data.users.data
    const pageInfo: PaginatorInfo = userQuery.data.users.paginatorInfo

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
                    {userList.map((user: IUser) => (
                        <UserCard user={user} key={user.id} />
                    ))}
                </div>
                <div className="mt-auto ">
                    {pageInfo.lastPage > 1 && (
                        <Paginate {...pageInfo} onPageChange={onPageChange} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default UsersPage
