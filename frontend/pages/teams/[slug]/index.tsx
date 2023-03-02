import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import DashboardEditContentForm from '@/components/organisms/DashboardEditContentForm'
import QuestionsPageLayout from '@/components/templates/QuestionPageLayout'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import GET_TEAM from '@/helpers/graphql/queries/get_team'
import { parseHTML } from '@/helpers/htmlParsing'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { RefetchType } from '@/pages/questions'
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

const Team = () => {
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
        refetch()
    }, [router, refetch])

    if (loading) return loadingScreenShow()
    else if (error) return errorNotify(`Error! ${error}`)

    const getActiveTabClass = (status: boolean): string => {
        if (status) {
            return '-mb-[1px] hover:text-primary-red px-6 font-semibold border-b-2 border-primary-red bg-red-100'
        }
        return '-mb-[1px] hover:text-primary-red px-6 active:border-red-400'
    }

    const onClickTab = (tab: string) => {
        setIsActiveTab(tab)
        setDashboardContentEditing(false)
        refetch({ slug: router.query.slug })
    }

    const toggleDashboardContentEdit = () => {
        setDashboardContentEditing(!dashboardContentEditing)
    }

    const renderActiveTab = (content: string) => {
        return isActiveTab == 'dashboard' ? (
            <div className="flex w-full flex-col">
                {dashboardContentEditing ? (
                    <DashboardEditContentForm
                        toggleEdit={toggleDashboardContentEdit}
                        content={content}
                    />
                ) : (
                    <div className="relative w-full">
                        <div className="ql-snow mx-5 my-4">
                            <div className="ql-editor w-full">{parseHTML(content)}</div>
                        </div>
                        <Button
                            usage="edit-top-right"
                            type="button"
                            onClick={toggleDashboardContentEdit}
                        >
                            <Icons name="square_edit" />
                        </Button>
                    </div>
                )}
            </div>
        ) : (
            <QuestionsTab />
        )
    }

    return (
        <div className="mx-10 mt-10 flex h-full w-full flex-col gap-4">
            <div className="text-2xl font-bold">{team?.name}</div>
            <div className="mt-2 flex h-3/5 flex-col gap-3">
                <div className="flex h-7 w-full flex-row justify-start border-b-2 border-gray-300">
                    <div
                        className={`h-7 min-w-[120px] text-center hover:cursor-pointer ${getActiveTabClass(
                            isActiveTab === 'dashboard'
                        )}`}
                        onClick={() => onClickTab('dashboard')}
                    >
                        Dashboard
                    </div>
                    <div
                        className={`h-7 min-w-[120px] text-center hover:cursor-pointer ${getActiveTabClass(
                            isActiveTab === 'questions'
                        )}`}
                        onClick={() => onClickTab('questions')}
                    >
                        Questions
                    </div>
                </div>
                {renderActiveTab(team?.dashboard_content)}
            </div>
        </div>
    )
}

const QuestionsTab = () => {
    //Query will be changed
    const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_QUESTIONS, {
        variables: {
            first: 10,
            page: 1,
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
        },
    })

    useEffect(() => {
        refetch({
            page: 1,
            filter: { answered: true, tag: '' },
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
        })
    }, [refetch])

    if (loading) return <div></div>
    if (error) {
        errorNotify(`Error! ${error}`)
        return <div></div>
    }
    return (
        <div className="">
            <QuestionsPageLayout refetch={refetch} data={data} isPrivate={true} />
        </div>
    )
}

export default Team
