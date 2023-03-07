import { useState, useEffect } from 'react'
import SortDropdown from '../SortDropdown'
import { ApolloQueryResult } from '@apollo/client'
import { RefetchType } from '../../../pages/questions/index'
import { useRouter } from 'next/router'

type TriggerType = 'DATE' | 'ANSWER' | 'WATCHED' | 'POPULAR'

type FilterType = {
    state: string
    filters: {
        id: number
        name: string
        onClick: () => void
    }[]
}

type FilterTextsType = {
    DATE: { 1: string; 2: string }
    ANSWER: { 1: string; 2: string; 3: string }
    WATCHED: { 1: string; 2: string }
    POPULAR: { 1: string; 2: string }
}

type FilterListsType = {
    DATE: FilterType
    ANSWER: FilterType
    WATCHED: FilterType
    POPULAR: FilterType
}

type Props = {
    triggers: TriggerType[]
    searchKey?: string
    tag?: string
    team?: string
    refetch: ({ first, page, orderBy, filter }: RefetchType) => Promise<ApolloQueryResult<any>>
}

const FilterTexts: FilterTextsType = {
    DATE: { 1: 'Newest first', 2: 'Oldest first' },
    ANSWER: { 1: 'Answered', 2: 'Unanswered', 3: 'All Answers' },
    WATCHED: { 1: 'Most Watched', 2: 'Least Watched' },
    POPULAR: { 1: 'Most Popular', 2: 'Least Popular' },
}

const DropdownFilters = ({
    triggers,
    searchKey = '',
    tag = '',
    team = '',
    refetch,
}: Props): JSX.Element => {
    const router = useRouter()
    const [selectedDateFilter, setSelectedDateFilter] = useState(FilterTexts.DATE[1])
    const [selectedAnswerFilter, setSelectedAnswerFilter] = useState(FilterTexts.ANSWER[1])
    const [selectedWatchedFilter, setSelectedWatchedFilter] = useState(FilterTexts.WATCHED[1])
    const [selectedPopularFilter, setSelectedPopularFilter] = useState(FilterTexts.POPULAR[1])

    useEffect(() => {
        setSelectedDateFilter(FilterTexts.DATE[1])
        setSelectedAnswerFilter(FilterTexts.ANSWER[1])
        setSelectedWatchedFilter(FilterTexts.WATCHED[1])
        setSelectedPopularFilter(FilterTexts.POPULAR[1])
    }, [router])

    const FilterLists: FilterListsType = {
        DATE: {
            state: selectedDateFilter,
            filters: [
                {
                    id: 1,
                    name: FilterTexts.DATE[1],
                    onClick: () => {
                        refetch({
                            first: 10,
                            page: 1,
                            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
                        })
                        setSelectedDateFilter(FilterTexts.DATE[1])
                    },
                },
                {
                    id: 2,
                    name: FilterTexts.DATE[2],
                    onClick: () => {
                        refetch({
                            first: 10,
                            page: 1,
                            orderBy: [{ column: 'CREATED_AT', order: 'ASC' }],
                        })
                        setSelectedDateFilter(FilterTexts.DATE[2])
                    },
                },
            ],
        },
        ANSWER: {
            state: selectedAnswerFilter,
            filters: [
                {
                    id: 1,
                    name: FilterTexts.ANSWER[1],
                    onClick: () => {
                        refetch({
                            first: 10,
                            page: 1,
                            filter: { keyword: searchKey, answered: true, tag, team },
                        })
                        setSelectedAnswerFilter(FilterTexts.ANSWER[1])
                    },
                },
                {
                    id: 2,
                    name: FilterTexts.ANSWER[2],
                    onClick: () => {
                        refetch({
                            first: 10,
                            page: 1,
                            filter: { keyword: searchKey, answered: false, tag, team },
                        })
                        setSelectedAnswerFilter(FilterTexts.ANSWER[2])
                    },
                },
                {
                    id: 3,
                    name: FilterTexts.ANSWER[3],
                    onClick: () => {
                        refetch({
                            first: 10,
                            page: 1,
                            filter: { keyword: searchKey, tag, team },
                        })
                        setSelectedAnswerFilter(FilterTexts.ANSWER[3])
                    },
                },
            ],
        },
        WATCHED: {
            state: selectedWatchedFilter,
            filters: [
                {
                    id: 1,
                    name: FilterTexts.WATCHED[1],
                    onClick: () => {
                        console.log(FilterTexts.WATCHED[1]) //Replace console log with refetch for watched
                        setSelectedWatchedFilter(FilterTexts.WATCHED[1])
                    },
                },
                {
                    id: 2,
                    name: FilterTexts.WATCHED[2],
                    onClick: () => {
                        console.log(FilterTexts.WATCHED[2]) //Replace console log with refetch for watched
                        setSelectedWatchedFilter(FilterTexts.WATCHED[2])
                    },
                },
            ],
        },
        POPULAR: {
            state: selectedPopularFilter,
            filters: [
                {
                    id: 1,
                    name: FilterTexts.POPULAR[1],
                    onClick: () => {
                        console.log(FilterTexts.POPULAR[1]) //Replace console log with refetch for poplarity
                        setSelectedPopularFilter(FilterTexts.POPULAR[1])
                    },
                },
                {
                    id: 2,
                    name: FilterTexts.POPULAR[2],
                    onClick: () => {
                        console.log(FilterTexts.POPULAR[2]) //Replace console log with refetch for poplarity
                        setSelectedPopularFilter(FilterTexts.POPULAR[2])
                    },
                },
            ],
        },
    }

    return (
        <div className="flex flex-row gap-2">
            {triggers.map((trigger, index) => {
                return (
                    <div key={index} className="min-w-[8rem]">
                        <SortDropdown
                            filters={FilterLists[trigger].filters}
                            selectedFilter={FilterLists[trigger].state}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default DropdownFilters
