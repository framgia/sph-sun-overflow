import SearchInput from '@/components/molecules/SearchInput'
import SortDropdown from '@/components/molecules/SortDropdown'
import UserTab from '@/components/molecules/UserTab'
import Paginate from '@/components/organisms/Paginate'
import GET_USERS from '@/helpers/graphql/queries/get_users'
import GET_ROLES from '@/helpers/graphql/queries/get_roles'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { IUser } from '@/components/molecules/UserTab'
import { useRouter } from 'next/router'
import { FilterType, PaginatorInfo } from '@/components/templates/QuestionsPageLayout'

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

const UsersPage = () => {
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
        userQuery.refetch({
            first: 12,
            page: 1,
            filter: { keyword: '', role_id: null },
            sort: { reputation: null },
        })
    }, [router, userQuery.refetch])

    if (rolesQuery.loading || userQuery.loading) return loadingScreenShow()
    if (rolesQuery.error) return errorNotify(`Error! ${rolesQuery.error}`)
    if (userQuery.error) return errorNotify(`Error! ${userQuery.error}`)

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const roleFilters: FilterType[] = rolesQuery.data.roles.map((role: Role) => ({
        ...role,
        onClick: () => {
            userQuery.refetch({
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
            onClick: () => {
                {
                    userQuery.refetch({
                        first: 12,
                        page: 1,
                        filter: {
                            keyword: searchKey,
                            role_id: selectedRole.id,
                        },
                        sort: { reputation: 'DESC' },
                    })
                    setSelectedScore({ sort: 'DESC', label: 'Most Score' })
                }
            },
        },
        {
            id: 2,
            name: 'Least Score',
            onClick: () => {
                {
                    userQuery.refetch({
                        first: 12,
                        page: 1,
                        filter: {
                            keyword: searchKey,
                            role_id: selectedRole.id,
                        },
                        sort: { reputation: 'ASC' },
                    })
                    setSelectedScore({ sort: 'ASC', label: 'Least Score' })
                }
            },
        },
    ]

    const userList: IUser[] = userQuery.data.users.data
    const pageInfo: PaginatorInfo = userQuery.data.users.paginatorInfo

    const onPageChange = (first: number, page: number) => {
        userQuery.refetch({ first, page })
    }

    const renderSearchResultHeader = (): JSX.Element => {
        return (
            <div className="w-80 pt-2">
                <div className="text-md mt-1 mb-2 truncate pl-5 text-gray-800">
                    {`${pageInfo.total} search ${
                        pageInfo.total > 1 ? `results` : `result`
                    } for "${term}"`}
                </div>
            </div>
        )
    }

    const onChange = (value: string) => {
        setSearchKey(value)
    }

    return (
        <div className="ml-6 mr-6 flex h-full w-full flex-col ">
            <div className="mt-10 w-full  pl-14">
                <div className="text-3xl font-bold">Overflow Users</div>
                <div className="mt-4 w-full border-b-2 border-b-gray-300"></div>
            </div>
            <div className="mt-3 flex w-full flex-row pl-16 pr-2">
                <div className="mr-auto">
                    <form onSubmit={handleSearchSubmit}>
                        <SearchInput
                            usage="Users"
                            placeholder="Search"
                            value={searchKey}
                            onChange={onChange}
                        />
                    </form>
                </div>
                <div className="flex flex-row justify-end gap-1">
                    <SortDropdown filters={roleFilters} selectedFilter={selectedRole.label} />
                    <SortDropdown filters={scoreSort} selectedFilter={selectedScore.label} />
                </div>
            </div>
            <div className="pl-16 pr-2">{isSearchResult && renderSearchResultHeader()}</div>
            <div className="mt-3 flex h-full w-full flex-col">
                <div className="mr-4 ml-20 grid grid-cols-3 ">
                    {userList.map((user: IUser) => (
                        <UserTab user={user} usage="UserList" key={user.id} />
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
