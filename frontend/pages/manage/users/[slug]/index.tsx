import PageStats from '@/components/atoms/PageStats'
import { useState } from 'react'
import Avatar from 'react-avatar'

interface UserType {
    id: number
    first_name: string
    last_name: string
    avatar: string
    question_count: number
    answer_count: number
    vote_count: number
}

const user: UserType = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    avatar: 'John Doe',
    question_count: 10,
    answer_count: 5,
    vote_count: 20,
}

const getActiveTabClass = (status: boolean): string => {
    if (status) {
        return '-mb-[1px] hover:text-primary-red px-6 font-semibold border-b-2 border-primary-red bg-red-100'
    }
    return '-mb-[1px] hover:text-primary-red px-6 active:border-red-400'
}

const UserDetail = (): JSX.Element => {
    const [activeTab, setActiveTab] = useState('Questions')

    const onClickQuestionsTab = (): void => {
        setActiveTab('Questions')
    }

    const onClickAnswersTab = (): void => {
        setActiveTab('Answers')
    }

    const onClickTeamsTab = (): void => {
        setActiveTab('Teams')
    }

    return (
        <div className="mx-10 mt-10 w-full flex-col">
            <div className="flex">
                <div className="flex w-full gap-8 p-2">
                    <Avatar
                        round={true}
                        name={`${user.first_name} ${user.last_name}`}
                        size="120"
                        alt={user.first_name}
                        src={user.avatar}
                        maxInitials={1}
                        textSizeRatio={2}
                    />
                    <div className="w-[90%] self-center truncate text-3xl font-medium">
                        {`${user.first_name} ${user.last_name}`}
                    </div>
                </div>
                <div className="mt-8 flex w-full justify-center gap-8 self-start">
                    <PageStats label="Questions Asked" value={user.question_count}></PageStats>
                    <PageStats label="Questions Answered" value={user.answer_count}></PageStats>
                    <PageStats label="Votes Acquired" value={user.vote_count}></PageStats>
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
                            activeTab === 'Answers'
                        )}`}
                        onClick={onClickAnswersTab}
                    >
                        Answers
                    </div>
                    <div
                        className={`min-w-[120px] text-center hover:cursor-pointer ${getActiveTabClass(
                            activeTab === 'Teams'
                        )}`}
                        onClick={onClickTeamsTab}
                    >
                        Teams
                    </div>
                </div>
                <div className="flex w-full flex-row justify-center">
                    <div className="w-full pt-8 text-center text-lg font-medium text-primary-gray">
                        No {activeTab} to Show
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetail
