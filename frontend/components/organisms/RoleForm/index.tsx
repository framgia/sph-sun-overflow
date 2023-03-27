import Button from '@/components/atoms/Button'
import CREATE_ROLE from '@/helpers/graphql/mutations/create_role'
import UPDATE_ROLE from '@/helpers/graphql/mutations/update_role'
import GET_PERMISSIONS from '@/helpers/graphql/queries/get_permissions'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation, useQuery } from '@apollo/client'
import { Checkbox, Input } from '@material-tailwind/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export type PermissionType = {
    id: number
    name: string
}

export type RoleType = {
    id: number | null
    name: string
    description: string
    permissions: PermissionType[]
}

type Props = {
    role?: RoleType
}

type FormValues = {
    name: string
    description: string
    permissions: number[]
}

const RoleForm = ({ role }: Props): JSX.Element => {
    const router = useRouter()
    const selectedPermissions: number[] = role
        ? role?.permissions.map((value) => Number(value.id))
        : []
    const [permissionsForm, setPermissionsForm] = useState(selectedPermissions)
    const [formErrors, setFormErrors] = useState({ name: '', description: '', permissions: '' })

    const {
        data: { permissions } = {},
        loading,
        error,
    } = useQuery(GET_PERMISSIONS, { fetchPolicy: 'network-only' })

    const [createRole] = useMutation(CREATE_ROLE)
    const [updateRole] = useMutation(UPDATE_ROLE)

    const { handleSubmit, control } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    if (loading) return loadingScreenShow()
    if (error) {
        void router.push('/manage/roles')
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
        return permissions.map(
            (permission: PermissionType, index: number): JSX.Element => (
                <Checkbox
                    key={index}
                    id={`permission-${permission.id}`}
                    defaultChecked={selectedPermissions?.includes(Number(permission.id))}
                    value={permission.id}
                    label={permission.name}
                    onChange={onChangeCheckbox}
                />
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
                    void router.push('/manage/roles')
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
                            setTimeout(() => {
                                void router.push('/manage/roles')
                            }, 1)
                        })
                        .catch(() => {
                            errorNotify('There was an Error!')
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
                        setTimeout(() => {
                            void router.push('/manage/roles')
                        }, 1)
                    })
                    .catch(() => {
                        errorNotify('There was an Error!')
                    })
            }
        }

        setFormErrors(errorFields)
    }

    return (
        <div className="flex w-4/5 flex-col gap-2 py-6">
            <div className="flex shrink">
                <div className="text-primary-gray">
                    <Button
                        usage="back-button"
                        onClick={() => {
                            void router.push('/manage/roles')
                        }}
                    >
                        <span className="text-xl">{'<'} Go Back</span>
                    </Button>
                </div>
            </div>
            <div className="mb-2 pt-2 text-2xl font-bold">{role ? 'Manage' : 'Add'} Role</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 flex w-full pr-36">
                    <div className="w-96 pr-5">
                        <Controller
                            control={control}
                            name="name"
                            defaultValue={role?.name ?? ''}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    name="name"
                                    value={value}
                                    size="lg"
                                    color="gray"
                                    error={formErrors.name.length > 0}
                                    className="shadow-md"
                                    label="Name"
                                    onChange={onChange}
                                />
                            )}
                        />
                        {formErrors.name.length > 0 && (
                            <span className="ml-2 text-sm text-primary-red">{formErrors.name}</span>
                        )}
                    </div>
                    <div className="w-96 ">
                        <Controller
                            control={control}
                            name="description"
                            defaultValue={role?.description ?? ''}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    name="description"
                                    value={value}
                                    size="lg"
                                    color="gray"
                                    error={formErrors.description.length > 0}
                                    className="shadow-md"
                                    label="Description"
                                    onChange={onChange}
                                />
                            )}
                        />
                        {formErrors.description.length > 0 && (
                            <span className="ml-2 text-sm text-primary-red">
                                {formErrors.description}
                            </span>
                        )}
                    </div>
                </div>
                <div className="mt-12">
                    <div className="mb-2 text-2xl font-bold">Set Permissions</div>
                    {formErrors.permissions.length > 0 && (
                        <span className="ml-2 mb-2 text-sm text-primary-red">
                            {formErrors.permissions}
                        </span>
                    )}
                    <div className="mb-4 grid w-full grid-cols-6">
                        {renderPermissionSelection()}
                    </div>
                </div>
                <Button usage="primary" additionalClass="float-right mt-5 mr-16" type="submit">
                    Save
                </Button>
            </form>
        </div>
    )
}

export default RoleForm
