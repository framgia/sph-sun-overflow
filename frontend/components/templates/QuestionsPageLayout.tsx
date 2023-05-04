import Button from '@/components/atoms/Button'
import DropdownFilters from '@/components/molecules/DropdownFilters'
import Paginate from '@/components/organisms/Paginate'
import type { RefetchType } from '@/pages/questions'
import type { QuestionType } from '@/pages/questions/[slug]'
import type { ApolloQueryResult } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
import QuestionListItem from '../organisms/QuestionListItem'

export interface PaginatorInfo {
    perPage: number
    currentPage: number
    lastPage: number
    total: number
    hasMorePages: boolean
    count: number
}

export type FilterType = {
    id: number
    name: string
    onClick: () => void
}

interface IProps {
    refetch: (variables?: Partial<RefetchType> | undefined) => Promise<ApolloQueryResult<any>>
    isSearchResult?: boolean
    searchKey?: string
    isPrivate: boolean
    data: {
        questions: {
            paginatorInfo: PaginatorInfo
            data: [QuestionType]
        }
    }
    team?: string
    page_slug?: string
    previous_page_slug?: string
    selectedTag?: string
}

const QuestionsPageLayout = ({
    refetch,
    data,
    searchKey = '',
    isSearchResult = false,
    isPrivate = false,
    team = '',
    page_slug = '',
    previous_page_slug = '',
    selectedTag,
}: IProps): JSX.Element => {
    const router = useRouter()
    const { data: questions, paginatorInfo } = data.questions
    const questionList: QuestionType[] = questions
    const pageInfo: PaginatorInfo = paginatorInfo

    const onPageChange = (first: number, page: number): void => {
        void refetch({ first, page })
    }

    const onClickAskQuestion = (event: React.MouseEvent): void => {
        event.preventDefault()

        void router.push('/questions/add')
    }

    const renderSortAndFilter = (): JSX.Element => {
        return (
            <div className="flex gap-2">
                <DropdownFilters triggers={['DATE', 'ANSWER']} />
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
                    <div className="text-md mb-2 mt-1 pl-6 text-gray-800">
                        {pageInfo.total} result for {`"${searchKey}"`}
                    </div>
                </div>
                <div className="mt-2 flex flex-row items-center justify-end px-2">
                    {renderSortAndFilter()}
                </div>
            </div>
        )
    }

    const renderTeamQuestionListHeader = (): JSX.Element => {
        return <div className="flex flex-row justify-end">{renderSortAndFilter()}</div>
    }

    const renderTaggedQuestionListHeader = (): JSX.Element => {
        return (
            <div>
                <div className="flex flex-col justify-between gap-2 xl:flex-row xl:items-center">
                    <h1 className="text-base font-semibold">
                        Questions tagged with{' '}
                        <span className="text-primary-base">{selectedTag}</span>
                    </h1>
                    {renderSortAndFilter()}
                </div>
            </div>
        )
    }

    const renderHeader = (): JSX.Element => {
        if (isPrivate) {
            return renderTeamQuestionListHeader()
        }
        if (isSearchResult) {
            return renderSearchResultHeader()
        }
        if (selectedTag) {
            return renderTaggedQuestionListHeader()
        }
        return renderQuestionListHeader()
    }

    const externalStyle = !isPrivate ? 'p-4' : ''
    return (
        <div
            className={`flex flex-col gap-4 rounded-[5px] border border-neutral-200 bg-neutral-white ${externalStyle}`}
        >
            {renderHeader()}
            <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col gap-4">
                    {!questionList.length && (
                        <div className="mt-10 text-center text-2xl font-semibold">
                            No Questions to Show
                        </div>
                    )}
                    {questionList.map((question) => (
                        <QuestionListItem
                            key={question.id}
                            title={question.title}
                            slug={question.slug}
                            content={question.content}
                            createdAt={question.humanized_created_at}
                            voteCount={question.vote_count}
                            answerCount={question.answers.length}
                            viewCount={question.views_count}
                            tags={question.tags}
                            author={question.user}
                            isPublic={question.is_public}
                        />
                    ))}
                    {pageInfo.lastPage > 1 && (
                        <Paginate {...pageInfo} onPageChange={onPageChange} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default QuestionsPageLayout
