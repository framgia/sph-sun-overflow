import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import PageTitle from '@/components/atoms/PageTitle'
import type { TabType } from '@/components/atoms/TabItem'
import DropdownFilters from '@/components/molecules/DropdownFilters'
import Tabs from '@/components/molecules/Tabs'
import ViewToggle from '@/components/molecules/ViewToggle'
import DashboardEditContentForm from '@/components/organisms/DashboardEditContentForm'
import ManageMembersTab from '@/components/organisms/ManageMembersTab'
import Paginate from '@/components/organisms/Paginate'
import QuestionGridItem from '@/components/organisms/QuestionGridItem'
import QuestionListItem from '@/components/organisms/QuestionListItem'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import GET_TEAM from '@/helpers/graphql/queries/get_team'
import { parseHTML } from '@/helpers/htmlParsing'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { useBoundStore } from '@/helpers/store'
import { errorNotify } from '@/helpers/toast'
import { answerFilterOption, orderByOptions, type RefetchType } from '@/pages/questions'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'

type RoleType = {
    id: number
    name: string
}

type UserType = {
    id: number
    slug: string
    first_name: string
    last_name: string
    reputation: number
    avatar: string
    role?: RoleType
}

type MemberType = {
    id: number
    user: UserType
    teamRole: RoleType
}

type TeamType = {
    id: number
    name: string
    description: string
    dashboard_content: string
    members_count: number
    questions_asked: number
    questions_answered: number
    teamLeader: UserType
    members: MemberType[]
}

type View = 'Grid' | 'List'

const Team = (): JSX.Element => {
    const router = useRouter()
    const [view, setView] = useState<View>('List')
    const [activeTab, setActiveTab] = useState('Questions')
    const [dashboardContentEditing, setDashboardContentEditing] = useState(false)
    const slug = router.query.slug as string

    const { data, loading, error, refetch } = useQuery(GET_TEAM, {
        variables: {
            slug,
        },
    })

    const team: TeamType = data?.team

    useEffect(() => {
        void refetch()
    }, [router, refetch])

    if (loading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error.message}`)
        void router.push('/404')
        return loadingScreenShow()
    }
    if (data.team === null) {
        void router.push('/404')
        return loadingScreenShow()
    }

    const toggleView = (): void => {
        setView((prevView) => (prevView === 'List' ? 'Grid' : 'List'))
    }

    const onClickTab = (tab: string): void => {
        setActiveTab(tab)
        setDashboardContentEditing(false)
        void refetch({ slug })
    }

    const tabs: TabType[] = [
        {
            label: 'Dashboard',
            isSelected: activeTab === 'Dashboard',
            onClick: () => {
                onClickTab('Dashboard')
            },
        },
        {
            label: 'Questions',
            isSelected: activeTab === 'Questions',
            onClick: () => {
                onClickTab('Questions')
            },
        },
        {
            label: 'Members',
            isSelected: activeTab === 'Members',
            onClick: () => {
                onClickTab('Members')
            },
        },
    ]

    const toggleDashboardContentEdit = (): void => {
        setDashboardContentEditing(!dashboardContentEditing)
        void refetch({ slug })
    }

    const isUserTeamLeader = team.teamLeader.id === useBoundStore.getState().user_id

    const onClickAskQuestion = (event: React.MouseEvent): void => {
        event.preventDefault()

        void router.push({
            pathname: '/questions/add',
            query: { prev: slug, team: data?.team.name, id: data?.team.id },
        })
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
        })

        if (error) {
            errorNotify(`Error! ${error.message}`)
            return <div></div>
        }

        const { paginatorInfo, data: questions } = data?.questions ?? {}

        const onPageChange = async (first: number, page: number): Promise<void> => {
            await refetch({
                orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
                filter: { team: slug },
                first,
                page,
            })
        }

        return (
            <div className="flex h-0 flex-1 flex-col gap-4">
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
                {loading ? (
                    loadingScreenShow()
                ) : (
                    <div className="scrollbar overflow-y-auto">
                        {!questions.length && (
                            <div className="text-center text-base font-semibold text-neutral-disabled">
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
                )}
            </div>
        )
    }

    const renderDashboard = (content: string): JSX.Element => {
        return (
            <div className="flex w-full flex-col">
                {dashboardContentEditing ? (
                    <DashboardEditContentForm
                        toggleEdit={toggleDashboardContentEdit}
                        content={content}
                        teamId={team.id}
                    />
                ) : (
                    <div className="relative w-full">
                        {isUserTeamLeader && (
                            <Button
                                usage="toggle-modal"
                                additionalClass="flex items-center justify-end gap-2 absolute top-0 right-0 hover:bg-transparent text-gray-500 p-0"
                                onClick={toggleDashboardContentEdit}
                            >
                                <Icons name="pencil" />
                            </Button>
                        )}
                        <div className="ql-snow mx-5 my-4">
                            <div className="ql-editor w-full">{parseHTML(content)}</div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const renderMembersTab = (): JSX.Element => {
        return <ManageMembersTab team={team} isUserTeamLeader={isUserTeamLeader} />
    }

    const renderActiveTab = (content: string): JSX.Element => {
        switch (activeTab) {
            case 'Dashboard':
                return renderDashboard(content)
            case 'Members':
                return renderMembersTab()
            default:
                return <QuestionsTab />
        }
    }

    return (
        <>
            <PageTitle title={team.name} />
            <div className="flex max-h-full w-full flex-row justify-between gap-4">
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
                <div className="flex flex-1 flex-col justify-start gap-4 rounded-[5px] border border-neutral-200 bg-white p-4 shadow-[2px_2px_4px_0_#0000000D]">
                    {activeTab === 'Questions' && (
                        <div className="flex flex-row items-center justify-end">
                            <Button usage="stroke" size="large" onClick={onClickAskQuestion}>
                                Ask a Question
                            </Button>
                        </div>
                    )}
                    <Tabs tabs={tabs} />
                    {renderActiveTab(team?.dashboard_content)}
                </div>
            </div>
        </>
    )
}

export default Team
