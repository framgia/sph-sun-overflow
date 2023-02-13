import CommentForm from '@/components/organisms/CommentForm'
import SortDropdown from '@/components/molecules/SortDropdown'
import AnswerComponent from '@/components/organisms/AnswerComponent'
import AnswerDetail from '@/components/organisms/AnswerDetail'
import Comment from '@/components/organisms/Comment'
import QuestionDetail from '@/components/organisms/QuestionDetail'
import GET_QUESTION from '@/helpers/graphql/queries/get_question'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'

export type UserType = {
    id: number
    first_name: string
    last_name: string
    avatar?: string
}

export type CommentType = {
    id: number
    content: string
    user: UserType
    created_at: string
    updated_at: string
}

export type AnswerType = {
    id: number
    content: string
    created_at: string
    vote_count: number
    humanized_created_at: string
    is_bookmarked: boolean
    is_correct: boolean
    is_created_by_user: boolean
    user_vote: number
    user: UserType
    is_from_user: boolean
    comments: CommentType[]
}

export type QuestionType = {
    id: number
    title: string
    content: string
    created_at: string
    vote_count: number
    views_count: number
    humanized_created_at: string
    tags: { id: number; name: string; is_watched_by_user: boolean }[]
    is_bookmarked: boolean
    is_from_user: boolean
    is_answered: boolean
    user_vote: number
    user: UserType
    answers: AnswerType[]
    comments: CommentType[]
}

const QuestionDetailPage = () => {
    const router = useRouter()
    const [comment, setComment] = useState(false)
    const [commentId, setCommentId] = useState(null)

    const query = router.query

    const { data, loading, error, refetch } = useQuery(GET_QUESTION, {
        variables: {
            slug: String(query.slug),
            shouldAddViewCount: true,
        },
    })

    if (loading) return loadingScreenShow()
    else if (error) return errorNotify(`Error! ${error}`)
    const question: QuestionType = {
        ...data.question,
    }

    const refetchHandler = () => {
        refetch({ shouldAddViewCount: false })
    }

    return (
        <Fragment>
            <div className="flex w-full flex-col gap-3 divide-y-2 divide-primary-gray py-8 pr-52 pl-16">
                <div className="flex flex-col gap-3 divide-y-2 divide-primary-gray">
                    <QuestionDetail
                        id={question.id}
                        title={question.title}
                        content={question.content}
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
                    />
                    <div className="flex flex-col">
                        <div className="flex flex-col divide-y divide-primary-gray">
                            {question.comments.map((comment) => (
                                <Comment
                                    key={comment.id}
                                    text={comment.content}
                                    author={`${comment.user.first_name} ${comment.user.last_name}`}
                                    time={comment.updated_at}
                                    userId={comment.user.id}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col gap-3 divide-y-2 pt-5">
                            <div
                                className="w-full cursor-pointer px-2 text-blue-500 hover:text-blue-400"
                                onClick={() => setComment(!comment)}
                            >
                                Add comment
                            </div>
                            {comment && <CommentForm id={commentId} />}
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-3 pt-3">
                    <div className="flex w-full flex-row justify-between">
                        <div className="w-full text-2xl font-bold">
                            {question.answers.length}{' '}
                            {question.answers.length > 1 ? 'Answers' : 'Answer'}
                        </div>
                        <SortDropdown />
                    </div>
                    <div className="flex w-full flex-col gap-3 divide-y-2 divide-primary-gray">
                        {question.answers.map((answer) => (
                            <AnswerDetail
                                key={answer.id}
                                id={answer.id}
                                question_id={question.id}
                                content={answer.content}
                                created_at={answer.created_at}
                                vote_count={answer.vote_count}
                                is_bookmarked={answer.is_bookmarked}
                                is_correct={answer.is_correct}
                                user={answer.user}
                                is_created_by_user={answer.is_created_by_user}
                                comments={answer.comments}
                                is_from_user={answer.is_from_user}
                                refetch={refetch}
                                is_answered={question.is_answered}
                                user_vote={answer.user_vote}
                                refetchHandler={refetchHandler}
                            />
                        ))}
                        <AnswerComponent question_id={question.id} refetch={refetch} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default QuestionDetailPage
