import Checkbox from '@/components/atoms/Checkbox'
import Icons from '@/components/atoms/Icons'
import InputField from '@/components/atoms/InputField'
import TextArea from '@/components/atoms/TextArea'
import Modal from '@/components/templates/Modal'
import CREATE_ROLE from '@/helpers/graphql/mutations/create_role'
import UPDATE_ROLE from '@/helpers/graphql/mutations/update_role'
import GET_PERMISSIONS from '@/helpers/graphql/queries/get_permissions'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation, useQuery } from '@apollo/client'
import { groupBy } from 'lodash'
import React, { useEffect, useState } from 'react'

export type PermissionType = {
    id: number
    name: string
    slug: string
    category: string
}

export type RoleType = {
    id: number | null
    name: string
    description: string
    slug: string
    permissions?: PermissionType[]
}

type Props = {
    role?: RoleType
    isOpen: boolean
    closeModal: () => void
    refetch: () => void
    view?: boolean
}

const RoleFormModal = ({ role, isOpen, closeModal, refetch, view = false }: Props): JSX.Element => {
    const [permissionsForm, setPermissionsForm] = useState<number[]>([])
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([])
    const [roleName, setRoleName] = useState(role?.name ?? '')
    const [roleDescription, setRoleDescription] = useState(role?.description ?? '')

    useEffect(() => {
        const selectedPermissions: number[] = role?.permissions
            ? role?.permissions.map((value) => Number(value.id))
            : []

        setSelectedPermissions(selectedPermissions)
        setPermissionsForm(selectedPermissions)
        setRoleName(role?.name ?? '')
        setRoleDescription(role?.description ?? '')
    }, [role, refetch])

    const [formErrors, setFormErrors] = useState({ name: '', description: '', permissions: '' })
    const [modalView, setModalView] = useState(view)

    const formTitle = role?.name ? (modalView ? 'View Role' : 'Edit Role') : 'Add New Role'
    const submitLabel = modalView ? 'Edit Role' : formTitle === 'Edit Role' ? 'Save' : 'Add'

    const {
        data: { permissions } = {},
        loading,
        error,
    } = useQuery(GET_PERMISSIONS, {
        fetchPolicy: 'network-only',
    })

    const [createRole] = useMutation(CREATE_ROLE)
    const [updateRole] = useMutation(UPDATE_ROLE)

    if (loading) loadingScreenShow()
    if (error) {
        return <span>{errorNotify(`Error! ${error.message}`)}</span>
    }

    const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value, checked } = e.target

        if (checked) {
            setPermissionsForm([...permissionsForm, Number(value)])
        } else {
            setPermissionsForm(permissionsForm?.filter((e) => e !== Number(value)))
        }
    }

    const renderPermissionSelection = (): JSX.Element[] => {
        const groupedPermissions = Object.entries(groupBy(permissions, 'category'))
        return groupedPermissions.map(
            (group): JSX.Element => (
                <div className="h-32 w-28 space-y-1 p-2" key={group[0]}>
                    <div className="text-xs font-medium capitalize text-neutral-900">
                        {group[0]}
                    </div>
                    {group[1].map(
                        (permission: PermissionType): JSX.Element => (
                            <Checkbox
                                key={permission.id}
                                id={`permission-${permission.id}`}
                                defaultChecked={permissionsForm?.includes(Number(permission.id))}
                                value={permission.id}
                                label={`${permission.name}`}
                                onChange={onChangeCheckbox}
                            />
                        )
                    )}
                </div>
            )
        )
    }

    const renderPermissionView = (rolePermissions: PermissionType[] | undefined): JSX.Element[] => {
        const groupedPermissions = Object.entries(groupBy(rolePermissions, 'category'))
        return groupedPermissions.map(
            (group): JSX.Element => (
                <div className="h-32 w-28 space-y-1 p-2" key={group[0]}>
                    <div className="text-xs font-medium capitalize text-neutral-900">
                        {group[0]}
                    </div>
                    <ul className="flex flex-col justify-start">
                        {group[1].map(
                            (permission): JSX.Element => (
                                <li
                                    key={permission.id}
                                    className="flex items-center space-x-1 text-center text-xs font-normal text-neutral-900"
                                >
                                    <Icons name="dot" />
                                    {permission.name}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )
        )
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            name: { value: string }
            description: { value: string }
        }

        const name = target.name.value
        const description = target.description.value

        let valid = true
        const errorFields = { name: '', description: '', permissions: '' }

        if (name === '') {
            valid = false
            errorFields.name = `Name must not be empty`
        }

        if (description === '') {
            valid = false
            errorFields.description = `Description must not be empty`
        }

        if (permissionsForm.length === 0) {
            valid = false
            errorFields.permissions = 'Must select at least one permission'
        }

        if (valid) {
            if (role) {
                const matchPermissions: number[] = []

                permissionsForm.forEach((permission) => {
                    if (selectedPermissions.includes(permission)) {
                        matchPermissions.push(permission)
                    }
                })

                if (
                    matchPermissions.length === permissionsForm.length &&
                    matchPermissions.length === selectedPermissions.length &&
                    role.name === name &&
                    role.description === description
                ) {
                    errorNotify('No changes were made!')
                    closeModal()
                } else {
                    updateRole({
                        variables: {
                            id: role.id,
                            name,
                            description,
                            permissions: permissionsForm,
                        },
                    })
                        .then(() => {
                            successNotify('Successfully updated role!')
                            refetch()
                            setModalView(view)
                            closeModal()
                        })
                        .catch((e) => {
                            errorNotify(e.message)
                        })
                }
            } else {
                createRole({
                    variables: {
                        name,
                        description,
                        permissions: permissionsForm,
                    },
                })
                    .then(() => {
                        successNotify('Successfully created role!')
                        refetch()
                        closeModal()
                        setPermissionsForm([])
                    })
                    .catch((e) => {
                        errorNotify(e.message)
                    })
            }
        }

        setFormErrors(errorFields)
    }

    const reset = (): void => {
        setRoleName(role?.name ?? '')
        setRoleDescription(role?.description ?? '')
        setPermissionsForm(selectedPermissions ?? [])
    }

    return (
        <Modal
            title={formTitle}
            submitLabel={submitLabel}
            isOpen={isOpen}
            handleClose={() => {
                setModalView(view)
                closeModal()
                reset()
                setFormErrors({ name: '', description: '', permissions: '' })
            }}
            handleSubmit={
                modalView
                    ? () => {
                          setModalView(false)
                      }
                    : undefined
            }
        >
            {modalView ? (
                <div className="flex w-full flex-col justify-start gap-4 font-medium">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-gray-900">Role Name</span>
                        <span className="ml-2 text-gray-500">{roleName}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-gray-900">Description</span>
                        <span className="ml-2 text-gray-500">{roleDescription}</span>
                    </div>
                    <div>
                        <div className="text-neutral-800 text-sm font-medium">Set Permissions</div>
                        <div className="grid h-72 w-full grid-cols-4 overflow-y-auto rounded-md border border-neutral-300 p-2">
                            {renderPermissionView(role?.permissions)}
                        </div>
                    </div>
                </div>
            ) : (
                <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
                    <div>
                        <InputField
                            name="name"
                            value={roleName}
                            label="Role Name"
                            onChange={(e) => {
                                setRoleName(e.target.value)
                            }}
                            isValid={formErrors.name.length === 0}
                            error={formErrors.name}
                        />
                    </div>
                    <div>
                        <TextArea
                            name="description"
                            value={roleDescription}
                            label="Description"
                            onChange={(e) => {
                                setRoleDescription(e.target.value)
                            }}
                            isValid={formErrors.description.length === 0}
                            error={formErrors.description}
                        />
                    </div>
                    <div>
                        <div className="text-neutral-800 text-sm font-medium">Set Permissions</div>
                        <div className="grid h-72 w-full grid-cols-4 overflow-y-auto rounded-md border border-neutral-300 p-2">
                            {renderPermissionSelection()}
                        </div>
                        {formErrors.permissions.length > 0 && (
                            <span className="mb-2 text-xs text-primary-900">
                                {formErrors.permissions}
                            </span>
                        )}
                    </div>
                </form>
            )}
        </Modal>
    )
}

export default RoleFormModal
