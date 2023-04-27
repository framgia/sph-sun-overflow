import { CustomIcons } from '@/components/atoms/Icons'
import { useRouter } from 'next/router'
import SortDropdown from '../SortDropdown'

type TriggerType = 'DATE' | 'ANSWER'
const { DotsIcon } = CustomIcons

type FilterType = {
    state: string
    filters: Array<{
        id: number
        name: string
        onClick: () => void
    }>
}

type FilterTextsType = {
    DATE: { 1: string; 2: string; 3: string; 4: string }
    ANSWER: { 1: string; 2: string; 3: string }
}

type FilterListsType = {
    DATE: FilterType
    ANSWER: FilterType
}

type Props = {
    triggers: TriggerType[]
}

const filterTexts: FilterTextsType = {
    DATE: { 1: 'Newest first', 2: 'Oldest first', 3: 'Most recent', 4: 'Least recent' },
    ANSWER: { 1: 'All Questions', 2: 'Answered', 3: 'Unanswered' },
}

const DropdownFilters = ({ triggers }: Props): JSX.Element => {
    const router = useRouter()

    const routerHandler = (order: string, filter: string): void => {
        void router.push({
            pathname: router.pathname,
            query: { ...router.query, order, filter },
        })
    }

    const order = String(router.query.order ?? filterTexts.DATE[1])
    const filter = String(router.query.filter ?? filterTexts.ANSWER[1])
    const filterLists: FilterListsType = {
        DATE: {
            state: order,
            filters: [
                {
                    id: 1,
                    name: filterTexts.DATE[1],
                    onClick: () => {
                        routerHandler(filterTexts.DATE[1], filter)
                    },
                },
                {
                    id: 2,
                    name: filterTexts.DATE[2],
                    onClick: () => {
                        routerHandler(filterTexts.DATE[2], filter)
                    },
                },
                {
                    id: 3,
                    name: filterTexts.DATE[3],
                    onClick: () => {
                        routerHandler(filterTexts.DATE[3], filter)
                    },
                },
                {
                    id: 4,
                    name: filterTexts.DATE[4],
                    onClick: () => {
                        routerHandler(filterTexts.DATE[4], filter)
                    },
                },
            ],
        },
        ANSWER: {
            state: filter,
            filters: [
                {
                    id: 1,
                    name: filterTexts.ANSWER[1],
                    onClick: () => {
                        routerHandler(order, filterTexts.ANSWER[1])
                    },
                },
                {
                    id: 2,
                    name: filterTexts.ANSWER[2],
                    onClick: () => {
                        routerHandler(order, filterTexts.ANSWER[2])
                    },
                },
                {
                    id: 3,
                    name: filterTexts.ANSWER[3],
                    onClick: () => {
                        routerHandler(order, filterTexts.ANSWER[3])
                    },
                },
            ],
        },
    }

    return (
        <div className="flex flex-row gap-1">
            {triggers.map((trigger, index) => {
                return (
                    <div key={index}>
                        <SortDropdown
                            icon={
                                trigger === 'ANSWER' ? (
                                    <div className="m-auto">
                                        <DotsIcon />
                                    </div>
                                ) : null
                            }
                            filters={filterLists[trigger].filters}
                            selectedFilter={filterLists[trigger].state}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default DropdownFilters
