import { CustomIcons } from '@/components/atoms/Icons'
import InputField from '@/components/atoms/InputField'
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

const { FilterIcon, SearchIcon } = CustomIcons

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
            name: `%${String(router.query.search ?? '')}%`,
            sort: [filterOptions[String(router.query.filter ?? 'Most Popular')]],
        },
    })

    if (loading) return loadingScreenShow()
    if (error) return <span>{errorNotify(`Error! ${error.message}`)}</span>

    const { data: tags, paginatorInfo } = data.tags
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
                onClick: async () => {
                    setSelectedFilter('Most Popular')
                    routerHandler('Most Popular', searchKey)
                },
            },
            {
                id: 2,
                name: 'Least Popular',
                onClick: async () => {
                    setSelectedFilter('Least Popular')
                    routerHandler('Least Popular', searchKey)
                },
            },
        ],
        [
            {
                id: 1,
                name: 'Most Watched',
                onClick: async () => {
                    setSelectedFilter('Most Watched')
                    routerHandler('Most Watched', searchKey)
                },
            },
            {
                id: 2,
                name: 'Least Watched',
                onClick: async () => {
                    setSelectedFilter('Least Watched')
                    routerHandler('Least Watched', searchKey)
                },
            },
        ],
        [
            {
                id: 1,
                name: 'Newest First',
                onClick: async () => {
                    setSelectedFilter('Newest First')
                    routerHandler('Newest First', searchKey)
                },
            },
            {
                id: 2,
                name: 'Oldest First',
                onClick: async () => {
                    setSelectedFilter('Oldest First')
                    routerHandler('Oldest First', searchKey)
                },
            },
        ],
    ]

    const onSearchInputChange = (value: string): void => {
        if (value === '') {
            void refetch({ first: 9, page: 1, name: '%%' })
            setTerm('')
        }
        setSearchKey(value)
    }

    return (
        <div className="flex max-h-full flex-col gap-4 overflow-hidden rounded-[5px] border border-neutral-200 bg-neutral-white p-4">
            <h1 className="text-xl font-semibold text-neutral-900">All Tags</h1>
            <div className="flex w-full flex-row items-center justify-between">
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
                    icon={
                        <div className="ml-1 flex h-full items-center">
                            <FilterIcon />
                        </div>
                    }
                />
            </div>
            {term && (
                <div className="truncate px-2 pt-1 text-sm text-gray-600">
                    {pageInfo.total} {pageInfo.total === 1 ? 'result' : 'results'} for {`"${term}"`}
                </div>
            )}
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
                {pageInfo.lastPage > 1 && <Paginate {...pageInfo} onPageChange={onPageChange} />}
            </div>
        </div>
    )
}

export default TagsListPage
