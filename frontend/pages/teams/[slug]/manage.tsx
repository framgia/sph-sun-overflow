import Button from '@/components/atoms/Button'
import Dropdown, { OptionType } from '@/components/molecules/Dropdown'
import Paginate from '@/components/organisms/Paginate'
import Table, { ColumnType, DataType } from '@/components/organisms/Table'
import GET_MEMBERS from '@/helpers/graphql/queries/get_members'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery, useLazyQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Modal from '@/components/templates/Modal'
import { useEffect, useState } from 'react'
import GET_ALL_USERS from '@/helpers/graphql/queries/get_all_users'
import GET_TEAM_ROLES from '../../../helpers/graphql/queries/get_team_roles'
import { UserType } from '../../questions/[slug]/index'
import ManageMembersActions from '@/components/organisms/ManageMembersActions'

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

const TeamManage = () => {
    const router = useRouter()
    const [activeModal, setActiveModal] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const { data, loading, error, refetch } = useQuery(GET_MEMBERS, {
        variables: {
            teamSlug: router.query.slug,
            first: 5,
            page: 0,
        },
    })
    const [getAllUsers, usersData] = useLazyQuery(GET_ALL_USERS)
    const [getTeamRoles, teamRoles] = useLazyQuery(GET_TEAM_ROLES)

    useEffect(() => {
        if (!loading) {
            getAllUsers({
                variables: {
                    filter: {
                        team: +data?.teamMembers.data[0]?.team.id ?? null,
                    },
                },
            })
            getTeamRoles()
        }
    }, [getAllUsers, getTeamRoles, data, loading])

    if (loading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error.message}`)
        router.push(`/teams/${router.query.slug}`)
        return
    }

    const { paginatorInfo, data: memberList } = data.teamMembers

    const onPageChange = (first: number, page: number) => {
        refetch({ teamSlug: router.query.slug, first, page })
    }

    const parseGetMembers = (memberList: IMember[]) => {
        let tableList: DataType[] = memberList.map((member) => {
            return {
                key: member.id,
                name: `${member.user.first_name} ${member.user.last_name}`,
                role: member.teamRole.name,
            } as DataType
        })
        return tableList
    }

    const users: OptionType[] = usersData.data?.allUsers.map((user: UserType) => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
    }))

    const roles: OptionType[] = teamRoles.data?.teamRoles.map((role: OptionType) => ({
        id: role.id,
        name: role.name,
    }))

    const handleSubmit = () => {
        //member added
    }

    const openModal = (modal: string) => {
        ;``
        setActiveModal(modal)
        setIsOpen(true)
    }

    const closeModal = (modal: string) => {
        setActiveModal(modal)
        setIsOpen(false)
    }

    const getManageMemberActions = (key: number): JSX.Element | undefined => {
        const dataSource = parseGetMembers(memberList).find((member) => Number(member.key) === key)

        if (dataSource) {
            return (
                <ManageMembersActions
                    id={Number(dataSource.key)}
                    name={String(dataSource.name)}
                    role={String(dataSource.role)}
                    roles={roles}
                />
            )
        }
    }

    return (
        <div className="flex w-full flex-col gap-4 divide-y-2 p-8">
            <h1 className="text-3xl font-bold">{memberList[0].team.name || 'Undefined'}</h1>
            <div className="flex h-full flex-col gap-4">
                <div className="mt-4 flex items-center justify-between">
                    <Link
                        href={`/teams/${router.query.slug}`}
                        className="text-lg text-secondary-text"
                    >
                        {'< Go back'}
                    </Link>
                    <Button onClick={() => openModal('add')}>Add Member</Button>
                    {activeModal === 'add' && isOpen && (
                        <Modal
                            title="Add Member"
                            submitLabel="Add"
                            isOpen={isOpen}
                            handleSubmit={handleSubmit}
                            handleClose={() => closeModal('add')}
                        >
                            <form onSubmit={handleSubmit} id="add-member-form">
                                <div className="flex w-full gap-2">
                                    <Dropdown
                                        key="user-select"
                                        name="user"
                                        label="Select User"
                                        options={users}
                                    />
                                    <Dropdown
                                        key="role-select"
                                        name="role"
                                        label="Select Role"
                                        options={roles}
                                    />
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
