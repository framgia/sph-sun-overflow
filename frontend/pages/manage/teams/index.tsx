import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Paginate from '@/components/organisms/Paginate'
import type { ColumnType, DataType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
import Modal from '@/components/templates/Modal'
import { type PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import DELETE_TEAM from '@/helpers/graphql/mutations/delete_team'
import GET_ALL_TEAM_LEADERS from '@/helpers/graphql/queries/get_all_team_leaders'
import GET_TEAMS from '@/helpers/graphql/queries/get_teams'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify, successNotify } from '@/helpers/toast'
import { type UserType } from '@/pages/questions/[slug]'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TeamsFormModal from '../../../components/organisms/TeamsFormModal/index'

type TeamType = {
    id: number
    name: string
    slug: string
    description: string
    members_count: string
    truncated_name: string
    truncated_description: string
    teamLeader: {
        id: number
        first_name: string
        last_name: string
    }
}

type TeamsQuery = {
    getUserTeams: {
        data: TeamType[]
        paginatorInfo: PaginatorInfo
    }
}

const columns: ColumnType[] = [
    {
        title: 'Team Name',
        key: 'name',
        width: 240,
    },
    {
        title: 'Description',
        key: 'description',
        width: 500,
    },
    {
        title: 'Members',
        key: 'members_count',
        width: 96,
    },
    {
        title: 'Actions',
        key: 'action',
        width: 96,
    },
]

const AdminTeams = (): JSX.Element => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)

    const { data, loading, error, refetch } = useQuery<TeamsQuery>(GET_TEAMS, {
        variables: {
            first: 6,
            page: 1,
            isAdmin: true,
        },
    })
    const teamLeaders = useQuery(GET_ALL_TEAM_LEADERS)

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await refetch({ first, page, isAdmin: true })
    }

    useEffect(() => {
        void refetch({
            first: 6,
            page: 1,
            isAdmin: true,
        })
    }, [router, refetch])

    if (loading || teamLeaders.loading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error.message}`)
        return <></>
    }
    if (teamLeaders.error) {
        errorNotify(`Error! ${teamLeaders.error.message}`)
        return <></>
    }
    const { data: teamArr, paginatorInfo } = data?.getUserTeams ?? {
        data: [],
        paginatorInfo: { currentPage: 1, hasMorePages: false, lastPage: 1 },
    }

    const clickableArr = [
        {
            column: 'name',
            onClick: (slug: string): void => {
                void router.push({
                    pathname: '/manage/teams/[slug]',
                    query: { slug },
                })
            },
        },
    ]

    const getTeamDataTable = (teams: TeamType[]): DataType[] => {
        return teams.map((team): DataType => {
            const {
                id,
                name,
                truncated_name,
                slug,
                description,
                truncated_description,
                members_count,
                teamLeader: { id: teamLeaderId, first_name, last_name },
            } = team
            return {
                key: id,
                slug,
                members_count,
                teamLeaderId: +teamLeaderId,
                teamLeaderName: `${first_name} ${last_name}`,
                name: truncated_name,
                description: truncated_description,
                full_name: name,
                full_description: description,
            }
        })
    }

    const renderTeamsActions = (key: number): JSX.Element | undefined => {
        const team = getTeamDataTable(teamArr).find((team) => +team.key === key)
        return (
            <div className="flex flex-row items-center gap-4">
                <EditAction
                    team={team}
                    refetch={async () => {
                        await refetch({
                            first: paginatorInfo.perPage,
                            page: paginatorInfo.currentPage,
                            isAdmin: true,
                        })
                    }}
                    leaderOptions={teamLeaders.data.teamLeaders}
                />
                <DeleteAction
                    id={key}
                    name={String(team?.full_name)}
                    refetch={() => {
                        const { perPage, currentPage, count } = paginatorInfo

                        void refetch({
                            first: perPage,
                            page: currentPage !== 1 && count === 1 ? currentPage - 1 : currentPage,
                        })
                    }}
                />
            </div>
        )
    }

    const EditAction = ({
        team,
        refetch,
        leaderOptions,
    }: {
        team?: DataType
        refetch: () => void
        leaderOptions: UserType[]
    }): JSX.Element => {
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
                <TeamsFormModal
                    initialData={{
                        id: team?.key as number,
                        title: team?.full_name as string,
                        teamLeaderId: team?.teamLeaderId as number,
                        teamLeaderName: team?.teamLeaderName as string,
                        description: team?.full_description as string,
                    }}
                    isOpen={showModal}
                    closeModal={() => {
                        setShowModal(false)
                    }}
                    refetch={refetch}
                    leaderOptions={leaderOptions}
                />
            </>
        )
    }
    const DeleteAction = ({
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
        const [deleteRole] = useMutation(DELETE_TEAM)

        const onSubmit = (): void => {
            setLoading(true)
            deleteRole({ variables: { id } })
                .then(() => {
                    successNotify('Team successfully deleted')
                    refetch()
                })
                .catch(() => {
                    errorNotify('Failed deleting the team')
                })
                .finally(() => {
                    setShowModal(false)
                    setTimeout(() => {
                        setLoading(false)
                    }, 500)
                })
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
                    title="Delete Team"
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
                        Add Team
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={getTeamDataTable(teamArr)}
                    isEmptyString="No Teams to Show"
                    actions={renderTeamsActions}
                    clickableArr={clickableArr}
                    footer={renderFooter()}
                />
            </div>
            <TeamsFormModal
                isOpen={showModal}
                closeModal={() => {
                    setShowModal(false)
                }}
                refetch={async () => {
                    await refetch({
                        first: paginatorInfo.perPage,
                        page: paginatorInfo.currentPage,
                        isAdmin: true,
                    })
                }}
                leaderOptions={teamLeaders.data.teamLeaders}
            />
        </div>
    )
}
export default AdminTeams
