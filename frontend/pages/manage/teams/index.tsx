import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Paginate from '@/components/organisms/Paginate'
import type { ColumnType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
import Modal from '@/components/templates/Modal'
import GET_TEAMS from '@/helpers/graphql/queries/get_teams'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
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
        paginatorInfo: {
            currentPage: number
            hasMorePages: boolean
            lastPage: number
        }
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

const editAction = (key: number): JSX.Element => {
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
                    title: 'Test',
                    description: 'Test description',
                }}
                isOpen={showModal}
                closeModal={() => {
                    setShowModal(false)
                }}
            />
        </div>
    )
}
const deleteAction = (key: number): JSX.Element => {
    const [showModal, setShowModal] = useState(false)

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
                handleSubmit={() => {
                    setShowModal(false)
                }}
                submitLabel="Delete"
            >
                <span>
                    Are you sure you wish to delete <span className="font-bold">Team B</span>?
                </span>
            </Modal>
        </div>
    )
}

const renderTeamsActions = (key: number): JSX.Element | undefined => {
    return (
        <div className="flex flex-row gap-4">
            {editAction(key)}
            {deleteAction(key)}
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
                    dataSource={teamArr}
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
            />
        </div>
    )
}
export default AdminTeams
