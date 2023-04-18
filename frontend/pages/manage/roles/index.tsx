import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Paginate from '@/components/organisms/Paginate'
import type { PermissionType } from '@/components/organisms/RoleFormModal'
import RoleFormModal from '@/components/organisms/RoleFormModal'
import type { ColumnType, DataType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
import Modal from '@/components/templates/Modal'
import type { PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import DELETE_ROLE from '@/helpers/graphql/mutations/delete_role'
import GET_ROLES_PAGINATE from '@/helpers/graphql/queries/get_roles_paginate'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'

const columns: ColumnType[] = [
    {
        title: 'Name',
        key: 'name',
        width: 144,
    },
    {
        title: 'Description',
        key: 'description',
        width: 500,
    },
    {
        title: 'Actions',
        key: 'action',
        width: 20,
    },
]

type RolesType = {
    id: number
    name: string
    slug: string
    truncated_name: string
    description: string
    permissions?: PermissionType[]
}

const ViewRole = ({ role, refetch }: { role: RolesType; refetch: () => void }): JSX.Element => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <Button
                usage="toggle-modal"
                onClick={() => {
                    setShowModal(true)
                }}
            >
                <Icons name="eye" />
            </Button>
            <RoleFormModal
                role={role}
                view={true}
                isOpen={showModal}
                closeModal={() => {
                    setShowModal(false)
                }}
                refetch={refetch}
            />
        </div>
    )
}

const EditRole = ({ role, refetch }: { role: RolesType; refetch: () => void }): JSX.Element => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <Button
                usage="toggle-modal"
                onClick={() => {
                    setShowModal(true)
                }}
            >
                <Icons name="pencil" />
            </Button>
            <RoleFormModal
                role={role}
                view={false}
                isOpen={showModal}
                closeModal={() => {
                    setShowModal(false)
                }}
                refetch={refetch}
            />
        </div>
    )
}

const DeleteRole = ({
    id,
    name,
    refetch,
}: {
    id: number
    name: string
    refetch: () => void
}): JSX.Element => {
    const [showModal, setShowModal] = useState(false)
    const [deleteRole] = useMutation(DELETE_ROLE)

    const onSubmit = (): void => {
        if ([1, 2, 3].includes(+id)) {
            errorNotify('You cannot delete this role!')
            setShowModal(false)
            return
        }

        deleteRole({ variables: { id } })
            .then(() => {
                successNotify('Role deleted successfully!')
                refetch()
                setShowModal(false)
            })
            .catch(() => {
                errorNotify('There was an error removing the role!')
            })
    }

    return (
        <div>
            <Button
                usage="toggle-modal"
                onClick={() => {
                    setShowModal(true)
                }}
            >
                <Icons name="trash" />
            </Button>
            <Modal
                title="Delete Role"
                isOpen={showModal}
                handleClose={() => {
                    setShowModal(false)
                }}
                handleSubmit={onSubmit}
                submitLabel="Delete"
            >
                <span>
                    Are you sure you wish to delete <span className="font-bold">{name}</span>?
                </span>
            </Modal>
        </div>
    )
}

const RolesPage = (): JSX.Element => {
    const [showModal, setShowModal] = useState(false)

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
                description: role.description,
            }
        })
    }

    const getRolesActions = (key: number): JSX.Element | undefined => {
        const role = roles.find((role) => +role.id === key)

        if (role) {
            return (
                <div className="flex flex-row gap-4">
                    <ViewRole
                        role={role}
                        refetch={async () => {
                            await refetch({
                                first: pageInfo.perPage,
                                page: pageInfo.currentPage,
                            })
                        }}
                    />
                    <EditRole
                        role={role}
                        refetch={async () => {
                            await refetch({
                                first: pageInfo.perPage,
                                page: pageInfo.currentPage,
                            })
                        }}
                    />
                    <DeleteRole
                        id={key}
                        name={String(role.name)}
                        refetch={() => {
                            const { perPage, currentPage, count } = pageInfo

                            void refetch({
                                first: perPage,
                                page:
                                    currentPage !== 1 && count === 1
                                        ? currentPage - 1
                                        : currentPage,
                            })
                        }}
                    />
                </div>
            )
        }
    }

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await refetch({ first, page })
    }

    return (
        <div className="flex w-full flex-col p-4">
            <div className="flex h-full flex-col py-4">
                <div className="flex items-center justify-end">
                    <Button
                        usage="stroke"
                        size="large"
                        onClick={() => {
                            setShowModal(true)
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
            <RoleFormModal
                isOpen={showModal}
                closeModal={() => {
                    setShowModal(false)
                }}
                refetch={async () => {
                    await refetch({
                        first: pageInfo.perPage,
                        page: pageInfo.currentPage,
                    })
                }}
            />
        </div>
    )
}

export default RolesPage
