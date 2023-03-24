import PageStats from '@/components/atoms/PageStats'
import GET_USER from '@/helpers/graphql/queries/get_user'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Avatar from 'react-avatar'

interface UserType {
    id: number
    first_name: string
    last_name: string
    avatar: string
    question_count: number
    answer_count: number
    reputation: number
}

const tempUser: UserType = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    avatar: 'John Doe',
    question_count: 10,
    answer_count: 5,
    reputation: 20,
}

const getActiveTabClass = (status: boolean): string => {
    return `min-w-[120px] text-center hover:cursor-pointer -mb-[1px] hover:text-primary-red px-6 active:border-red-400
    ${status ? 'font-semibold border-b-2 border-primary-red bg-red-100' : ''}`
}

const UserDetail = (): JSX.Element => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('Questions')
    const userQuery = useQuery<{ user: UserType }>(GET_USER, {
        variables: { slug: router.query.slug },
    })
    const onClickQuestionsTab = (): void => {
        setActiveTab('Questions')
    }

    const onClickAnswersTab = (): void => {
        setActiveTab('Answers')
    }

    const onClickTeamsTab = (): void => {
        setActiveTab('Teams')
    }

    if (userQuery.loading) return loadingScreenShow()
    if (userQuery.error) {
        errorNotify(`Error! ${userQuery.error?.message ?? ''}`)
        return <></>
    }
    const user: UserType = userQuery?.data?.user ?? tempUser
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
                    <PageStats label="Questions Asked" value={user.question_count} />
                    <PageStats label="Questions Answered" value={user.answer_count} />
                    <PageStats label="Votes Acquired" value={user.reputation} />
                </div>
            </div>
            <div className="mt-10 flex h-3/5 flex-col">
                <div className="flex h-7 w-full flex-row justify-start border-b-2 border-gray-300">
                    <div
                        className={getActiveTabClass(activeTab === 'Questions')}
                        onClick={onClickQuestionsTab}
                    >
                        Questions
                    </div>
                    <div
                        className={getActiveTabClass(activeTab === 'Answers')}
                        onClick={onClickAnswersTab}
                    >
                        Answers
                    </div>
                    <div
                        className={getActiveTabClass(activeTab === 'Teams')}
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
