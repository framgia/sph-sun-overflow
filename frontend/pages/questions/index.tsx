import Button from '@/components/atoms/Button'
import { CustomIcons } from '@/components/atoms/Icons'
import Search from '@/components/atoms/Icons/Search'
import InputField from '@/components/atoms/InputField'
import PageTitle from '@/components/atoms/PageTitle'
import DropdownFilters from '@/components/molecules/DropdownFilters'
import ViewToggle from '@/components/molecules/ViewToggle'
import Paginate from '@/components/organisms/Paginate'
import QuestionGridItem from '@/components/organisms/QuestionGridItem'
import QuestionListItem from '@/components/organisms/QuestionListItem'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { type View } from '../manage/users/[slug]'
import { type QuestionType } from './[slug]'

const { LoadingSpinner } = CustomIcons

export interface PaginatorInfo {
    perPage: number
    currentPage: number
    lastPage: number
    total: number
    hasMorePages: boolean
    count: number
}

export type RefetchType = {
    first: number
    page: number
    name?: string
    filter?: {
        keyword?: string
        answered?: boolean
        tag?: string
        team?: string
        user_slug?: string
    }
    isAdmin?: boolean
    orderBy?: Array<{ column: string; order: string }>
    sort?: Array<{ column: string; order: string }>
}

export type OrderOption = Record<string, { column: string; order: string }>
type FilterOption = Record<string, { answered: boolean }>

export const orderByOptions: OrderOption = {
    'Newest first': { column: 'CREATED_AT', order: 'DESC' },
    'Oldest first': { column: 'CREATED_AT', order: 'ASC' },
    'Most recent': { column: 'UPDATED_AT', order: 'DESC' },
    'Least recent': { column: 'UPDATED_AT', order: 'ASC' },
}

export const answerFilterOption: FilterOption = {
    Answered: { answered: true },
    Unanswered: { answered: false },
}

const QuestionsPage = (): JSX.Element => {
    const router = useRouter()
    const [searchKeyForInput, setSearchKeyForInput] = useState(String(router.query.searchKey ?? ''))
    const [searchKeyForApi, setSearchKeyForApi] = useState(String(router.query.searchKey ?? ''))
    const [viewType, setViewType] = useState<View>(String(router.query.viewType ?? 'List') as View)

    const orderFromParams = String(router.query.order ?? 'Newest first')
    const filterFromParams = String(router.query.filter ?? 'All Questions')
    const order = orderByOptions[orderFromParams]
    const answerFilter = answerFilterOption[filterFromParams]

    const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_QUESTIONS, {
        variables: {
            first: viewType === 'List' ? 10 : 12,
            page: 1,
            filter: { keyword: searchKeyForApi, tag: '', ...answerFilter },
            orderBy: [order],
        },
        notifyOnNetworkStatusChange: true,
    })
    if (error) return <span>{errorNotify(`Error! ${error.message}`)}</span>

    const { data: questions, paginatorInfo } = data?.questions ?? {}
    const questionList: QuestionType[] = questions
    const pageInfo: PaginatorInfo = paginatorInfo

    const onPageChange = (first: number, page: number): void => {
        void refetch({ first, page })
    }

    const toggleViewOnclick = (): void => {
        setViewType(viewType === 'Grid' ? 'List' : 'Grid')
        void router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                order: orderFromParams,
                filter: filterFromParams,
                searchKey: searchKeyForInput,
                viewType: viewType === 'Grid' ? 'List' : 'Grid',
            },
        })
    }

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setSearchKeyForApi(searchKeyForInput)
        await router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                order: orderFromParams,
                filter: filterFromParams,
                searchKey: searchKeyForInput,
            },
        })
    }

    const renderQuestionsItems = (): JSX.Element[] | null => {
        return (
            questionList.map((question: QuestionType) => {
                const props = {
                    key: question.id,
                    slug: question.slug,
                    title: question.title,
                    content: question.content,
                    voteCount: question.vote_count,
                    answerCount: question.answers?.length,
                    viewCount: question.views_count,
                    isPublic: question.is_public,
                    tags: question.tags,
                    author: question.user,
                }
                return viewType === 'List' ? (
                    <QuestionListItem {...props} createdAt={question.humanized_created_at} />
                ) : (
                    <QuestionGridItem
                        {...props}
                        upvotePercentage={question.upvote_percentage}
                        createdAt={question.created_at}
                    />
                )
            }) ?? null
        )
    }

    return (
        <>
            <PageTitle title="Questions" />
            <div
                className={`flex max-h-full flex-col gap-4 rounded-[5px] border border-neutral-200 bg-neutral-white p-4 ${
                    loading ? 'pointer-events-none' : ''
                }`}
            >
                <div className="flex w-full items-center justify-between">
                    <div className="text-xl font-semibold text-neutral-900">All Questions</div>
                    <Button
                        usage="stroke"
                        size="medium"
                        onClick={() => {
                            void router.push('/questions/add')
                        }}
                    >
                        Ask a Question
                    </Button>
                </div>
                <div className="question-list-header w-full">
                    <div className="flex flex-col gap-2">
                        <form onSubmit={handleSearchSubmit}>
                            <InputField
                                name="question_search"
                                placeholder="Search"
                                icon={
                                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 transform">
                                        <Search />
                                    </div>
                                }
                                additionalClass="h-10 question-list-search-input pl-8"
                                value={searchKeyForInput}
                                onChange={(e) => {
                                    setSearchKeyForInput(e.target.value)
                                    if (e.target.value === '' && searchKeyForApi !== '') {
                                        const { query } = router
                                        setSearchKeyForApi('')
                                        void refetch({
                                            first: viewType === 'List' ? 10 : 12,
                                            page: 1,
                                            filter: { keyword: '', tag: '' },
                                            orderBy: [order],
                                        })
                                        delete query.searchKey
                                        void router.replace({ query })
                                    }
                                }}
                            />
                        </form>
                        {searchKeyForApi && (
                            <div className="flex gap-1 truncate text-sm font-medium text-neutral-700">
                                {!pageInfo ? <LoadingSpinner /> : <span>{pageInfo.total} </span>}
                                {pageInfo?.total === 1 ? 'result' : 'results'} for{' '}
                                {`"${searchKeyForApi}"`}
                            </div>
                        )}
                    </div>
                    <div
                        className={`${
                            searchKeyForApi
                                ? 'question-list-filters'
                                : 'question-list-search-filters'
                        } flex`}
                    >
                        <div className="mr-1">
                            <ViewToggle
                                view={viewType}
                                onClick={() => {
                                    toggleViewOnclick()
                                }}
                            ></ViewToggle>
                        </div>
                        <DropdownFilters triggers={['DATE', 'ANSWER']} />
                    </div>
                </div>

                <div className="question-list scrollbar flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
                    {loading ? (
                        loadingScreenShow()
                    ) : !questionList.length ? (
                        <span className="p-2 text-center text-base font-semibold text-primary-gray">
                            No questions to show
                        </span>
                    ) : (
                        <div
                            className={`${
                                viewType === 'List'
                                    ? 'flex flex-col'
                                    : 'grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
                            } gap-4`}
                        >
                            {renderQuestionsItems()}
                        </div>
                    )}
                    {!loading && pageInfo?.lastPage > 1 && (
                        <Paginate {...pageInfo} onPageChange={onPageChange} />
                    )}
                </div>
            </div>
        </>
    )
}

export default QuestionsPage
