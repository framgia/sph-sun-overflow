import SortDropdown from '@/components/molecules/SortDropdown'
import AnswerDetail from '@/components/organisms/AnswerDetail'
import AnswerForm from '@/components/organisms/AnswerForm'
import Comment from '@/components/organisms/Comment'
import CommentForm from '@/components/organisms/CommentForm'
import QuestionDetail from '@/components/organisms/QuestionDetail'
import { FilterType } from '@/components/templates/QuestionsPageLayout'
import GET_QUESTION from '@/helpers/graphql/queries/get_question'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { AnswerEditType, QuestionType } from '@/pages/questions/[slug]'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'

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
            slug: String(query['question-slug']),
            shouldAddViewCount: true,
            answerSort: [{ column: 'VOTES', order: 'DESC' }],
        },
        fetchPolicy: 'network-only',
    })

    if (loading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error}`)
        router.push(`/teams/${router.query.slug}`)
        return <></>
    }
    const question: QuestionType = data.question

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
        <div className="flex w-full flex-col gap-3 pt-[50px]">
            <div className="px-6 text-xl text-primary-gray">
                <Link href={`/teams/${router.query.slug}`}>{'< Go Back'}</Link>
            </div>
            <div className="flex w-full flex-col gap-3 divide-primary-gray  pb-8 pr-52 pl-16">
                <div className="flex flex-col gap-3">
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
                        user_vote={question.user_vote}
                        user={question.user}
                        refetchHandler={refetchHandler}
                        is_bookmarked={question.is_bookmarked}
                        is_from_user={question.is_from_user}
                        team_slug={router.query.slug as string}
                        is_public={question.is_public}
                        team_name=""
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
                    {question.answers.length > 0 && (
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
                    )}
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
        </div>
    )
}

export default QuestionDetailPage
