import PageStats from '@/components/atoms/PageStats'
import MemberManage from '@/components/templates/MemberManage'
import QuestionsPageLayout from '@/components/templates/QuestionsPageLayout'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import GET_TEAM from '@/helpers/graphql/queries/get_team'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { type RefetchType } from '@/pages/questions'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
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
    truncated_name: string
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
    const [verified, setVerified] = useState<boolean>(false)

    const { slug } = router.query
    const questionsApi = useQuery<any, RefetchType>(GET_QUESTIONS, {
        variables: {
            first: 5,
            page: 1,
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            filter: { team: slug as string },
        },
    })

    const { data, loading, error } = useQuery(GET_TEAM, {
        variables: { slug },
        async onCompleted(data) {
            if (data.team === null) {
                errorNotify('Team does not exist')
                await router.replace('/manage/teams')
            }
            setVerified(true)
        },
    })

    const team: TeamType = data?.team
    const teamLeader: UserType = team?.teamLeader

    if (loading || questionsApi.loading || !verified) return loadingScreenShow()
    if (error) {
        return <span>{errorNotify(`Error! ${error.message}`)}</span>
    }

    const onClickQuestionsTab = (): void => {
        setActiveTab('Questions')
    }

    const onClickMembersTab = (): void => {
        setActiveTab('Members')
    }

    const renderMembers = (): JSX.Element => {
        return (
            <div className="h-[70%] w-[93%]">
                <MemberManage isForAdmin={true} />{' '}
            </div>
        )
    }

    const renderQuestions = (): JSX.Element => {
        return (
            <div className="h-[70%] w-[93%] pt-5">
                <QuestionsPageLayout
                    refetch={questionsApi.refetch}
                    data={questionsApi.data}
                    isPrivate={true}
                    team={slug as string}
                    page_slug={'teams'}
                    previous_page_slug={router.asPath}
                />
            </div>
        )
    }

    const renderActiveTab = (): JSX.Element => {
        if (activeTab === 'Questions') return renderQuestions()
        else if (activeTab === 'Members') return renderMembers()

        return <></>
    }

    return (
        <div className=" w-full flex-col">
            <div className="flex">
                <div className="w-full flex-col">
                    <div className="text-3xl font-medium">{team?.truncated_name}</div>
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
                <div className="flex w-full">{renderActiveTab()}</div>
            </div>
        </div>
    )
}

export default TeamDetail
