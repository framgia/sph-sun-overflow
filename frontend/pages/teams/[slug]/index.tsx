import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import DashboardEditContentForm from '@/components/organisms/DashboardEditContentForm'
import QuestionsPageLayout from '@/components/templates/QuestionsPageLayout'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import GET_TEAM from '@/helpers/graphql/queries/get_team'
import { parseHTML } from '@/helpers/htmlParsing'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { useBoundStore } from '@/helpers/store'
import { errorNotify } from '@/helpers/toast'
import type { RefetchType } from '@/pages/questions'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
type RoleType = {
    name: string
}

type UserType = {
    id: number
    slug: string
    first_name: string
    last_name: string
    reputation: number
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
    teamLeader: UserType
    members: MemberType[]
}

const Team = (): JSX.Element => {
    const router = useRouter()
    const [isActiveTab, setIsActiveTab] = useState('dashboard')
    const [dashboardContentEditing, setDashboardContentEditing] = useState(false)

    const { data, loading, error, refetch } = useQuery(GET_TEAM, {
        variables: {
            slug: router.query.slug,
        },
    })

    const team: TeamType = data?.team

    useEffect(() => {
        void refetch()
    }, [router, refetch])

    if (loading) return loadingScreenShow()
    else if (error) return <span>{errorNotify(`Error! ${error.message}`)}</span>

    const getActiveTabClass = (status: boolean): string => {
        if (status) {
            return '-mb-[1px] hover:text-primary-red px-6 font-semibold border-b-2 border-primary-red bg-red-100'
        }
        return '-mb-[1px] hover:text-primary-red px-6 active:border-red-400'
    }

    const onClickTab = (tab: string): void => {
        setIsActiveTab(tab)
        setDashboardContentEditing(false)
        void refetch({ slug: router.query.slug })
    }

    const toggleDashboardContentEdit = (): void => {
        setDashboardContentEditing(!dashboardContentEditing)
        void refetch({ slug: router.query.slug })
    }

    const isTeamLeader = team.teamLeader.id === useBoundStore.getState().user_id

    const onClickAskQuestion = (event: React.MouseEvent): void => {
        event.preventDefault()

        void router.push({
            pathname: '/questions/add',
            query: { prev: router.query.slug, team: data?.team.name, id: data?.team.id },
        })
    }

    const renderActiveTab = (content: string): JSX.Element => {
        return isActiveTab === 'dashboard' ? (
            <div className="flex w-full flex-col">
                {dashboardContentEditing ? (
                    <DashboardEditContentForm
                        toggleEdit={toggleDashboardContentEdit}
                        content={content}
                        teamId={team.id}
                    />
                ) : (
                    <div className="relative w-full">
                        <div className="ql-snow mx-5 my-4">
                            <div className="ql-editor w-full">{parseHTML(content)}</div>
                        </div>
                        {isTeamLeader && (
                            <Button
                                usage="edit-top-right"
                                type="button"
                                onClick={toggleDashboardContentEdit}
                            >
                                <Icons name="square_edit" />
                            </Button>
                        )}
                    </div>
                )}
            </div>
        ) : (
            <QuestionsTab />
        )
    }

    return (
        <div className="flex h-full w-full flex-col gap-4 pl-14 pr-10 pt-10">
            <div className="flex flex-row items-center justify-between">
                <div className="text-2xl font-bold">{team?.name}</div>
                {isActiveTab === 'questions' && (
                    <Button
                        usage="ask_question"
                        additionalClass="ask-btn"
                        isDisabled={false}
                        onClick={onClickAskQuestion}
                    >
                        Ask a Question
                    </Button>
                )}
            </div>
            <div className="mt-2 flex h-3/5 flex-col gap-3">
                <div className="flex h-7 w-full flex-row justify-start border-b-2 border-gray-300">
                    <div
                        className={`h-7 min-w-[120px] text-center hover:cursor-pointer ${getActiveTabClass(
                            isActiveTab === 'dashboard'
                        )}`}
                        onClick={() => {
                            onClickTab('dashboard')
                        }}
                    >
                        Dashboard
                    </div>
                    <div
                        className={`h-7 min-w-[120px] text-center hover:cursor-pointer ${getActiveTabClass(
                            isActiveTab === 'questions'
                        )}`}
                        onClick={() => {
                            onClickTab('questions')
                        }}
                    >
                        Questions
                    </div>
                </div>
                {renderActiveTab(team?.dashboard_content)}
            </div>
        </div>
    )
}

const QuestionsTab = (): JSX.Element => {
    const router = useRouter()
    const { slug } = router.query
    const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_QUESTIONS, {
        variables: {
            first: 10,
            page: 1,
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            filter: { answered: true, team: slug as string },
        },
    })

    if (loading) return <div></div>
    if (error) {
        errorNotify(`Error! ${error.message}`)
        return <div></div>
    }
    return (
        <div className="">
            <QuestionsPageLayout
                refetch={refetch}
                data={data}
                isPrivate={true}
                team={slug as string}
                page_slug={'teams'}
            />
        </div>
    )
}

export default Team
