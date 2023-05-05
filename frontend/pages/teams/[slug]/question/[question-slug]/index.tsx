import AnswerList from '@/components/organisms/AnswerList'
import QuestionDetail from '@/components/organisms/QuestionDetail'
import GET_QUESTION from '@/helpers/graphql/queries/get_question'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { type QuestionType } from '@/pages/questions/[slug]'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

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
            slug: String(query['question-slug']),
            shouldAddViewCount: true,
        },
    })
    if (loading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error.message}`)
        void router.push(`/teams/${router.query.slug as string}`)
        return <></>
    }
    const question: QuestionType = data.question

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
                team_slug={query.slug as string}
                is_bookmarked={question.is_bookmarked}
                user_vote={question.user_vote}
                user={question.user}
                refetchHandler={refetchHandler}
                is_from_user={question.is_from_user}
                is_public={question.is_public}
                comments={question.comments}
            />
            <AnswerList
                slug={String(query['question-slug'])}
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
