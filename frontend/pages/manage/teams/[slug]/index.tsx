import DropdownFilters from '@/components/molecules/DropdownFilters'
import Tabs from '@/components/molecules/Tabs'
import ViewToggle from '@/components/molecules/ViewToggle'
import ManageMembersTab from '@/components/organisms/ManageMembersTab'
import Paginate from '@/components/organisms/Paginate'
import QuestionGridItem from '@/components/organisms/QuestionGridItem'
import QuestionListItem from '@/components/organisms/QuestionListItem'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import GET_TEAM from '@/helpers/graphql/queries/get_team'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { useBoundStore } from '@/helpers/store'
import { errorNotify } from '@/helpers/toast'
import { answerFilterOption, orderByOptions, type RefetchType } from '@/pages/questions'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
interface UserType {
    id: number
    first_name: string
    last_name: string
    avatar: string
}

interface TeamType {
    id: number
    name: string
    description: string
    teamLeader: UserType
    members_count: number
    questions_asked: number
    questions_answered: number
    truncated_name: string
}
type View = 'Grid' | 'List'

const TeamDetail = (): JSX.Element => {
    const router = useRouter()
    const [view, setView] = useState<View>('List')
    const [activeTab, setActiveTab] = useState<string>('Questions')
    const [verified, setVerified] = useState<boolean>(false)

    const slug = router.query.slug as string
    const questionsApi = useQuery<any, RefetchType>(GET_QUESTIONS, {
        variables: {
            first: 5,
            page: 1,
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            filter: { team: slug },
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
        fetchPolicy: 'network-only',
    })

    if (loading || questionsApi.loading || !verified) return loadingScreenShow()
    if (error) {
        return <span>{errorNotify(`Error! ${error.message}`)}</span>
    }

    const team: TeamType = data?.team
    const isUserTeamLeader = team.teamLeader.id === useBoundStore.getState().user_id

    const onClickQuestionsTab = (): void => {
        setActiveTab('Questions')
    }

    const onClickMembersTab = (): void => {
        setActiveTab('Members')
    }

    const toggleView = (): void => {
        setView((prevView) => (prevView === 'List' ? 'Grid' : 'List'))
    }

    const QuestionsTab = (): JSX.Element => {
        const order = orderByOptions[String(router.query.order ?? 'Newest first')]
        const answerFilter = answerFilterOption[String(router.query.filter ?? '')]
        const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_QUESTIONS, {
            variables: {
                first: view === 'List' ? 5 : 12,
                page: 1,
                orderBy: [order],
                filter: { team: slug, ...answerFilter },
            },
            fetchPolicy: 'network-only',
        })

        if (loading) return <div></div>
        if (error) {
            errorNotify(`Error! ${error.message}`)
            return <div></div>
        }

        const { paginatorInfo, data: questions } = data.questions

        const onPageChange = async (first: number, page: number): Promise<void> => {
            await refetch({
                orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
                filter: { team: slug },
                first,
                page,
            })
        }

        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-end gap-1 p-2.5">
                    <div>
                        <ViewToggle view={view} onClick={toggleView} />
                    </div>
                    <div className="">
                        <DropdownFilters
                            triggers={activeTab === 'Questions' ? ['DATE', 'ANSWER'] : ['DATE']}
                        />
                    </div>
                </div>
                {!questions.length && (
                    <div className="text-center text-2xl font-semibold text-neutral-disabled">
                        No Questions to Show
                    </div>
                )}
                {view === 'List' ? (
                    <div className="flex w-full flex-col justify-center gap-4">
                        {questions.map((question: any) => {
                            return (
                                <QuestionListItem
                                    key={question.id}
                                    slug={question.slug}
                                    title={question.title}
                                    content={question.content}
                                    voteCount={question.vote_count}
                                    answerCount={question.answers?.length}
                                    viewCount={question.views_count}
                                    isPublic={question.is_public}
                                    tags={question.tags}
                                    author={question.user}
                                    createdAt={question.humanized_created_at}
                                />
                            )
                        })}
                    </div>
                ) : (
                    <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
                        {questions.map((question: any) => {
                            return (
                                <QuestionGridItem
                                    key={question.id}
                                    slug={question.slug}
                                    title={question.title}
                                    content={question.content}
                                    voteCount={question.vote_count}
                                    upvotePercentage={question.upvote_percentage}
                                    answerCount={question.answers?.length}
                                    viewCount={question.views_count}
                                    isPublic={question.is_public}
                                    tags={question.tags}
                                    author={question.user}
                                    createdAt={question.created_at}
                                />
                            )
                        })}
                    </div>
                )}
                {paginatorInfo && paginatorInfo.lastPage > 1 && (
                    <div className="px-2.5 py-4">
                        <Paginate {...paginatorInfo} onPageChange={onPageChange} />
                    </div>
                )}
            </div>
        )
    }

    const renderMembers = (): JSX.Element => {
        return (
            <div className="w-full p-4">
                <ManageMembersTab team={team} isUserTeamLeader={isUserTeamLeader} />
            </div>
        )
    }

    const renderQuestions = (): JSX.Element => {
        return (
            <div className="w-full">
                <QuestionsTab />
            </div>
        )
    }
    const renderActiveTab = (): JSX.Element => {
        if (activeTab === 'Questions') return renderQuestions()
        else if (activeTab === 'Members') return renderMembers()

        return <></>
    }

    return (
        <div className=" flex w-full flex-row gap-4 ">
            <div className="flex h-fit w-64 flex-col gap-4 rounded-[5px] border border-neutral-200 bg-white p-4 shadow-[0_0_4px_0_#0000000D]">
                <div className="flex flex-col gap-1 text-sm">
                    <div className="font-bold uppercase text-neutral-900 line-clamp-1">
                        {team?.name}
                    </div>
                    <div className="line-clamp-10 p-2 font-normal text-neutral-disabled">
                        {team?.description}
                    </div>
                </div>
                <div className="flex flex-col gap-2 text-sm text-neutral-900">
                    <div className="flex gap-2">
                        <span className="font-medium">Questions asked:</span>
                        <span className="font-normal">{team?.questions_asked}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-medium">Questions answered:</span>
                        <span className="font-normal">{team?.questions_answered}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-medium">Members:</span>
                        <span className="font-normal">{team?.members_count}</span>
                    </div>
                </div>
            </div>

            <div className="flex grow flex-col rounded-smd border border-neutral-200 bg-white p-4">
                <div className="flex flex-row justify-start border-b-2 border-gray-300">
                    <Tabs
                        tabs={[
                            {
                                label: 'Questions',
                                isSelected: activeTab === 'Questions',
                                onClick: onClickQuestionsTab,
                            },
                            {
                                label: 'Members',
                                isSelected: activeTab === 'Members',
                                onClick: onClickMembersTab,
                            },
                        ]}
                    />
                </div>
                <div className="flex w-full">{renderActiveTab()}</div>
            </div>
        </div>
    )
}

export default TeamDetail
