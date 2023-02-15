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
import SortDropdown from '@/components/molecules/SortDropdown'

export interface PaginatorInfo {
    currentPage: number
    lastPage: number
    hasMorePages: boolean
}

export type FilterType = {
    id: number
    name: string
    onClick: () => void
}

const QuestionsPage = () => {
    const [selectedDateFilter, setSelectedDateFilter] = useState('Newest first')
    const [selectedAnswerFilter, setSelectedAnswerFilter] = useState('Answered')
    const router = useRouter()

    const { data, loading, error, refetch } = useQuery(GET_QUESTIONS, {
        variables: {
            first: 10,
            page: 1,
            filter: 'answered',
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
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

    const dateFilters: FilterType[] = [
        {
            id: 1,
            name: 'Newest first',
            onClick: () => {
                refetch({
                    first: 10,
                    page: 1,
                    orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
                })
                setSelectedDateFilter('Newest first')
            },
        },
        {
            id: 2,
            name: 'Oldest first',
            onClick: () => {
                refetch({
                    first: 10,
                    page: 1,
                    orderBy: [{ column: 'CREATED_AT', order: 'ASC' }],
                })
                setSelectedDateFilter('Oldest first')
            },
        },
    ]

    const answerFilters: FilterType[] = [
        {
            id: 1,
            name: 'Answered',
            onClick: () => {
                refetch({ first: 10, page: 1, filter: 'answered' })
                setSelectedAnswerFilter('Answered')
            },
        },
        {
            id: 2,
            name: 'Unanswered',
            onClick: () => {
                refetch({ first: 10, page: 1, filter: 'unanswered' })
                setSelectedAnswerFilter('Unanswered')
            },
        },
    ]

    return (
        <div className="flex h-full w-full flex-col gap-4 px-10 pt-8 pb-5">
            <div className="flex flex-row items-center justify-between px-5">
                <Button
                    usage="ask_question"
                    additionalClass="ask-btn"
                    isDisabled={false}
                    onClick={onClickAskQuestion}
                >
                    Ask a Question
                </Button>
                <div className="flex gap-2">
                    <div className="w-32">
                        <SortDropdown filters={dateFilters} selectedFilter={selectedDateFilter} />
                    </div>
                    <div className="w-32">
                        <SortDropdown
                            filters={answerFilters}
                            selectedFilter={selectedAnswerFilter}
                        />
                    </div>
                </div>
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
                {pageInfo.lastPage > 1 && <Paginate {...pageInfo} onPageChange={onPageChange} />}
            </div>
        </div>
    )
}

export default QuestionsPage
