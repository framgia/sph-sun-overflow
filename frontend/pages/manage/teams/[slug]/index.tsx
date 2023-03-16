import PageStats from '@/components/atoms/PageStats'
import GET_TEAM from '@/helpers/graphql/queries/get_team'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'

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

    const { data, loading, error, refetch } = useQuery(GET_TEAM, {
        variables: { slug: router.query.slug },
    })

    const team: TeamType = data?.team
    const teamLeader: UserType = team?.teamLeader

    if (loading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error}`)
        return <></>
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
                <div className="flex h-7 w-full flex-row justify-start border-b-2 border-gray-300">
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
                <div className="flex w-full flex-row justify-center">
                    <div className="w-full pt-8 text-center text-lg font-medium text-primary-gray">
                        No {activeTab === 'Questions' ? 'Questions' : 'Members'} to Show
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamDetail
