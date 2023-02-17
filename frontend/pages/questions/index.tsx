import Button from '@/components/atoms/Button'
import Filters from '@/components/molecules/Filters'
import Paginate from '@/components/organisms/Paginate'
import QuestionList from '@/components/organisms/QuestionList'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import { useQuery } from '@apollo/client'
import { loadingScreenShow } from '../../helpers/loaderSpinnerHelper'
import { errorNotify } from '../../helpers/toast'
import { QuestionType } from './[slug]'
import SortDropdown from '@/components/molecules/SortDropdown'
import { HiSearch } from 'react-icons/hi'

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
    const pathIsSearchResult = router.asPath.includes('/questions?search=')
    const [searchKey, setSearchKey] = useState(router.query.search)

    const { data, loading, error, refetch } = useQuery(GET_QUESTIONS, {
        variables: {
            first: 10,
            page: 1,
            filter: { answered: true, tag: null },
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
                refetch({ first: 10, page: 1, filter: { answered: true, tag: null } })
                setSelectedAnswerFilter('Answered')
            },
        },
        {
            id: 2,
            name: 'Unanswered',
            onClick: () => {
                refetch({ first: 10, page: 1, filter: { answered: false, tag: null } })
                setSelectedAnswerFilter('Unanswered')
            },
        },
    ]

    const renderSortAndFilter = (): JSX.Element => {
        return (
            <div className="flex gap-2">
                <div className="w-32">
                    <SortDropdown filters={dateFilters} selectedFilter={selectedDateFilter} />
                </div>
                <div className="w-32">
                    <SortDropdown filters={answerFilters} selectedFilter={selectedAnswerFilter} />
                </div>
            </div>
        )
    }

    const renderQuestionListHeader = (): JSX.Element => {
        return (
            <div className="flex flex-row items-center justify-between px-5">
                <Button
                    usage="ask_question"
                    additionalClass="ask-btn"
                    isDisabled={false}
                    onClick={onClickAskQuestion}
                >
                    Ask a Question
                </Button>
                {renderSortAndFilter()}
            </div>
        )
    }

    const handleSearchSubmit = (e): void => {
        e.preventDefault()

        router.push(
            {
                pathname: `/questions`,
                query: {
                    searchKey,
                },
            },
            `/questions?search=${searchKey}`,
            { shallow: true }
        )
    }

    const renderSearchResultHeader = (): JSX.Element => {
        return (
            <div>
                <div className="w-full border-b-2">
                    <div className=" pb-5 text-3xl font-semibold">Search Results</div>
                </div>
                <div className="mt-2 flex flex-row items-center justify-between px-2">
                    <form onSubmit={handleSearchSubmit}>
                        <div className="relative w-48 lg:w-80">
                            <input
                                type="text"
                                name="search"
                                value={searchKey}
                                onChange={(e) => setSearchKey(e.target.value)}
                                className="form-input h-11 w-48 rounded-md border border-gray-300 px-4 text-gray-900 focus:border-red-500 focus:ring-red-500 lg:w-80"
                                placeholder="Search"
                                required
                            />
                            <Button type="submit" usage="icon">
                                <HiSearch
                                    size={20}
                                    className="mr-1 text-gray-400 hover:text-red-500"
                                />
                            </Button>
                        </div>
                    </form>
                    {renderSortAndFilter()}
                </div>
                <div className="text-md mt-1 pl-3 text-gray-800">500 result for {searchKey}</div>
            </div>
        )
    }

    return (
        <div className="flex h-full w-full flex-col gap-4 px-10 pt-8 pb-5">
            {pathIsSearchResult ? renderSearchResultHeader() : renderQuestionListHeader()}
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
