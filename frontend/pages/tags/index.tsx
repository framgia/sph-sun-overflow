import { CustomIcons } from '@/components/atoms/Icons'
import InputField from '@/components/atoms/InputField'
import PageTitle from '@/components/atoms/PageTitle'
import SortDropdown from '@/components/molecules/SortDropdown'
import TagsCard from '@/components/molecules/TagsCard'
import Paginate from '@/components/organisms/Paginate'
import type { FilterType, PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import GET_TAGS from '@/helpers/graphql/queries/get_tags'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { loadingScreenShow } from '../../helpers/loaderSpinnerHelper'
import { errorNotify } from '../../helpers/toast'
import type { TagType } from '../questions/[slug]'
import type { OrderOption, RefetchType } from '../questions/index'

const { SearchIcon, LoadingSpinner } = CustomIcons

const filterOptions: OrderOption = {
    'Most Popular': { column: 'POPULARITY', order: 'DESC' },
    'Least Popular': { column: 'POPULARITY', order: 'ASC' },
    'Most Watched': { column: 'WATCH_COUNT', order: 'DESC' },
    'Least Watched': { column: 'WATCH_COUNT', order: 'ASC' },
    'Newest First': { column: 'CREATED_AT', order: 'DESC' },
    'Oldest First': { column: 'CREATED_AT', order: 'ASC' },
}

const TagsListPage = (): JSX.Element => {
    const router = useRouter()
    const [selectedFilter, setSelectedFilter] = useState(
        String(router.query.filter ?? 'Most Popular')
    )
    const [searchKey, setSearchKey] = useState(String(router.query.search ?? ''))
    const [term, setTerm] = useState('')
    const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_TAGS, {
        variables: {
            first: 9,
            page: 1,
            name: `%${term}%`,
            sort: [filterOptions[String(router.query.filter ?? 'Most Popular')]],
        },
        notifyOnNetworkStatusChange: true,
    })

    if (error) return <span>{errorNotify(`Error! ${error.message}`)}</span>

    const { data: tags, paginatorInfo } = data?.tags ?? {}
    const tagList: TagType[] = tags
    const pageInfo: PaginatorInfo = paginatorInfo

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await refetch({ first, page })
    }

    const routerHandler = (filter: string, search: string): void => {
        void router.push({
            pathname: router.pathname,
            query: { ...router.query, filter, search },
        })
    }

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        setTerm(searchKey)
        routerHandler(selectedFilter, searchKey)
    }

    const tagFilters: FilterType[][] = [
        [
            {
                id: 1,
                name: 'Most Popular',
                onClick: () => {
                    setSelectedFilter('Most Popular')
                    routerHandler('Most Popular', term)
                },
            },
            {
                id: 2,
                name: 'Least Popular',
                onClick: () => {
                    setSelectedFilter('Least Popular')
                    routerHandler('Least Popular', term)
                },
            },
        ],
        [
            {
                id: 1,
                name: 'Most Watched',
                onClick: () => {
                    setSelectedFilter('Most Watched')
                    routerHandler('Most Watched', term)
                },
            },
            {
                id: 2,
                name: 'Least Watched',
                onClick: () => {
                    setSelectedFilter('Least Watched')
                    routerHandler('Least Watched', term)
                },
            },
        ],
        [
            {
                id: 1,
                name: 'Newest First',
                onClick: () => {
                    setSelectedFilter('Newest First')
                    routerHandler('Newest First', term)
                },
            },
            {
                id: 2,
                name: 'Oldest First',
                onClick: () => {
                    setSelectedFilter('Oldest First')
                    routerHandler('Oldest First', term)
                },
            },
        ],
    ]

    const onSearchInputChange = (value: string): void => {
        if (value === '' && term !== '') {
            const { query } = router
            void refetch({ first: 9, page: 1, name: '%%' })
            setTerm('')
            delete query.search
            void router.replace({ query })
        }
        setSearchKey(value)
    }

    return (
        <>
            <PageTitle title="Tags" />
            <div
                className={`flex max-h-full flex-col gap-4 rounded-[5px] border border-neutral-200 bg-neutral-white p-4
             ${loading ? 'pointer-events-none' : ''}`}
            >
                <h1 className="text-xl font-semibold text-neutral-900">All Tags</h1>
                <div className="flex flex-col gap-2">
                    <div className="flex w-full items-center justify-between">
                        <form onSubmit={handleSearchSubmit}>
                            <InputField
                                name="tag_search"
                                placeholder="Search tag"
                                icon={
                                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 transform">
                                        <SearchIcon />
                                    </div>
                                }
                                additionalClass="h-10 question-list-search-input pl-8"
                                value={searchKey}
                                onChange={(e) => {
                                    onSearchInputChange(e.target.value)
                                }}
                            />
                        </form>
                        <SortDropdown
                            filters={tagFilters}
                            selectedFilter={selectedFilter}
                            grouped
                        />
                    </div>
                    {term && (
                        <div className="flex gap-1 truncate text-sm font-medium text-neutral-700">
                            {!pageInfo ? <LoadingSpinner /> : <span>{pageInfo.total} </span>}
                            {pageInfo?.total === 1 ? 'result' : 'results'} for {`"${term}"`}
                        </div>
                    )}
                </div>
                {loading ? (
                    loadingScreenShow()
                ) : !tagList.length ? (
                    <span className="p-2 text-center text-base font-semibold text-primary-gray">
                        No tags to show
                    </span>
                ) : (
                    <div className="scrollbar flex flex-col gap-4 overflow-y-auto">
                        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {tagList.map((tag) => {
                                return (
                                    <TagsCard
                                        key={tag.id}
                                        id={tag.id}
                                        slug={tag.slug}
                                        description={tag.description}
                                        name={tag.name}
                                        questionsCount={tag.count_tagged_questions ?? 0}
                                        watchersCount={tag.count_watching_users ?? 0}
                                    />
                                )
                            })}
                        </div>
                        {!loading && pageInfo.lastPage > 1 && (
                            <Paginate {...pageInfo} onPageChange={onPageChange} />
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default TagsListPage
