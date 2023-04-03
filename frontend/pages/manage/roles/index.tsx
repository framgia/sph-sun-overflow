import Button from '@/components/atoms/Button'
import Paginate from '@/components/organisms/Paginate'
import PermissionPills from '@/components/organisms/PermissionPills'
import RolesActions from '@/components/organisms/RolesAction'
import type { ColumnType, DataType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
import type { PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import GET_ROLES_PAGINATE from '@/helpers/graphql/queries/get_roles_paginate'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import type { UserType } from '@/pages/questions/[slug]'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

const columns: ColumnType[] = [
    {
        title: 'Name',
        key: 'name',
    },
    {
        title: 'Permissions',
        key: 'permissions',
    },
    {
        title: 'Users',
        key: 'users',
    },
    {
        title: '',
        key: 'action',
        width: 20,
    },
]

type RolesType = {
    id: number
    name: string
    slug: string
    truncated_name: string
    permissions: Array<{ id: number; name: string }>
    users: UserType[]
}

const RolesPage = (): JSX.Element => {
    const router = useRouter()

    const {
        data: { rolesPaginate } = {},
        loading,
        error,
        refetch,
    } = useQuery(GET_ROLES_PAGINATE, {
        variables: {
            first: 10,
            page: 1,
        },
        fetchPolicy: 'network-only',
    })

    if (loading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error.message}`)
        return <></>
    }

    const {
        data: roles,
        paginatorInfo: pageInfo,
    }: { data: RolesType[]; paginatorInfo: PaginatorInfo } = rolesPaginate

    const getRolesDataTable = (roles: RolesType[]): DataType[] => {
        return roles.map((role): DataType => {
            return {
                key: role.id,
                name: role.truncated_name,
                slug: role.slug,
                permissions: <PermissionPills permissions={role.permissions} />,
                users: role.users.length,
            }
        })
    }

    const getRolesActions = (key: number): JSX.Element | undefined => {
        const dataSource = getRolesDataTable(roles).find((role) => +role.key === key)

        if (dataSource) {
            return (
                <RolesActions
                    id={dataSource.key as number}
                    slug={dataSource.slug as string}
                    refetchHandler={(isDelete = false) => {
                        void refetch({
                            first: pageInfo.perPage,
                            page:
                                isDelete && roles.length === 1 && pageInfo.currentPage > 1
                                    ? pageInfo.currentPage - 1
                                    : pageInfo.currentPage,
                        })
                    }}
                />
            )
        }
    }

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await refetch({ first, page })
    }

    return (
        <div className="flex w-full flex-col">
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">User Roles</h1>
                    <Button
                        onClick={() => {
                            void router.push('/manage/roles/create')
                        }}
                    >
                        Add Role
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={getRolesDataTable(roles)}
                    actions={getRolesActions}
                />
                <div className="mt-auto">
                    {pageInfo.lastPage > 1 && (
                        <Paginate {...pageInfo} onPageChange={onPageChange} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default RolesPage
