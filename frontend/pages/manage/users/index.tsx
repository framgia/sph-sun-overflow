import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Dropdown from '@/components/molecules/Dropdown'
import Paginate from '@/components/organisms/Paginate'
import type { ColumnType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
import Modal from '@/components/templates/Modal'
import ASSIGN_ROLE from '@/helpers/graphql/mutations/assign_role'
import GET_ROLES_SELECTION from '@/helpers/graphql/queries/get_role_selection'
import GET_USERS_ADMIN from '@/helpers/graphql/queries/get_users_admin'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation, useQuery, type ApolloError } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const columns: ColumnType[] = [
    {
        title: 'Name',
        key: 'name',
    },
    {
        title: 'Questions Posted',
        key: 'question_count',
    },
    {
        title: 'Answers Posted',
        key: 'answer_count',
    },
    {
        title: 'Role',
        key: 'role',
    },
    {
        title: 'Actions',
        key: 'action',
        width: 20,
    },
]

type FormValues = {
    role: RoleMapType
    userId: number
}

type TUser = {
    id: number
    first_name: string
    last_name: string
    question_count: number
    answer_count: number
    role: {
        name: string
    }
    slug: string
}
type RoleMapType = { value: number; label: string }

type TUserConverted = {
    id: number
    name: string
    question_count: number
    answer_count: number
    role: string
    key: number
    slug: string
}

const convertUserArr = (oldArr: TUser[]): TUserConverted[] => {
    return oldArr.map((user, index) => {
        return {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            question_count: user.question_count,
            answer_count: user.answer_count,
            role: user.role.name,
            key: index,
            slug: user.slug,
        }
    })
}

const getRole = (roleArr: RoleMapType[], roleStr: string): RoleMapType => {
    return roleArr.find((role) => role.label === roleStr) ?? { value: 0, label: '' }
}

const AdminUsers = (): JSX.Element => {
    const router = useRouter()
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const usersQuery = useQuery(GET_USERS_ADMIN, {
        variables: {
            first: 10,
            page: 1,
            filter: { keyword: '', role_id: null },
            sort: { reputation: null },
        },
    })
    const rolesQuery = useQuery(GET_ROLES_SELECTION)
    const [assignRole] = useMutation(ASSIGN_ROLE)
    const roles = rolesQuery?.data?.roles ?? []
    const mapRolesForSelection = roles.map((role: { id: number; name: string }) => {
        return {
            value: role.id,
            label: role.name,
        }
    })

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { isDirty },
    } = useForm<FormValues>({
        defaultValues: {
            userId: 0,
            role: { value: 0, label: '' },
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    const closeEdit = (): void => {
        setIsOpenEdit(!isOpenEdit)
        setValue('role', { value: 0, label: '' })
        setValue('userId', 0)
    }

    const clickableArr = [
        {
            column: 'name',
            onClick: (slug: string): void => {
                void router.push({
                    pathname: '/manage/users/[slug]',
                    query: { slug },
                })
            },
        },
    ]
    if (usersQuery.loading) return loadingScreenShow()
    if (usersQuery.error) {
        errorNotify(`Error! ${usersQuery.error?.message ?? ''}`)
        return <></>
    }
    const {
        users: { data: userArr, paginatorInfo },
    } = usersQuery.data
    const newUserArr = convertUserArr(userArr)

    const editAction = (key: number): JSX.Element => {
        return (
            <Button
                usage="toggle-modal"
                onClick={() => {
                    setIsOpenEdit(true)
                    reset({
                        role: getRole(mapRolesForSelection, newUserArr[key].role),
                        userId: newUserArr[key].id,
                    })
                }}
            >
                <Icons name="pencil" />
            </Button>
        )
    }

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await usersQuery.refetch({ first, page })
    }

    const onSubmit = async (data: FormValues): Promise<void> => {
        if (!isDirty) {
            errorNotify(`Error: No changes were made`)
            closeEdit()
            return
        }
        closeEdit()
        await assignRole({ variables: { userId: data.userId, roleId: data.role.value } })
            .then((data) => {
                successNotify('Roles Successfully Changed')
            })
            .catch((error: ApolloError) => {
                errorNotify(`Error: ${error.message}`)
            })
    }

    const renderFooter = (): JSX.Element | null => {
        if (paginatorInfo.lastPage > 1) {
            return (
                <div className="flex w-full items-center justify-center">
                    <Paginate {...paginatorInfo} onPageChange={onPageChange} />
                </div>
            )
        }

        return null
    }

    return (
        <div className="flex w-full flex-col p-4">
            <div className="flex h-full flex-col py-4">
                <Table
                    columns={columns}
                    dataSource={newUserArr}
                    actions={editAction}
                    footer={renderFooter()}
                    clickableArr={clickableArr}
                />
                {isOpenEdit && (
                    <Modal
                        title={`Assign Role`}
                        submitLabel="Save"
                        isOpen={isOpenEdit}
                        handleClose={closeEdit}
                        handleSubmit={handleSubmit(onSubmit)}
                    >
                        <form className="w-full">
                            <Controller
                                control={control}
                                name="role"
                                defaultValue={{ value: 0, label: '' }}
                                render={({ field: { onChange, value } }) => (
                                    <Dropdown
                                        key="role-select"
                                        label="Role"
                                        options={mapRolesForSelection}
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                            />
                        </form>
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default AdminUsers
