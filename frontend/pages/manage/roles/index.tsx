import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import PageTitle from '@/components/atoms/PageTitle'
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
import { useEffect, useState } from 'react'

const columns: ColumnType[] = [
    {
        title: 'Role',
        key: 'name',
        width: 240,
    },
    {
        title: 'Description',
        key: 'description',
        width: 500,
    },
    {
        title: 'Actions',
        key: 'action',
        width: 128,
    },
]

type RolesType = {
    id: number
    name: string
    slug: string
    truncated_name: string
    description: string
    truncated_description: string
    permissions?: PermissionType[]
}

const ViewRole = ({ role, refetch }: { role: RolesType; refetch: () => void }): JSX.Element => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Button
                usage="toggle-modal"
                onClick={() => {
                    setShowModal(true)
                }}
            >
                <Icons name="eye" size="18" />
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
        </>
    )
}

const EditRole = ({ role, refetch }: { role: RolesType; refetch: () => void }): JSX.Element => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Button
                usage="toggle-modal"
                onClick={() => {
                    setShowModal(true)
                }}
            >
                <Icons name="pencil" size="18" />
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
        </>
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
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [deleteRole] = useMutation(DELETE_ROLE)

    const onSubmit = (): void => {
        if ([1, 2, 3].includes(+id)) {
            errorNotify('You cannot delete this role!')
            setShowModal(false)
            return
        }

        setLoading(true)
        deleteRole({ variables: { id } })
            .then(() => {
                successNotify('Role deleted successfully!')
                refetch()
                setShowModal(false)
            })
            .catch(() => {
                errorNotify('There was an error removing the role!')
            })
            .finally(() =>
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            )
    }

    return (
        <>
            <Button
                usage="toggle-modal"
                onClick={() => {
                    setShowModal(true)
                }}
            >
                <Icons name="trash" size="18" />
            </Button>
            <Modal
                title="Delete Role"
                loading={loading}
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
        </>
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
            first: 8,
            page: 1,
        },
    })

    useEffect(() => {
        void refetch({
            first: 8,
            page: 1,
        })
    }, [refetch])

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
                description: role.truncated_description,
            }
        })
    }

    const getRolesActions = (key: number): JSX.Element | undefined => {
        const role = roles.find((role) => +role.id === key)

        if (role) {
            return (
                <div className="flex flex-row items-center gap-4">
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

    const renderFooter = (): JSX.Element | null => {
        if (pageInfo.lastPage > 1) {
            return (
                <div className="flex w-full items-center justify-center">
                    <Paginate {...pageInfo} onPageChange={onPageChange} />
                </div>
            )
        }
        return null
    }

    return (
        <>
            <PageTitle title="Manage Roles" />
            <div className="flex flex-col items-center">
                <div className="flex h-full flex-col gap-4">
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
                        footer={renderFooter()}
                    />
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
        </>
    )
}

export default RolesPage
