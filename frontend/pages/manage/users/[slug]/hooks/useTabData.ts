import { type PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import GET_ANSWERS from '@/helpers/graphql/queries/get_answers'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import GET_TEAMS from '@/helpers/graphql/queries/get_teams'
import GET_USER from '@/helpers/graphql/queries/get_user'
import { answerFilterOption, orderByOptions, type RefetchType } from '@/pages/questions'
import { type AnswerType, type QuestionType, type TeamType } from '@/pages/questions/[slug]'
import { useLazyQuery, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { type Tab, type View } from '..'

type QuestionQueryType = {
    questions: { data: QuestionType[]; paginatorInfo: PaginatorInfo }
}

type AnswerQueryType = {
    answers: { data: AnswerType[]; paginatorInfo: PaginatorInfo }
}

type TeamQueryType = {
    getUserTeams: { data: TeamType[]; paginatorInfo: PaginatorInfo }
}

type TeamRefetchType = {
    first: number
    page: number
    user_slug: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useTabData = (activeTab: Tab, view: View) => {
    const router = useRouter()

    const order = orderByOptions[String(router.query.order ?? 'Newest first')]
    const answerFilter = answerFilterOption[String(router.query.filter ?? '')]

    // User
    const {
        data: userData,
        loading: userLoading,
        error: userError,
    } = useQuery(GET_USER, {
        variables: {
            slug: router.query.slug,
        },
    })

    // Questions
    const [
        getUserQuestions,
        {
            data: userQuestions,
            loading: questionsLoading,
            error: questionsError,
            refetch: questionsRefetch,
        },
    ] = useLazyQuery<QuestionQueryType, RefetchType>(GET_QUESTIONS, { fetchPolicy: 'network-only' })

    // Answers
    const [
        getUserAnswers,
        {
            data: userAnswers,
            loading: answersLoading,
            error: answersError,
            refetch: answersRefetch,
        },
    ] = useLazyQuery<AnswerQueryType, RefetchType>(GET_ANSWERS, {
        fetchPolicy: 'network-only',
    })

    // Teams
    const [
        getUserTeams,
        { data: userTeams, loading: teamsLoading, error: teamsError, refetch: teamsRefetch },
    ] = useLazyQuery<TeamQueryType, TeamRefetchType>(GET_TEAMS, { fetchPolicy: 'network-only' })
    useEffect(() => {
        if (activeTab === 'Questions') {
            void getUserQuestions({
                variables: {
                    first: view === 'List' ? 5 : 12,
                    page: 1,
                    filter: { user_slug: router.query.slug as string, ...answerFilter },
                    orderBy: [order],
                },
            })
        } else if (activeTab === 'Answers') {
            void getUserAnswers({
                variables: {
                    first: view === 'List' ? 5 : 12,
                    page: 1,
                    filter: { user_slug: router.query.slug as string, ...answerFilter },
                    orderBy: [order],
                },
            })
        } else if (activeTab === 'Teams') {
            void getUserTeams({
                variables: {
                    first: 12,
                    page: 1,
                    user_slug: router.query.slug as string,
                },
            })
        }
    }, [activeTab, view, router])

    const loading = questionsLoading || answersLoading || teamsLoading || userLoading
    const error = questionsError ?? answersError ?? teamsError ?? userError

    return {
        userData,
        userQuestions: userQuestions?.questions,
        userAnswers: userAnswers?.answers,
        userTeams: userTeams?.getUserTeams,
        loading,
        error,
        questionsRefetch,
        answersRefetch,
        teamsRefetch,
    }
}

export default useTabData
