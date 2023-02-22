import PageHeader from '@/components/atoms/PageHeader'
import Pill from '@/components/molecules/Pill'
import SearchInput from '@/components/molecules/SearchInput'
import Paginate from '@/components/organisms/Paginate'
import Card from '@/components/templates/Card'
import { useQuery } from '@apollo/client'
import { errorNotify } from '../../helpers/toast'
import { loadingScreenShow } from '../../helpers/loaderSpinnerHelper'
import { PaginatorInfo } from '../questions'
import { TagType } from '../questions/[slug]'
import GET_TAGS from '@/helpers/graphql/queries/get_tags'
import { RefetchType, FilterType } from '../questions/index'
import SortDropdown from '../../components/molecules/SortDropdown/index'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const TagsListPage = () => {
    const router = useRouter()
    const [selectedFilter, setSelectedFilter] = useState('Most Popular')
    const [searchKey, setSearchKey] = useState('')
    const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_TAGS, {
        variables: {
            first: 6,
            page: 1,
            sort: [{ column: 'POPULARITY', order: 'DESC' }],
        },
    })

    useEffect(() => {
        console.log('asd')
        refetch({
            first: 6,
            page: 1,
            name: '%%',
            sort: [{ column: 'POPULARITY', order: 'DESC' }],
        })
        setSearchKey('')
        setSelectedFilter('Most Popular')
    }, [router, refetch])

    if (loading) return loadingScreenShow()
    if (error) return errorNotify(`Error! ${error}`)

    const { data: tags, paginatorInfo } = data.tags
    const tagList: TagType[] = tags
    const pageInfo: PaginatorInfo = paginatorInfo

    const onPageChange = (first: number, page: number) => {
        refetch({ first, page })
    }

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const target = e.target as typeof e.target & {
            search: { value: string }
        }

        await refetch({ first: 6, page: 1, name: `%${target.search.value}%` })
        setSearchKey(target.search.value)
    }

    const refetchHandler = (column: string, order: string) => {
        refetch({ first: 6, page: 1, name: `%${searchKey}%`, sort: [{ column, order }] })
    }

    const tagFilters: FilterType[][] = [
        [
            {
                id: 1,
                name: 'Most Popular',
                onClick: () => {
                    refetchHandler('POPULARITY', 'DESC')
                    setSelectedFilter('Most Popular')
                },
            },
            {
                id: 2,
                name: 'Least Popular',
                onClick: () => {
                    refetchHandler('POPULARITY', 'ASC')
                    setSelectedFilter('Least Popular')
                },
            },
        ],
        [
            {
                id: 1,
                name: 'Most Watched',
                onClick: () => {
                    refetchHandler('WATCH_COUNT', 'DESC')
                    setSelectedFilter('Most Watched')
                },
            },
            {
                id: 2,
                name: 'Least Watched',
                onClick: () => {
                    refetchHandler('WATCH_COUNT', 'ASC')
                    setSelectedFilter('Least Watched')
                },
            },
        ],
        [
            {
                id: 1,
                name: 'Newest First',
                onClick: () => {
                    refetchHandler('CREATED_AT', 'ASC')
                    setSelectedFilter('Newest First')
                },
            },
            {
                id: 2,
                name: 'Oldest First',
                onClick: () => {
                    refetchHandler('CREATED_AT', 'DESC')
                    setSelectedFilter('Oldest First')
                },
            },
        ],
    ]

    return (
        <div className="flex h-full w-full flex-col gap-3 divide-y-2 divide-primary-gray px-10 pt-8 pb-5">
            <PageHeader>Tags</PageHeader>
            <div className="flex w-full flex-col gap-2 px-5 pt-3">
                <div className="flex w-full flex-row items-center justify-between">
                    <div className="mt-2 flex flex-row items-center justify-between px-2">
                        <form onSubmit={handleSearchSubmit}>
                            <SearchInput placeholder="Search tag" />
                        </form>
                    </div>
                    <SortDropdown filters={tagFilters} selectedFilter={selectedFilter} grouped />
                </div>
                {searchKey && (
                    <div className="px-3">
                        {pageInfo.total} {pageInfo.total === 1 ? 'result' : 'results'} for{' '}
                        {`"${searchKey}"`}
                    </div>
                )}
                <div className="mt-4 flex w-full flex-col justify-between gap-5">
                    <div className="grid w-full grid-cols-2 gap-5 px-3">
                        {tagList.map((tag) => (
                            <Link key={tag.id} href={`questions/tagged/${tag.slug}`}>
                                <Card
                                    header={
                                        <div className="pt-1">
                                            <Pill name={tag.slug} is_tag={tag.is_watched_by_user} />
                                        </div>
                                    }
                                    footer={`${tag.count_tagged_questions} ${
                                        tag.count_tagged_questions > 1 ? 'questions' : 'question'
                                    }`}
                                >
                                    {tag.description}
                                </Card>
                            </Link>
                        ))}
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
