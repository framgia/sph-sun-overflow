import CommentForm from '@/components/organisms/CommentForm'
import SortDropdown from '@/components/molecules/SortDropdown'
import AnswerForm from '@/components/organisms/AnswerForm'
import AnswerDetail from '@/components/organisms/AnswerDetail'
import Comment from '@/components/organisms/Comment'
import QuestionDetail from '@/components/organisms/QuestionDetail'
import GET_QUESTION from '@/helpers/graphql/queries/get_question'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { FilterType } from '../../index'

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
    count_tagged_questions: number
    count_watching_users: number
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
    question: { slug: string }
}

export type QuestionType = {
    id: number
    title: string
    slug: string
    content: string
    created_at: string
    vote_count: number
    views_count: number
    humanized_created_at: string
    tags: TagType[]
    is_bookmarked: boolean
    is_from_user: boolean
    is_answered: boolean
    user_vote: number
    user: UserType
    answers: AnswerType[]
    comments: CommentType[]
}

export type AnswerEditType = {
    id: number | null
    content: string | null
}

type RefetchType = {
    slug?: string
    shouldAddViewCount: boolean
    answerSort?: { column: string; order: string }[]
}

const QuestionDetailPage = () => {
    const router = useRouter()
    const [comment, setComment] = useState(false)
    const [selectedAnswerFilter, setSelectedAnswerFilter] = useState('Highest Score')

    const [answer, setAnswer] = useState<AnswerEditType>({ id: null, content: null })

    const query = router.query

    const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_QUESTION, {
        variables: {
            slug: String(query.slug),
            shouldAddViewCount: true,
            answerSort: [{ column: 'VOTES', order: 'DESC' }],
        },
        fetchPolicy: 'network-only',
    })

    if (loading) return loadingScreenShow()
    else if (error) return errorNotify(`Error! ${error}`)
    const question: QuestionType = {
        ...data.question,
    }

    const refetchHandler = () => {
        refetch({ shouldAddViewCount: false })
    }

    const answerFilters: FilterType[][] = [
        [
            {
                id: 1,
                name: 'Highest Score',
                onClick: () => {
                    refetch({
                        shouldAddViewCount: false,
                        answerSort: [{ column: 'VOTES', order: 'DESC' }],
                    })
                    setSelectedAnswerFilter('Highest Score')
                },
            },
            {
                id: 2,
                name: 'Lowest Score',
                onClick: () => {
                    refetch({
                        shouldAddViewCount: false,
                        answerSort: [{ column: 'VOTES', order: 'ASC' }],
                    })
                    setSelectedAnswerFilter('Lowest Score')
                },
            },
        ],
        [
            {
                id: 3,
                name: 'Most Recent',
                onClick: () => {
                    refetch({
                        shouldAddViewCount: false,
                        answerSort: [{ column: 'CREATED_AT', order: 'DESC' }],
                    })
                    setSelectedAnswerFilter('Most Recent')
                },
            },
            {
                id: 2,
                name: 'Least Recent',
                onClick: () => {
                    refetch({
                        shouldAddViewCount: false,
                        answerSort: [{ column: 'CREATED_AT', order: 'ASC' }],
                    })
                    setSelectedAnswerFilter('Least Recent')
                },
            },
        ],
    ]

    return (
        <Fragment>
            <div className="flex w-full flex-col gap-3 divide-y-2 divide-primary-gray pt-[90px] pb-8 pr-52 pl-16">
                <div className="flex flex-col gap-3 divide-y-2 divide-primary-gray">
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
                    />
                    <div className="flex flex-col">
                        <div className="flex flex-col divide-y divide-primary-gray">
                            {question.comments.map((comment) => (
                                <Comment
                                    key={comment.id}
                                    id={comment.id}
                                    text={comment.content}
                                    author={`${comment.user.first_name} ${comment.user.last_name}`}
                                    time={comment.updated_at}
                                    action={
                                        comment.updated_at == comment.created_at
                                            ? 'added a'
                                            : 'updated his/her'
                                    }
                                    userId={comment.user.id}
                                    refetchHandler={refetchHandler}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col gap-3 divide-y divide-primary-gray pt-5">
                            <div
                                className="w-auto cursor-pointer px-2 text-blue-500 hover:text-blue-400"
                                onClick={() => setComment(!comment)}
                            >
                                Add comment
                            </div>
                            {comment && (
                                <CommentForm
                                    commentableId={question.id}
                                    commentableType="Question"
                                    refetchHandler={refetchHandler}
                                    setComment={setComment}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-3 pt-3">
                    <div className="flex w-full flex-row items-center justify-between">
                        <div className="w-full text-2xl font-bold">
                            {question.answers.length}{' '}
                            {question.answers.length > 1 ? 'Answers' : 'Answer'}
                        </div>
                        <div className="flex items-center">
                            <span className="w-[9rem] pr-2 text-end text-sm">Sorted by:</span>
                            <div className="w-44">
                                <SortDropdown
                                    grouped={true}
                                    filters={answerFilters}
                                    selectedFilter={selectedAnswerFilter}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-3 divide-y-2 divide-primary-gray">
                        {question.answers.map((answer) => (
                            <AnswerDetail
                                key={answer.id}
                                id={answer.id}
                                onEdit={setAnswer}
                                question_id={question.id}
                                content={answer.content}
                                created_at={answer.humanized_created_at}
                                vote_count={answer.vote_count}
                                is_bookmarked={answer.is_bookmarked}
                                is_correct={answer.is_correct}
                                user={answer.user}
                                is_created_by_user={answer.is_created_by_user}
                                comments={answer.comments}
                                question_is_from_user={question.is_from_user}
                                answer_is_from_user={answer.is_from_user}
                                is_answered={question.is_answered}
                                user_vote={answer.user_vote}
                                refetchHandler={refetchHandler}
                            />
                        ))}
                        <AnswerForm
                            slug={String(query.slug)}
                            onEdit={setAnswer}
                            answer={answer}
                            question_id={question.id}
                            refetchHandler={refetchHandler}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default QuestionDetailPage
