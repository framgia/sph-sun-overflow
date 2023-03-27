import Button from '@/components/atoms/Button'
import DropdownFilters from '@/components/molecules/DropdownFilters'
import Paginate from '@/components/organisms/Paginate'
import QuestionList from '@/components/organisms/QuestionList'
import type { RefetchType } from '@/pages/questions'
import type { QuestionType } from '@/pages/questions/[slug]'
import type { ApolloQueryResult } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'

export interface PaginatorInfo {
    perPage: number
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
                <DropdownFilters
                    triggers={['DATE', 'ANSWER']}
                    searchKey={searchKey}
                    team={team}
                    refetch={refetch}
                    tag={selectedTag}
                />
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

    const renderTeamQuestionListHeader = (): JSX.Element => {
        return <div className="flex flex-row justify-end">{renderSortAndFilter()}</div>
    }

    const renderTaggedQuestionListHeader = (): JSX.Element => {
        return (
            <div>
                <div className="w-full border-b-2">
                    <h1 className="mb-6 text-2xl font-bold">
                        Questions tagged with{' '}
                        <span className="text-primary-red">{selectedTag}</span>
                    </h1>
                </div>
                <div className="mt-2 flex flex-row items-center justify-end px-2">
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

    const externalStyle = !isPrivate ? 'pt-8 px-10' : ''
    return (
        <div className={`flex h-full w-full flex-col gap-4 pb-5 ${externalStyle}`}>
            {renderHeader()}
            <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col gap-3 divide-y-2 divide-primary-gray pl-6 ">
                    {!questionList.length && (
                        <div className="mt-10 text-center text-2xl font-semibold">
                            No Questions to Show
                        </div>
                    )}
                    {questionList.map(function (question) {
                        return (
                            <QuestionList
                                key={question.id}
                                id={question.id}
                                title={question.title}
                                slug={team}
                                question_slug={question.slug}
                                page_slug={page_slug}
                                previous_page_slug={previous_page_slug}
                                content={question.content}
                                created_at={question.created_at}
                                humanized_created_at={question.humanized_created_at}
                                vote_count={question.vote_count}
                                answer_count={question.answers.length}
                                view_count={question.views_count}
                                tags={question.tags}
                                user={question.user}
                                team_name={question.team?.name ?? ''}
                                team_slug={question.team?.slug ?? ''}
                                is_public={question.is_public}
                            />
                        )
                    })}
                </div>
                {pageInfo.lastPage > 1 && <Paginate {...pageInfo} onPageChange={onPageChange} />}
            </div>
        </div>
    )
}

export default QuestionsPageLayout
