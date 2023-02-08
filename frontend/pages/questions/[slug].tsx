import CommentForm from '@/components/organisms/CommentForm'
import AnswerDetail from '@/components/organisms/AnswerDetail'
import Comment from '@/components/organisms/Comment'
import QuestionDetail from '@/components/organisms/QuestionDetail'
import GET_QUESTION from '@/helpers/graphql/queries/get_question'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import AnswerForm from '@/components/organisms/AnswerForm'

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

    const question: {
        id: number
        title: string
        content: string
        created_at: string
        vote_count: number
        views_count: number
        tags: { id: number; name: string; is_watched_by_user: boolean }[]
        is_bookmark: boolean
        is_from_user: boolean
        user: { id: number; first_name: string; last_name: string; avatar: string }
    } = {
        ...data.question,
        created_at: data.question.humanized_created_at,
    }

    const answer: {
        id: number
        content: string
        created_at: string
        vote_count: number
        is_bookmark: boolean
        is_correct: boolean
        user: { id: number; first_name: string; last_name: string; avatar: string }
    } = {
        id: 149,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore',
        created_at: '2 days ago',
        vote_count: 2,
        is_bookmark: false,
        is_correct: false,
        user: {
            id: 2,
            first_name: 'John',
            last_name: 'Doe',
            avatar: 'image',
        },
    }

    return (
        <Fragment>
            <div className="gap-3 py-8 pl-16 pr-52">
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
                <div className="mt-2 border-t-2">
                    <Comment
                        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit..."
                        author="John Doe"
                    />
                    <Comment text="This is a comment." author="James Bow" />
                    <Comment text="This is another comment!" author="Jane Dough" />
                    <div
                        className="mt-10 w-full cursor-pointer border-b-2 pl-2 pb-2 hover:text-blue-600"
                        onClick={() => setComment(!comment)}
                    >
                        Add comment
                    </div>
                    {comment && <CommentForm id={commentId} />}
                </div>
                <div className="my-4 w-full border-t-2" />
                <AnswerDetail
                    id={answer.id}
                    question_id={question.id}
                    content={answer.content}
                    created_at={answer.created_at}
                    vote_count={answer.vote_count}
                    is_bookmark={answer.is_bookmark}
                    is_correct={answer.is_correct}
                    user={answer.user}
                    is_from_user={question.is_from_user}
                />
                <div>
                    <AnswerForm question_id={question.id} />
                </div>
            </div>
        </Fragment>
    )
}

export default QuestionDetailPage
