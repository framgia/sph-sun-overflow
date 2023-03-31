import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Paginate from '@/components/organisms/Paginate'
import type { ColumnType, DataType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
import Modal from '@/components/templates/Modal'
import { type PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import DELETE_TEAM from '@/helpers/graphql/mutations/delete_team'
import GET_TEAMS from '@/helpers/graphql/queries/get_teams'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify, successNotify } from '@/helpers/toast'
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
    },
    {
        title: 'Description',
        key: 'description',
    },
    {
        title: 'Members',
        key: 'members_count',
    },
    {
        title: '',
        key: 'action',
        width: 20,
    },
]

const EditAction = ({ team, refetch }: { team?: DataType; refetch: () => void }): JSX.Element => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <Button
                usage="toggle-modal"
                onClick={() => {
                    setShowModal(true)
                }}
            >
                <Icons name="table_edit" />
            </Button>
            <TeamsFormModal
                initialData={{
                    id: team?.key as number,
                    title: team?.full_name as string,
                    description: team?.full_description as string,
                }}
                isOpen={showModal}
                closeModal={() => {
                    setShowModal(false)
                }}
                refetch={refetch}
            />
        </div>
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
    const [showModal, setShowModal] = useState(false)
    const [deleteRole] = useMutation(DELETE_TEAM)

    const onSubmit = (): void => {
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
                <Icons name="table_delete" additionalClass="fill-gray-500" />
            </Button>
            <Modal
                title="Delete Team"
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

    if (loading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error.message}`)
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
            } = team
            return {
                key: id,
                slug,
                members_count,
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
            <div className="flex flex-row gap-4">
                <EditAction
                    team={team}
                    refetch={async () => {
                        await refetch({
                            first: paginatorInfo.perPage,
                            page: paginatorInfo.currentPage,
                            isAdmin: true,
                        })
                    }}
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

    return (
        <div className="flex flex-col">
            <div className="flex w-full flex-row items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Teams</h1>
                <Button
                    type="button"
                    additionalClass="px-6 py-3"
                    onClick={() => {
                        setShowModal(true)
                    }}
                >
                    New Team
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={getTeamDataTable(teamArr)}
                isEmptyString="No Teams to Show"
                actions={renderTeamsActions}
                clickableArr={clickableArr}
            />
            <div className="mt-auto">
                <Paginate {...paginatorInfo} onPageChange={onPageChange} />
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
            />
        </div>
    )
}
export default AdminTeams
