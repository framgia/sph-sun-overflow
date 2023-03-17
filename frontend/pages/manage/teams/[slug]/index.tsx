import Icons from '@/components/atoms/Icons'
import PageStats from '@/components/atoms/PageStats'
import Paginate from '@/components/organisms/Paginate'
import type { ColumnType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
import GET_TEAM from '@/helpers/graphql/queries/get_team'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { HiPlus } from 'react-icons/hi'

interface UserType {
    id: number
    first_name: string
    last_name: string
}

interface TeamType {
    id: number
    name: string
    teamLeader: UserType
    members_count: number
    questions_asked: number
    questions_answered: number
}

const getActiveTabClass = (status: boolean): string => {
    if (status) {
        return '-mb-[1px] hover:text-primary-red px-6 font-semibold border-b-2 border-primary-red bg-red-100'
    }
    return '-mb-[1px] hover:text-primary-red px-6 active:border-red-400'
}

const TeamDetail = (): JSX.Element => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<string>('Questions')

    const { data, loading, error } = useQuery(GET_TEAM, {
        variables: { slug: router.query.slug },
    })

    const team: TeamType = data?.team
    const teamLeader: UserType = team?.teamLeader

    if (loading) return loadingScreenShow()
    if (error) {
        return <span>{errorNotify(`Error! ${error.message}`)}</span>
    }

    const onClickQuestionsTab = (): void => {
        setActiveTab('Questions')
    }

    const onClickMembersTab = (): void => {
        setActiveTab('Members')
    }

    return (
        <div className="mx-10 mt-10 w-full flex-col">
            <div className="flex">
                <div className="w-full flex-col">
                    <div className="text-3xl font-medium">{team?.name}</div>
                    <div className="mt-1 text-lg text-secondary-black line-clamp-1">
                        {`Handled by: ${teamLeader?.first_name} ${teamLeader?.last_name}`}
                    </div>
                </div>
                <div className="mx-4 flex w-full flex-row justify-center gap-10 self-start">
                    <PageStats label="Questions Asked" value={team?.questions_asked}></PageStats>
                    <PageStats
                        label="Questions Answered"
                        value={team?.questions_answered}
                    ></PageStats>
                    <PageStats label="Members" value={team?.members_count}></PageStats>
                </div>
            </div>
            <div className="mt-10 flex h-3/5 flex-col">
                <div className="flex h-7 w-[85%] flex-row justify-start border-b-2 border-gray-300">
                    <div
                        className={`min-w-[120px] text-center hover:cursor-pointer ${getActiveTabClass(
                            activeTab === 'Questions'
                        )}`}
                        onClick={onClickQuestionsTab}
                    >
                        Questions
                    </div>
                    <div
                        className={`min-w-[120px] text-center hover:cursor-pointer ${getActiveTabClass(
                            activeTab === 'Members'
                        )}`}
                        onClick={onClickMembersTab}
                    >
                        Members
                    </div>
                </div>
                <div className="flex w-full">
                    {activeTab === 'Members' && <MembersTab />}
                    {activeTab === 'Questions' && (
                        <div className="w-full pt-8 text-center text-lg font-medium text-primary-gray">
                            No Questions to Show
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

type MembersQuery = {
    members: {
        data: Array<{
            fullName: string
            teamRole: string
        }>
        paginatorInfo: {
            currentPage: number
            hasMorePages: boolean
            lastPage: number
        }
    }
}

const columns: ColumnType[] = [
    {
        title: 'Name',
        key: 'fullName',
        width: '15%',
    },
    {
        title: 'Team Role',
        key: 'teamRole',
        width: '70%',
    },
    {
        title: '',
        key: 'action',
        width: '15%',
    },
]

const tempMembers = [
    {
        fullName: 'a',
        teamRole: 'QA',
    },
    {
        fullName: 'a',
        teamRole: 'QA',
    },
    {
        fullName: 'a',
        teamRole: 'QA',
    },
    {
        fullName: 'a',
        teamRole: 'QA',
    },
    {
        fullName: 'a',
        teamRole: 'QA',
    },
    {
        fullName: 'a',
        teamRole: 'QA',
    },
    {
        fullName: 'a',
        teamRole: 'QA',
    },
    {
        fullName: 'a',
        teamRole: 'QA',
    },
    {
        fullName: 'a',
        teamRole: 'QA',
    },
]

const tempPaginateInfo = {
    currentPage: 1,
    hasMorePages: false,
    lastPage: 1,
}
const tempData: MembersQuery = {
    members: {
        data: tempMembers,
        paginatorInfo: tempPaginateInfo,
    },
}
const onPageChange = async (first: number, page: number): Promise<void> => {
    await new Promise(() => {
        console.log('ok')
    })
}
const handleDelete = (event: React.MouseEvent<HTMLElement>): void => {
    console.log('Delete')
}

const deleteAction = (key: number): JSX.Element => {
    return (
        <div onClick={handleDelete}>
            <Icons name="table_delete" additionalClass="fill-gray-500" />
        </div>
    )
}

const renderMembersActions = (key: number): JSX.Element | undefined => {
    return <div className="flex flex-row justify-end gap-4 ">{deleteAction(key)}</div>
}

const MembersTab = (): JSX.Element => {
    return (
        <div className="w-full">
            <div className="  w-[85%] border border-[#555555]">
                <Table
                    columns={columns}
                    dataSource={tempData.members.data}
                    actions={renderMembersActions}
                    isEmptyString="No Members to Show"
                />
            </div>
            <div className="relative mt-5 flex w-[85%] ">
                <div className="mx-auto ">
                    <div className="ml-32">
                        <Paginate {...tempData.members.paginatorInfo} onPageChange={onPageChange} />{' '}
                    </div>
                </div>
                <button
                    className="absolute -right-1 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-red-500
                    "
                >
                    <HiPlus color="white" size={50} />
                </button>
            </div>
        </div>
    )
}

export default TeamDetail
