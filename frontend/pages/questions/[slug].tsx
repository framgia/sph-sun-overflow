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

export type User = {
    id: number
    first_name: string
    last_name: string
    avatar?: string
}

export type Comment = {
    id: number
    content: string
    user: User
    created_at: string
    updated_at: string
}
export type Question = {
    id: number
    title: string
    content: string
    created_at: string
    vote_count: number
    views_count: number
    tags: { id: number; name: string; is_watched_by_user: boolean }[]
    is_bookmark: boolean
    is_from_user: boolean
    user: User
    comments: Comment[]
}

const QuestionDetailPage = () => {
    const router = useRouter()
    const [comment, setComment] = useState(false)
    const [commentId, setCommentId] = useState(null)

    const query = router.query

    const { data, loading, error } = useQuery(GET_QUESTION, {
        variables: {
            slug: String(query.slug),
        },
    })

    if (loading) return loadingScreenShow()
    else if (error) return errorNotify(`Error! ${error}`)

    const question: Question = {
        ...data.question,
        created_at: data.question.humanized_created_at,
    }

    const answers: {
        id: number
        content: string
        created_at: string
        vote_count: number
        humanized_created_at: string
        is_bookmark: boolean
        is_correct: boolean
        is_created_by_user: boolean
        user: { id: number; first_name: string; last_name: string; avatar: string }
    }[] = data.question.answers

    return (
        <Fragment>
            <div className="flex flex-col gap-3 divide-y-2 divide-primary-gray py-8 pl-16 pr-52">
                <div className="flex flex-col gap-3 divide-y-2 divide-primary-gray">
                    <QuestionDetail
                        id={question.id}
                        title={question.title}
                        content={question.content}
                        created_at={question.created_at}
                        is_from_user={question.is_from_user}
                        vote_count={question.vote_count}
                        views_count={question.views_count}
                        tags={question.tags}
                        is_bookmark={question.is_bookmark}
                        user={question.user}
                    />
                    <div className="flex flex-col">
                        {question.comments.length > 0 && (
                            <div className="mt-2">
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
                        )}
                        <div className="flex flex-col gap-3 divide-y-2 pt-5">
                            <div
                                className="w-full cursor-pointer px-2 hover:text-blue-600"
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
                            {answers.length} {answers.length > 1 ? 'Answers' : 'Answer'}
                        </div>
                        <SortDropdown />
                    </div>
                    <div className="flex w-full flex-col gap-3 divide-y-2 divide-primary-gray">
                        {answers.map((answer) => (
                            <AnswerDetail
                                key={answer.id}
                                id={answer.id}
                                content={answer.content}
                                created_at={answer.humanized_created_at}
                                vote_count={answer.vote_count}
                                is_bookmark={answer.is_bookmark}
                                is_correct={answer.is_correct}
                                user={answer.user}
                                is_created_by_user={answer.is_created_by_user}
                            />
                        ))}
                        <AnswerComponent />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default QuestionDetailPage
