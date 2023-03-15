import PageStats from '@/components/atoms/PageStats'
import { useState } from 'react'

interface teamDetails {
    name: string
    team_leader: string
    questions_asked: number
    questions_answered: number
    members: number
}

const team: teamDetails = {
    name: 'Sun Overflow',
    team_leader: 'Keno Renz Bacunawa',
    questions_asked: 20,
    questions_answered: 5,
    members: 10,
}

const getActiveTabClass = (status: boolean): string => {
    if (status) {
        return '-mb-[1px] hover:text-primary-red px-6 font-semibold border-b-2 border-primary-red bg-red-100'
    }
    return '-mb-[1px] hover:text-primary-red px-6 active:border-red-400'
}

const TeamDetail = () => {
    const [activeTab, setActiveTab] = useState('Questions')

    const onClickQuestionsTab = () => {
        setActiveTab('Questions')
    }

    const onClickMembersTab = () => {
        setActiveTab('Members')
    }

    return (
        <div className="mx-10 mt-10 w-full flex-col">
            <div className="flex">
                <div className="w-full flex-col">
                    <div className="text-3xl font-medium">{team.name}</div>
                    <div className="mt-1 text-lg text-secondary-black line-clamp-1">
                        Handled by: {team.team_leader}
                    </div>
                </div>
                <div className="mx-4 flex w-full flex-row justify-center gap-10 self-start">
                    <PageStats label="Questions Asked" value={team.questions_asked}></PageStats>
                    <PageStats
                        label="Questions Answered"
                        value={team.questions_answered}
                    ></PageStats>
                    <PageStats label="Members" value={team.members}></PageStats>
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
