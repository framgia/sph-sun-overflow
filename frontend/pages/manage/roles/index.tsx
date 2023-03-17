import Paginate from '@/components/organisms/Paginate'
import PermissionPills from '@/components/organisms/PermissionPills'
import RoleForm from '@/components/organisms/RoleForm'
import RolesActions from '@/components/organisms/RolesAction'
import type { ColumnType, DataType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
import type { UserType } from '@/pages/questions/[slug]'

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
        title: 'Action',
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
    const roles: RolesType[] = [
        {
            id: 1,
            name: 'Admin',
            permissions: [
                {
                    id: 1,
                    name: 'Add Role',
                },
                {
                    id: 2,
                    name: 'Delete Role',
                },
                {
                    id: 3,
                    name: 'Permission 3',
                },
            ],
            users: [
                {
                    id: 1,
                    first_name: 'User1',
                    last_name: 'User1',
                },
                {
                    id: 2,
                    first_name: 'User1',
                    last_name: 'User1',
                },
                {
                    id: 3,
                    first_name: 'User1',
                    last_name: 'User1',
                },
            ],
        },
        {
            id: 3,
            name: 'Admin 2',
            permissions: [
                {
                    id: 3,
                    name: 'Permission 3',
                },
            ],
            users: [
                {
                    id: 1,
                    first_name: 'User1',
                    last_name: 'User1',
                },
                {
                    id: 2,
                    first_name: 'User1',
                    last_name: 'User1',
                },
            ],
        },
        {
            id: 2,
            name: 'Admin 3',
            permissions: [
                {
                    id: 2,
                    name: 'Delete Role',
                },
                {
                    id: 3,
                    name: 'Permission 3',
                },
            ],
            users: [
                {
                    id: 1,
                    first_name: 'User1',
                    last_name: 'User1',
                },
                {
                    id: 2,
                    first_name: 'User1',
                    last_name: 'User1',
                },
                {
                    id: 3,
                    first_name: 'User1',
                    last_name: 'User1',
                },
            ],
        },
    ]

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

    const paginatorInfo = {
        currentPage: 1,
        lastPage: 2,
        first: 10,
        page: 1,
        hasMorePages: true,
    }

    const onPageChange = (first: number, page: number): void => {}

    return (
        <div className="flex w-full flex-col gap-4 p-8">
            <div className="flex h-full flex-col gap-4">
                <div className="mt-4 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">User Roles</h1>
                    <RoleForm />
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
