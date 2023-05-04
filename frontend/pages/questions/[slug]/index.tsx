import AnswerList from '@/components/organisms/AnswerList'
import QuestionDetail from '@/components/organisms/QuestionDetail'
import GET_QUESTION from '@/helpers/graphql/queries/get_question'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

export type UserType = {
    id?: number
    slug?: string
    first_name?: string
    last_name?: string
    avatar?: string
}

export type CommentType = {
    id: number
    content: string
    user: UserType
    created_at: string
    updated_at: string
}

export type TagType = {
    id: number
    slug: string
    name: string
    description: string
    is_watched_by_user: boolean
    count_tagged_questions?: number
    count_watching_users?: number
}

export type AnswerType = {
    id: number
    content: string
    created_at: string
    vote_count: number
    upvote_percentage: number
    humanized_created_at: string
    is_bookmarked: boolean
    is_correct: boolean
    is_created_by_user: boolean
    user_vote: number
    user: UserType
    is_from_user: boolean
    comments: CommentType[]
    question: QuestionType
}

export type TeamType = {
    id: number
    name: string
    slug?: string
    description: string
    members_count: number
}

export type QuestionType = {
    id: number
    title: string
    slug: string
    content: string
    created_at: string
    vote_count: number
    upvote_percentage: number
    views_count: number
    humanized_created_at: string
    is_public: boolean
    team_name: string
    tags: TagType[]
    is_bookmarked: boolean
    is_from_user: boolean
    is_answered: boolean
    user_vote: number
    user: UserType
    answers: AnswerType[]
    comments: CommentType[]
    team: TeamType
}

export type AnswerEditType = {
    id: number | null
    content: string | null
}

type RefetchType = {
    slug?: string
    shouldAddViewCount: boolean
    answerSort?: Array<{ column: string; order: string }>
}

const QuestionDetailPage = (): JSX.Element => {
    const router = useRouter()

    const query = router.query

    const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_QUESTION, {
        variables: {
            slug: String(query.slug),
            shouldAddViewCount: true,
        },
    })

    if (loading) return loadingScreenShow()
    if (error) {
        void router.replace('/404')
        return loadingScreenShow()
    }
    const question: QuestionType = {
        ...data.question,
    }

    const team = question.team === null ? '' : question.team.name

    const refetchHandler = (): void => {
        void refetch({ shouldAddViewCount: false })
    }

    return (
        <div className="flex w-full flex-col gap-4">
            <QuestionDetail
                id={question.id}
                title={question.title}
                content={question.content}
                slug={question.slug}
                created_at={question.created_at}
                humanized_created_at={question.humanized_created_at}
                vote_count={question.vote_count}
                views_count={question.views_count}
                tags={question.tags}
                is_bookmarked={question.is_bookmarked}
                user_vote={question.user_vote}
                user={question.user}
                refetchHandler={refetchHandler}
                is_from_user={question.is_from_user}
                is_public={question.is_public}
                team_name={team}
                comments={question.comments}
            />
            <AnswerList
                slug={String(query.slug)}
                answers={question.answers}
                question_id={question.id}
                question_is_from_user={question.is_from_user}
                is_answered={question.is_answered}
                refetchHandler={refetchHandler}
            />
        </div>
    )
}

export default QuestionDetailPage
