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
                <Icons name="table_edit" additionalClass="fill-gray-500" />
            </Button>
            <TeamsFormModal
                initialData={{
                    id: team?.key as number,
                    title: team?.name as string,
                    description: team?.description as string,
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
            const { id, name, slug, description, members_count } = team
            return {
                key: id,
                name,
                slug,
                description,
                members_count,
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
                    name={String(team?.name)}
                    refetch={() => {
                        void refetch({
                            variables: {
                                first: paginatorInfo.perPage,
                                page: paginatorInfo.currentPage,
                            },
                        })
                    }}
                />
            </div>
        )
    }

    return (
        <div className="flex h-full w-full flex-col gap-4 p-8">
            <div className="mt-4 flex flex-row items-center justify-between">
                <h1 className="text-3xl font-bold">Teams</h1>
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
            <div className="TableContainer overflow-hidden border border-[#555555]">
                <Table
                    columns={columns}
                    dataSource={getTeamDataTable(teamArr)}
                    isEmptyString="No Teams to Show"
                    actions={renderTeamsActions}
                    clickableArr={clickableArr}
                />
            </div>
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
