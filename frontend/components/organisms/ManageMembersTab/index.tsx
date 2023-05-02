import Button from '@/components/atoms/Button'
import type { OptionType } from '@/components/molecules/Dropdown'
import Dropdown from '@/components/molecules/Dropdown'
import TeamUserCard from '@/components/molecules/TeamUserCard'
import Modal from '@/components/templates/Modal'
import ADD_MEMBER from '@/helpers/graphql/mutations/add_member'
import GET_ALL_USERS from '@/helpers/graphql/queries/get_all_users'
import GET_MEMBERS from '@/helpers/graphql/queries/get_members'
import GET_TEAM from '@/helpers/graphql/queries/get_team'
import GET_TEAM_ROLES from '@/helpers/graphql/queries/get_team_roles'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Paginate from '../Paginate'

type RoleType = {
    id: number
    name: string
}

type UserType = {
    id: number
    first_name: string
    last_name: string
    avatar: string
    role?: RoleType
}

type MemberType = {
    id: number
    user: UserType
    teamRole: RoleType
}

interface Team {
    id: number
    name: string
    teamLeader: UserType
}

type FormValues = {
    user: { value: number; label: string }
    role: { value: number; label: string }
}

type Props = {
    team: Team
    isUserTeamLeader: boolean
}

const ManageMembersTab = ({ team, isUserTeamLeader }: Props): JSX.Element => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [dropdownErrors, setDropdownErrors] = useState({ user: '', role: '' })

    const { data, loading, error, refetch } = useQuery(GET_MEMBERS, {
        variables: {
            teamSlug: router.query.slug,
            first: 15,
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

    const [addMember] = useMutation(ADD_MEMBER, {
        refetchQueries: [{ query: GET_TEAM, variables: { slug: router.query.slug } }],
    })

    const { handleSubmit, reset, setValue, control } = useForm<FormValues>({
        defaultValues: {
            user: { value: 0, label: '' },
            role: { value: 0, label: '' },
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    if (loading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error.message}`)
        return <div></div>
    }

    const users: OptionType[] = usersData.data?.allUsers.map((user: UserType) => ({
        value: user.id,
        label: `${user.first_name ?? ''} ${user.last_name ?? ''}`,
    }))

    const roles: OptionType[] = teamRoles.data?.teamRoles.map((role: RoleType) => ({
        value: role.id,
        label: role.name,
    }))

    const { paginatorInfo, data: memberList } = data.teamMembers

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await refetch({ teamSlug: router.query.slug, first, page })
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
                    user_id: data.user.value,
                    team_role_id: data.role.value,
                    team_id: team.id,
                },
            })
                .then(() => {
                    reset()
                    setShowModal(false)
                    successNotify('Successfully added member!')

                    const { perPage, lastPage, currentPage } = paginatorInfo
                    void refetch({
                        page:
                            memberList.length === perPage && lastPage === currentPage
                                ? (lastPage as number) + 1
                                : lastPage,
                    })

                    void usersData.refetch({ filter: { team: team?.id } })
                })
                .catch(() => {
                    errorNotify('There was an Error!')
                })
        }
        setDropdownErrors(errorFields)
    }

    return (
        <div className="flex w-full flex-col gap-4">
            {isUserTeamLeader && (
                <div className="flex justify-end">
                    <Button
                        usage="stroke"
                        size="large"
                        onClick={() => {
                            setShowModal(true)
                            reset({
                                role: { value: roles[0].value, label: roles[0].label },
                                user: { value: users[0].value, label: users[0].label },
                            })
                        }}
                    >
                        Add member
                    </Button>
                    <Modal
                        title="Add Member"
                        submitLabel="Add"
                        isOpen={showModal}
                        handleSubmit={handleSubmit(onSubmit)}
                        handleClose={() => {
                            setShowModal(false)
                            setValue('role', { value: 0, label: '' })
                            setValue('user', { value: 0, label: '' })
                        }}
                    >
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            id="add-member-form"
                            className="w-full"
                        >
                            <div className="flex justify-center gap-2">
                                <div className="flex w-full flex-col">
                                    <Controller
                                        control={control}
                                        name="user"
                                        defaultValue={{ value: 0, label: '' }}
                                        render={({ field: { onChange, value } }) => (
                                            <Dropdown
                                                key="user-select"
                                                label="Select User"
                                                options={users}
                                                onChange={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                    {dropdownErrors.user.length > 0 && (
                                        <span className="ml-2 text-sm text-primary-red">
                                            {dropdownErrors.user}
                                        </span>
                                    )}
                                </div>
                                <div className="flex w-full flex-col">
                                    <Controller
                                        control={control}
                                        name="role"
                                        defaultValue={{ value: 0, label: '' }}
                                        render={({ field: { onChange, value } }) => (
                                            <Dropdown
                                                key="role-select"
                                                label="Select Role"
                                                options={roles}
                                                onChange={onChange}
                                                value={value}
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
                </div>
            )}
            <div className="grid grid-flow-row gap-4 lg:grid-cols-3 xl:grid-cols-5">
                {memberList.map((member: MemberType, index: number) => {
                    return (
                        <TeamUserCard
                            key={index}
                            id={member.id}
                            userId={member.user.id}
                            name={`${member.user.first_name} ${member.user.last_name}`}
                            role={member.teamRole?.name ?? ''}
                            avatar={member.user?.avatar}
                            isLeader={member.user.id === team.teamLeader.id}
                            hasActions={isUserTeamLeader}
                            roles={roles}
                            teamId={team.id}
                            teamSlug={router.query.slug}
                            refetch={async () => {
                                const { perPage, currentPage } = paginatorInfo
                                await refetch({
                                    first: perPage,
                                    page: currentPage,
                                })
                            }}
                            deleteRefetch={async () => {
                                const { perPage, currentPage } = paginatorInfo
                                await refetch({
                                    first: perPage,
                                    page:
                                        memberList.length === 1 && currentPage > 1
                                            ? currentPage - 1
                                            : currentPage,
                                })
                                void usersData.refetch({ filter: { team: team?.id } })
                            }}
                        />
                    )
                })}
            </div>
            {paginatorInfo.lastPage > 1 && (
                <div className="px-2.5 py-4">
                    <Paginate {...paginatorInfo} onPageChange={onPageChange} />
                </div>
            )}
        </div>
    )
}

export default ManageMembersTab
