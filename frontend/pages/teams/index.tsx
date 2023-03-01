import PageHeader from '@/components/atoms/PageHeader'
import SearchInput from '@/components/molecules/SearchInput'
import Paginate from '@/components/organisms/Paginate'
import Card from '@/components/templates/Card'
import Link from 'next/link'
import { useState } from 'react'
import { PaginatorInfo } from '../questions'

type TeamType = {
    id: number
    name: string
    description: string
    slug: string
    members_count: number
}

const TeamsListPage = () => {
    const [searchKey, setSearchKey] = useState('')

    const teamsList: TeamType[] = [
        {
            id: 1,
            name: 'Sun Overflow',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            slug: 'sun-overflow',
            members_count: 12,
        },
        {
            id: 2,
            name: 'HRIS',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            slug: 'hris',
            members_count: 13,
        },
        {
            id: 3,
            name: 'Zeon',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            slug: 'zeon',
            members_count: 14,
        },
        {
            id: 4,
            name: 'Metajob',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            slug: 'metajob',
            members_count: 15,
        },
    ]

    const pageInfo: PaginatorInfo = {
        perPage: 6,
        currentPage: 1,
        lastPage: 2,
        total: 4,
        hasMorePages: true,
    }

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const target = e.target as typeof e.target & {
            search: { value: string }
        }

        // TODO: set API call for search teams
        console.log(target.search.value)
    }

    const onChange = (value: string) => {
        setSearchKey(value)
    }

    const onPageChange = () => {
        // TODO: set API call for refetch on paginate
        console.log('Next page')
    }
    return (
        <div className="flex h-full w-full flex-col gap-3 divide-y-2 divide-primary-gray px-10 pt-8 pb-5">
            <PageHeader>Teams</PageHeader>
            <div className="flex h-full w-full flex-col gap-2 px-5 pt-3">
                <div className="flex w-full flex-row items-center justify-between">
                    <div className="mt-2 flex flex-row items-center justify-between px-2">
                        <form onSubmit={handleSearchSubmit}>
                            <SearchInput
                                placeholder="Search team"
                                value={searchKey}
                                onChange={onChange}
                            />
                        </form>
                    </div>
                </div>
                <div className="mt-4 flex h-full w-full flex-col justify-between gap-5">
                    <div className="grid w-full grid-cols-2 gap-y-5 gap-x-10 px-3">
                        {teamsList.map((team) => (
                            <Link key={team.id} href={`teams/${team.slug}`}>
                                <Card header={team.name} footer={`${team.members_count} members`}>
                                    {team.description}
                                </Card>
                            </Link>
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

export default TeamsListPage
