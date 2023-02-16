import PageHeader from '@/components/atoms/PageHeader'
import DropdownFilters from '@/components/molecules/DropdownFilters'
import Filters from '@/components/molecules/Filters'
import Pill from '@/components/molecules/Pill'
import SearchInput from '@/components/molecules/SearchInput'
import Paginate from '@/components/organisms/Paginate'
import Card from '@/components/templates/Card'
import { number } from 'yup'

export type TagType = {
    id: number
    name: string
    description: string
    is_watched_by_user: boolean
    questions_count: number
}[]

export interface PaginatorInfo {
    currentPage: number
    lastPage: number
    hasMorePages: boolean
}

const TagsListPage = (): JSX.Element => {
    const Tags: TagType = [
        {
            id: 1,
            name: 'Javascript',
            description: 'sdfasdf asdf asdf adsf asdf asdf safadsf',
            is_watched_by_user: false,
            questions_count: 20,
        },
        {
            id: 2,
            name: 'Javascript',
            description: 'sdfasdf asdf asdf adsf asdf asdf safadsf',
            is_watched_by_user: true,
            questions_count: 30,
        },
        {
            id: 3,
            name: 'Javascript',
            description: 'sdfasdf asdf asdf adsf asdf asdf safadsf',
            is_watched_by_user: true,
            questions_count: 28,
        },
        {
            id: 4,
            name: 'Javascript',
            description: 'sdfasdf asdf asdf adsf asdf asdf safadsf',
            is_watched_by_user: false,
            questions_count: 5,
        },
        {
            id: 5,
            name: 'Javascript',
            description: 'sdfasdf asdf asdf adsf asdf asdf safadsf',
            is_watched_by_user: false,
            questions_count: 5,
        },
        {
            id: 6,
            name: 'Javascript',
            description:
                'sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf sdfasdf asdf asdf adsf asdf asdf safadsf',
            is_watched_by_user: false,
            questions_count: 1,
        },
    ]

    const pageInfo: PaginatorInfo = {
        currentPage: 1,
        lastPage: 2,
        hasMorePages: true,
    }

    const onPageChange = () => {
        //pagination function
        console.log('page changed')
    }

    return (
        <div className="flex h-full w-full flex-col gap-6 gap-3 divide-y-2 divide-primary-gray px-10 pt-8 pb-5">
            <PageHeader>Tags</PageHeader>
            <div className="flex w-full flex-col gap-5 px-5 pt-3">
                <div className="flex w-full flex-row items-center justify-between">
                    <SearchInput placeholder="Search tag" />
                    <DropdownFilters
                        refetch={() => console.log('Refetched!')}
                        triggers={['DATE', 'WATCHED', 'POPULAR']}
                    />
                </div>
                <div className="flex w-full flex-col justify-between gap-5">
                    <div className="grid w-full grid-cols-2 gap-5 px-3">
                        {Tags.map((tag) => (
                            <Card
                                key={tag.id}
                                header={
                                    <div className="pt-1">
                                        <Pill name={tag.name} is_tag={tag.is_watched_by_user} />
                                    </div>
                                }
                                footer={`${tag.questions_count} ${
                                    tag.questions_count > 1 ? 'questions' : 'question'
                                }`}
                            >
                                {tag.description}
                            </Card>
                        ))}
                    </div>
                    {pageInfo.lastPage > 1 && (
                        <Paginate {...pageInfo} onPageChange={onPageChange} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TagsListPage
