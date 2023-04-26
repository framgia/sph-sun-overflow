import Pill from '@/components/molecules/Pill'
import SearchInput from '@/components/molecules/SearchInput'
import SortDropdown from '@/components/molecules/SortDropdown'
import Paginate from '@/components/organisms/Paginate'
import type { FilterType, PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import GET_TAGS from '@/helpers/graphql/queries/get_tags'
import { useQuery } from '@apollo/client'
import { Card, CardBody, CardFooter, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { loadingScreenShow } from '../../helpers/loaderSpinnerHelper'
import { errorNotify } from '../../helpers/toast'
import type { TagType } from '../questions/[slug]'
import type { OrderOption, RefetchType } from '../questions/index'

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
            first: 6,
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

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const target = e.target as typeof e.target & {
            search: { value: string }
        }

        setSearchKey(target.search.value)
        setTerm(target.search.value)
        routerHandler(selectedFilter, target.search.value)
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
                    routerHandler('Most Popular', searchKey)
                },
            },
            {
                id: 2,
                name: 'Oldest First',
                onClick: async () => {
                    setSelectedFilter('Oldest First')
                    routerHandler('Most Popular', searchKey)
                },
            },
        ],
    ]

    const onSearchInputChange = (value: string): void => {
        if (value === '') {
            void refetch({ first: 6, page: 1, name: '%%' })
            setTerm('')
        }
        setSearchKey(value)
    }

    return (
        <div className="flex flex-col">
            <div className="w-full">
                <div className="text-3xl font-bold text-gray-800">Tags</div>
            </div>
            <div className="mt-4 flex h-full w-full flex-col">
                <div className="flex h-full w-full flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-between">
                        <form onSubmit={handleSearchSubmit}>
                            <SearchInput
                                placeholder="Search tag"
                                value={searchKey}
                                onChange={onSearchInputChange}
                            />
                        </form>
                    </div>
                    <SortDropdown filters={tagFilters} selectedFilter={selectedFilter} grouped />
                </div>
                {term && (
                    <div className="truncate px-2 pt-1 text-sm text-gray-600">
                        {pageInfo.total} {pageInfo.total === 1 ? 'result' : 'results'} for{' '}
                        {`"${term}"`}
                    </div>
                )}
                <div className="mt-4 flex h-full w-full flex-col justify-between gap-5">
                    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
                        {tagList.map((tag) => {
                            return (
                                <Link key={tag.id} href={`questions/tagged/${tag.slug}`}>
                                    <Card className="h-52 justify-between">
                                        <CardBody>
                                            <div
                                                className="mb-3 w-fit"
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                }}
                                            >
                                                <Pill tag={tag} />
                                            </div>
                                            <Typography className="line-clamp-3">
                                                {tag.description}
                                            </Typography>
                                        </CardBody>
                                        <CardFooter
                                            divider
                                            className="flex items-center justify-between py-3"
                                        >
                                            <Typography variant="small">
                                                {tag.count_tagged_questions}{' '}
                                                {tag.count_tagged_questions === 1
                                                    ? 'question'
                                                    : 'questions'}
                                            </Typography>
                                            <Typography variant="small">
                                                {tag.count_watching_users}{' '}
                                                {tag.count_watching_users === 1
                                                    ? 'watcher'
                                                    : 'watchers'}
                                            </Typography>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                    {pageInfo.lastPage > 1 && (
                        <Paginate {...pageInfo} perPage={6} onPageChange={onPageChange} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TagsListPage
