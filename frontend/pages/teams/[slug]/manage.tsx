import Button from '@/components/atoms/Button'
import type { OptionType } from '@/components/molecules/Dropdown'
import Dropdown from '@/components/molecules/Dropdown'
import ManageMembersActions from '@/components/organisms/ManageMembersActions'
import Paginate from '@/components/organisms/Paginate'
import type { ColumnType, DataType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
import Modal from '@/components/templates/Modal'
import ADD_MEMBER from '@/helpers/graphql/mutations/add_member'
import GET_ALL_USERS from '@/helpers/graphql/queries/get_all_users'
import GET_MEMBERS from '@/helpers/graphql/queries/get_members'
import GET_TEAM from '@/helpers/graphql/queries/get_team'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation, useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import GET_TEAM_ROLES from '../../../helpers/graphql/queries/get_team_roles'
import type { UserType } from '../../questions/[slug]/index'

const columns: ColumnType[] = [
    {
        title: 'Name',
        key: 'name',
    },
    {
        title: 'Role',
        key: 'role',
    },
    {
        title: 'Action',
        key: 'action',
        width: 20,
    },
]

interface IMember {
    id: number
    teamRole: {
        id: number
        name: string
    }
    user: {
        id: number
        first_name: string
        last_name: string
    }
}

type FormValues = {
    user: number
    role: number
}

const TeamManage = (): JSX.Element => {
    const router = useRouter()
    const [activeModal, setActiveModal] = useState('')
    const [dropdownErrors, setDropdownErrors] = useState({ user: '', role: '' })
    const [isOpen, setIsOpen] = useState(false)
    const { data: { team } = {} } = useQuery(GET_TEAM, {
        variables: {
            slug: router.query.slug,
        },
    })
    const { data, loading, error, refetch } = useQuery(GET_MEMBERS, {
        variables: {
            teamSlug: router.query.slug,
            first: 5,
            page: 0,
        },
    })
    const usersData = useQuery(GET_ALL_USERS, {
        variables: {
            filter: {
                team: team?.id,
            },
        },
    })
    const teamRoles = useQuery(GET_TEAM_ROLES)

    const [addMember] = useMutation(ADD_MEMBER)

    const { handleSubmit, reset, control } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    useEffect(() => {
        if (data) {
            void usersData.refetch({ filter: { team: team?.id } })
            void teamRoles.refetch()
        }
    }, [data, team, usersData, teamRoles])

    if (loading) return loadingScreenShow()
    if (error) {
        void router.push(`/teams/${router.query.slug as string}`)
        return <span>{errorNotify(`Error! ${error.message}`)}</span>
    }

    const { paginatorInfo, data: memberList } = data.teamMembers

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await refetch({ teamSlug: router.query.slug, first, page })
    }

    const parseGetMembers = (memberList: IMember[]): DataType[] => {
        const tableList: DataType[] = memberList.map((member) => {
            return {
                key: member.id,
                user_id: member.user.id,
                name: `${member.user.first_name} ${member.user.last_name}`,
                role: member.teamRole.name,
            }
        })
        return tableList
    }

    const users: OptionType[] = usersData.data?.allUsers.map((user: UserType) => ({
        id: user.id,
        name: `${user.first_name ?? ''} ${user.last_name ?? ''}`,
    }))

    const roles: OptionType[] = teamRoles.data?.teamRoles.map((role: OptionType) => ({
        id: role.id,
        name: role.name,
    }))

    const openModal = (modal: string): void => {
        setActiveModal(modal)
        setIsOpen(true)
    }

    const closeModal = (modal: string): void => {
        setActiveModal(modal)
        setIsOpen(false)
    }

    const getManageMemberActions = (key: number): JSX.Element | undefined => {
        const dataSource = parseGetMembers(memberList).find((member) => Number(member.key) === key)

        if (dataSource) {
            return (
                <ManageMembersActions
                    id={Number(dataSource.key)}
                    user_id={Number(dataSource.user_id)}
                    team_id={team.id}
                    name={String(dataSource.name)}
                    role={String(dataSource.role)}
                    roles={roles}
                    refetchHandler={refetchHandler}
                />
            )
        }
    }

    const refetchHandler = async (isDelete = false): Promise<void> => {
        await refetch({
            teamSlug: router.query.slug,
            first: paginatorInfo.perPage,
            page:
                isDelete && memberList.length === 1 && paginatorInfo.currentPage > 1
                    ? paginatorInfo.currentPage - 1
                    : paginatorInfo.currentPage,
        })
    }

    const onSubmit = (data: FormValues): void => {
        let valid = true
        const dataFields = [
            { key: 'user', display: 'User' },
            { key: 'role', display: 'Role' },
        ]
        const errorFields = { user: '', role: '' }

        dataFields.forEach((field) => {
            const key = field.key as keyof typeof data

            if (!data[key]) {
                valid = false
                errorFields[key] = `${field.display} must not be empty`
            }
        })

        if (valid) {
            addMember({
                variables: {
                    user_id: data.user,
                    team_role_id: data.role,
                    team_id: team.id,
                },
            })
                .then(() => {
                    reset()
                    void refetchHandler()
                    closeModal('add')
                    successNotify('Successfully added member!')
                })
                .catch(() => {
                    errorNotify('There was an Error!')
                })
        }

        setDropdownErrors(errorFields)
    }

    return (
        <div className="flex w-full flex-col gap-4 divide-y-2 p-8">
            <h1 className="text-3xl font-bold">{team?.name}</h1>
            <div className="flex h-full flex-col gap-4">
                <div className="mt-4 flex items-center justify-between">
                    <Link
                        href={`/teams/${router.query.slug as string}`}
                        className="text-lg text-secondary-text"
                    >
                        {'< Go back'}
                    </Link>
                    <Button
                        onClick={() => {
                            openModal('add')
                        }}
                    >
                        Add Member
                    </Button>
                    {activeModal === 'add' && isOpen && (
                        <Modal
                            title="Add Member"
                            submitLabel="Add"
                            isOpen={isOpen}
                            handleSubmit={handleSubmit(onSubmit)}
                            handleClose={() => {
                                closeModal('add')
                            }}
                        >
                            <form onSubmit={handleSubmit(onSubmit)} id="add-member-form">
                                <div className="flex w-full gap-2">
                                    <div className="flex flex-col">
                                        <Controller
                                            control={control}
                                            name="user"
                                            defaultValue={users.length && users[0].id}
                                            render={({ field: { onChange, value } }) => (
                                                <Dropdown
                                                    key="user-select"
                                                    name="user"
                                                    label="Select User"
                                                    options={users}
                                                    onChange={onChange}
                                                    value={value}
                                                    isError={dropdownErrors.user.length > 0}
                                                />
                                            )}
                                        />
                                        {dropdownErrors.user.length > 0 && (
                                            <span className="ml-2 text-sm text-primary-red">
                                                {dropdownErrors.user}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <Controller
                                            control={control}
                                            name="role"
                                            defaultValue={roles[0].id}
                                            render={({ field: { onChange, value } }) => (
                                                <Dropdown
                                                    key="role-select"
                                                    name="role"
                                                    label="Select Role"
                                                    options={roles}
                                                    onChange={onChange}
                                                    value={value}
                                                    isError={dropdownErrors.role.length > 0}
                                                />
                                            )}
                                        />
                                        {dropdownErrors.role.length > 0 && (
                                            <span className="ml-2 text-sm text-primary-red">
                                                {dropdownErrors.role}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </Modal>
                    )}
                </div>
                <div className="overflow-hidden border border-black">
                    <Table
                        columns={columns}
                        dataSource={parseGetMembers(memberList)}
                        actions={getManageMemberActions}
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

export default TeamManage
