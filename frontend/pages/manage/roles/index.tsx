import Button from '@/components/atoms/Button'
import Paginate from '@/components/organisms/Paginate'
import PermissionPills from '@/components/organisms/PermissionPills'
import RolesActions from '@/components/organisms/RolesAction'
import type { ColumnType, DataType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
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
    permissions: Array<{ id: number; name: string }>
    users: UserType[]
}

const RolesPage = (): JSX.Element => {
    const router = useRouter()

    const {
        data: { rolesPaginate: { data: roles = {}, paginatorInfo = {} } = {} } = {},
        loading,
        error,
        refetch,
    } = useQuery(GET_ROLES_PAGINATE, {
        variables: {
            first: 10,
            page: 1,
        },
    })

    if (loading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error.message}`)
        return <></>
    }

    const getRolesDataTable = (roles: RolesType[]): DataType[] => {
        return roles.map((role): DataType => {
            return {
                key: role.id,
                name: role.name,
                permissions: <PermissionPills permissions={role.permissions} />,
                users: role.users.length,
            }
        })
    }

    const getRolesActions = (): JSX.Element => {
        return <RolesActions />
    }

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await refetch({ first, page })
    }

    return (
        <div className="flex w-full flex-col gap-4 p-8">
            <div className="flex h-full flex-col gap-4">
                <div className="mt-4 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">User Roles</h1>
                    <Button
                        onClick={() => {
                            void router.push('/manage/roles/create')
                        }}
                    >
                        Add Role
                    </Button>
                </div>
                <div className="overflow-hidden border border-black">
                    <Table
                        columns={columns}
                        dataSource={getRolesDataTable(roles)}
                        actions={getRolesActions}
                    />
                </div>
                <div className="mt-auto">
                    {paginatorInfo.lastPage > 1 && (
                        <Paginate {...paginatorInfo} onPageChange={onPageChange} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default RolesPage
