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
import { HiSearch } from 'react-icons/hi'
import DropdownFilters from '@/components/molecules/DropdownFilters'

export interface PaginatorInfo {
    currentPage: number
    lastPage: number
    total: number
    hasMorePages: boolean
}

export type FilterType = {
    id: number
    name: string
    onClick: () => void
}

export type RefetchType = {
    first: number
    page: number
    filter?: { keyword?: string; answered?: boolean; tag?: null }
    orderBy?: { column: string; order: string }[]
}

const QuestionsPage = () => {
    const router = useRouter()
    const [searchKey, setSearchKey] = useState('')

    const pathIsSearchResult = router.asPath.includes('/questions?search=')

    const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_QUESTIONS, {
        variables: {
            first: 10,
            page: 1,
            filter: { keyword: searchKey, answered: true, tag: null },
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
        },
    })

    useEffect(() => {
        setSearchKey(router.query.search as string)
        refetch({
            page: 1,
            filter: { keyword: router.query.search as string, answered: true, tag: null },
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
        })
    }, [router, searchKey, refetch])

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

    const renderSortAndFilter = (): JSX.Element => {
        return (
            <div className="flex gap-2">
                <DropdownFilters triggers={['DATE', 'ANSWER']} refetch={refetch} />
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

    const renderSearchResultHeader = (): JSX.Element => {
        return (
            <div>
                <div className="w-full border-b-2">
                    <div className=" pb-3 text-3xl font-semibold">Search Results</div>
                    <div className="text-md mt-1 mb-2 pl-6 text-gray-800">
                        {pageInfo.total} result for {`"${searchKey}"`}
                    </div>
                </div>
                <div className="mt-2 flex flex-row items-center justify-end px-2">
                    {renderSortAndFilter()}
                </div>
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
