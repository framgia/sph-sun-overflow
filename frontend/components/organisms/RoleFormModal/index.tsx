import Checkbox from '@/components/atoms/Checkbox'
import Icons from '@/components/atoms/Icons'
import InputField from '@/components/atoms/InputField'
import TextArea from '@/components/atoms/TextArea'
import Modal from '@/components/templates/Modal'
import CREATE_ROLE from '@/helpers/graphql/mutations/create_role'
import UPDATE_ROLE from '@/helpers/graphql/mutations/update_role'
import GET_PERMISSIONS from '@/helpers/graphql/queries/get_permissions'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation, useQuery } from '@apollo/client'
import { groupBy } from 'lodash'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

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

type FormValues = {
    name: string
    description: string
    permissions: number[]
}

const RoleFormModal = ({ role, isOpen, closeModal, refetch, view = false }: Props): JSX.Element => {
    const [permissionsForm, setPermissionsForm] = useState<number[]>([])
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([])
    const [name, setName] = useState(role?.name ?? '')
    const [description, setDescription] = useState(role?.description ?? '')

    const { handleSubmit, control, reset } = useForm<FormValues>({
        defaultValues: {
            name,
            description,
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    useEffect(() => {
        const selectedPermissions: number[] = role?.permissions
            ? role?.permissions.map((value) => Number(value.id))
            : []

        setSelectedPermissions(selectedPermissions)
        setPermissionsForm(selectedPermissions)
        setName(role?.name ?? '')
        setDescription(role?.description ?? '')

        if (role) {
            reset({
                name,
                description,
            })
        }
    }, [role])

    const [formErrors, setFormErrors] = useState({ name: '', description: '', permissions: '' })
    const [modalView, setModalView] = useState(view)

    const formTitle = role?.name ? (modalView ? 'View Role' : 'Edit Role') : 'Add Role'

    const { data: { permissions } = {}, error } = useQuery(GET_PERMISSIONS, {
        fetchPolicy: 'network-only',
    })

    const [createRole] = useMutation(CREATE_ROLE)
    const [updateRole] = useMutation(UPDATE_ROLE)

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
                <div className="space-y-1 p-2" key={group[0]}>
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
                <div className="space-y-1 p-2" key={group[0]}>
                    <div className="text-xs font-medium capitalize text-neutral-900">
                        {group[0]}
                    </div>
                    <ul className="flex flex-col justify-start">
                        {group[1].map(
                            (permission): JSX.Element => (
                                <li
                                    key={permission.id}
                                    className="flex items-center space-x-1 text-xs font-normal text-neutral-900"
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

    const onSubmit = async (data: FormValues): Promise<void> => {
        let valid = true
        const dataFields = [
            { key: 'name', display: 'Name' },
            { key: 'description', display: 'Description' },
        ]
        const errorFields = { name: '', description: '', permissions: '' }

        dataFields.forEach((field) => {
            const key = field.key as keyof typeof data

            if (!data[key]) {
                valid = false
                errorFields[key] = `${field.display} must not be empty`
            }
        })

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
                    role?.name === data.name &&
                    role?.description === data.description
                ) {
                    errorNotify('No changes were made!')
                } else {
                    updateRole({
                        variables: {
                            id: role.id,
                            name: data.name,
                            description: data.description,
                            permissions: permissionsForm,
                        },
                    })
                        .then(() => {
                            successNotify('Successfully updated role!')
                            refetch()
                            setModalView(view)
                        })
                        .catch(() => {
                            errorNotify('There was an Error!')
                        })
                        .finally(() => {
                            closeModal()
                        })
                }
            } else {
                createRole({
                    variables: {
                        name: data.name,
                        description: data.description,
                        permissions: permissionsForm,
                    },
                })
                    .then(() => {
                        successNotify('Successfully created role!')
                        refetch()
                    })
                    .catch(() => {
                        errorNotify('There was an Error!')
                    })
                    .finally(() => {
                        closeModal()
                        setPermissionsForm([])
                        reset({
                            name: '',
                            description: '',
                        })
                    })
            }
        }

        setFormErrors(errorFields)
    }

    return (
        <Modal
            title={formTitle}
            submitLabel={modalView ? 'Edit Role' : formTitle}
            isOpen={isOpen}
            handleSubmit={
                modalView
                    ? () => {
                          setModalView(false)
                      }
                    : handleSubmit(onSubmit)
            }
            handleClose={() => {
                setModalView(view)
                closeModal()
            }}
        >
            {modalView ? (
                <div className="flex w-full flex-col justify-start gap-4 font-medium">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-gray-900">Role Name</span>
                        <span className="ml-2 text-gray-500">{name}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-gray-900">Description</span>
                        <span className="ml-2 text-gray-500">{description}</span>
                    </div>
                    <div>
                        <div className="text-neutral-800 text-sm font-medium">Set Permissions</div>
                        <div className="grid h-72 w-full grid-cols-4 overflow-y-auto rounded-md border border-neutral-300 p-2">
                            {renderPermissionView(role?.permissions)}
                        </div>
                    </div>
                </div>
            ) : (
                <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Controller
                            control={control}
                            name="name"
                            defaultValue={name}
                            render={({ field: { onChange, value } }) => (
                                <InputField
                                    name="name"
                                    value={value}
                                    label="Name"
                                    onChange={onChange}
                                    isValid={formErrors.name.length > 0}
                                    error={formErrors.name}
                                />
                            )}
                        />
                        {formErrors.name.length > 0 && (
                            <span className="ml-2 text-sm text-primary-red">{formErrors.name}</span>
                        )}
                    </div>
                    <div>
                        <Controller
                            control={control}
                            name="description"
                            defaultValue={description}
                            render={({ field: { onChange, value } }) => (
                                <TextArea
                                    name="description"
                                    value={value}
                                    label="Description"
                                    onChange={onChange}
                                    isValid={formErrors.name.length > 0}
                                    error={formErrors.name}
                                />
                            )}
                        />
                        {formErrors.description.length > 0 && (
                            <span className="text-sm text-primary-red">
                                {formErrors.description}
                            </span>
                        )}
                    </div>
                    <div>
                        <div className="text-neutral-800 text-sm font-semibold">
                            Set Permissions
                        </div>
                        <div className="grid h-64 w-full grid-cols-4 overflow-y-auto rounded-md border border-neutral-300 p-2">
                            {renderPermissionSelection()}
                        </div>
                        {formErrors.permissions.length > 0 && (
                            <span className="mb-2 text-sm text-primary-red">
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
