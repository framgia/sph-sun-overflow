import Button from '@/components/atoms/Button'
import Filters from '@/components/molecules/Filters'
import Paginate from '@/components/organisms/Paginate'
import QuestionList from '@/components/organisms/QuestionList'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import { useQuery } from '@apollo/client'
import { loadingScreenShow } from '../../helpers/loaderSpinnerHelper'
import { errorNotify } from '../../helpers/toast'
import { QuestionType } from './[slug]'

export interface PaginatorInfo {
    currentPage: number
    lastPage: number
    hasMorePages: boolean
}

const QuestionsPage = () => {
    const [dateAscending, setDateAscending] = useState(true)
    const [isAnswered, setIsAnswered] = useState(false)
    const router = useRouter()

    const { data, loading, error, refetch } = useQuery(GET_QUESTIONS, {
        variables: {
            first: 10,
            page: 1,
            filter: 'answered',
            orderBy: [{ column: 'CREATED_AT', order: 'ASC' }],
        },
    })

    if (loading) return loadingScreenShow()
    if (error) return errorNotify(`Error! ${error}`)

    const { data: questions, paginatorInfo } = data.questions
    const questionList: QuestionType[] = questions
    const pageInfo: PaginatorInfo = paginatorInfo

    const onPageChange = (first: number, page: number) => {
        refetch({ first, page })
    }

    const onClickAskQuestion = (event: React.MouseEvent) => {
        event.preventDefault()

        router.push('/questions/add')
    }

    const onClickDateFilter = (event: React.MouseEvent) => {
        event.preventDefault()

        refetch({
            first: 10,
            page: 1,
            orderBy: [{ column: 'CREATED_AT', order: !dateAscending ? 'ASC' : 'DESC' }],
        })
        setDateAscending((prevState) => !prevState)
    }

    const onClickAnsweredFilter = (event: React.MouseEvent) => {
        event.preventDefault()
        refetch({ first: 10, page: 1, filter: isAnswered ? 'answered' : 'unanswered' })
        setIsAnswered((prevState) => !prevState)
    }

    return (
        <div className="flex h-full w-full flex-col gap-4 px-10 pt-8 pb-5">
            <div className="flex flex-row items-center justify-between px-5">
                <Button usage="ask_question" isDisabled={false} onClick={onClickAskQuestion}>
                    Ask a Question
                </Button>
                <Filters
                    dateAscending={dateAscending}
                    isAnswered={isAnswered}
                    onClickDate={onClickDateFilter}
                    onClickAnswered={onClickAnsweredFilter}
                />
            </div>
            <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col gap-3 divide-y-2 divide-primary-gray">
                    {questionList.map(function (question) {
                        return (
                            <QuestionList
                                key={question.id}
                                id={question.id}
                                title={question.title}
                                slug={question.slug}
                                content={question.content}
                                created_at={question.created_at}
                                humanized_created_at={question.humanized_created_at}
                                vote_count={question.vote_count}
                                answer_count={question.answers.length}
                                view_count={question.views_count}
                                tags={question.tags}
                                user={question.user}
                            />
                        )
                    })}
                </div>
                <Paginate {...pageInfo} onPageChange={onPageChange} />
            </div>
        </div>
    )
}

export default QuestionsPage
