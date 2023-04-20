import { Fragment, useState } from 'react'
import {
    HiOutlineChevronDoubleLeft,
    HiOutlineChevronDoubleRight,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
    HiOutlineDotsHorizontal,
} from 'react-icons/hi'

type Props = {
    currentPage: number
    lastPage: number
    hasMorePages: boolean
    perPage?: number
    onPageChange: (first: number, page: number) => void
}

type PageItemType = {
    isDisabled?: boolean
    isShown?: boolean
    type: string
    icon?: JSX.Element
    eventCallback?: () => void
}

const Paginate = ({
    currentPage,
    lastPage,
    hasMorePages,
    perPage = 10,
    onPageChange,
}: Props): JSX.Element => {
    const numberToGenerate = lastPage <= 5 ? lastPage : 5

    const [pageNumbers, setPageNumbers] = useState<number[]>(
        Array.from(Array(numberToGenerate), (_, x) => x + 1)
    )

    const generatePageNumbers = (page: number): void => {
        const pageNumbersCopy = JSON.parse(JSON.stringify(pageNumbers))

        if (lastPage > 5) {
            if (!pageNumbersCopy.includes(page)) {
                if (page < currentPage) {
                    pageNumbersCopy.pop()
                    pageNumbersCopy.unshift(page)

                    setPageNumbers(pageNumbersCopy)
                } else if (page > currentPage) {
                    pageNumbersCopy.shift()
                    pageNumbersCopy.push(page)

                    setPageNumbers(pageNumbersCopy)
                }
            }
        }
    }

    const onClickStart = (): void => {
        if (currentPage - 1 < 1) return

        onPageChange(perPage, 1)
        if (lastPage > 5) {
            setPageNumbers(Array.from(Array(5), (_, x) => x + 1))
        }
    }

    const onClickPrevious = (): void => {
        if (currentPage - 1 < 1) return

        onPageChange(perPage, currentPage - 1)
        generatePageNumbers(currentPage - 1)
    }

    const onClickNext = (): void => {
        if (currentPage + 1 > lastPage) return

        onPageChange(perPage, currentPage + 1)
        generatePageNumbers(currentPage + 1)
    }

    const onClickEnd = (): void => {
        if (currentPage + 1 > lastPage) return

        onPageChange(perPage, lastPage)

        if (lastPage > 5) {
            setPageNumbers(
                Array.from({ length: lastPage - (lastPage - 5) + 1 }, (_, i) => i + (lastPage - 5))
            )
        }
    }

    const setPage = (page: number): void => {
        if (page === currentPage) return

        onPageChange(perPage, page)
    }

    const paginationItems: PageItemType[] = [
        {
            type: 'icon',
            icon: <HiOutlineChevronDoubleLeft className="h-full w-full" />,
            eventCallback: onClickStart,
            isDisabled: currentPage === 1,
        },
        {
            type: 'icon',
            icon: <HiOutlineChevronLeft className="h-full w-full" />,
            eventCallback: onClickPrevious,
            isDisabled: currentPage === 1,
        },
        {
            type: 'ellipsis',
            icon: <HiOutlineDotsHorizontal className="text-sm" />,
            isShown: pageNumbers[0] > 1,
        },
        {
            type: 'number',
        },
        {
            type: 'ellipsis',
            icon: <HiOutlineDotsHorizontal className="text-sm" />,
            isShown: pageNumbers[pageNumbers.length - 1] < lastPage,
        },
        {
            type: 'icon',
            icon: <HiOutlineChevronRight className="h-full w-full" />,
            eventCallback: onClickNext,
            isDisabled: currentPage === lastPage,
        },
        {
            type: 'icon',
            icon: <HiOutlineChevronDoubleRight className="h-full w-full" />,
            eventCallback: onClickEnd,
            isDisabled: currentPage === lastPage,
        },
    ]

    const renderIconItem = (item: PageItemType): JSX.Element => {
        return (
            <li className="flex items-center">
                <div
                    onClick={item.eventCallback}
                    className={` ml-1 flex h-4 w-4 ${
                        item.isDisabled
                            ? 'cursor-not-allowed text-gray-500'
                            : 'cursor-pointer hover:text-primary-red'
                    } items-center justify-center rounded-md border border-transparent leading-tight  `}
                >
                    {item.icon}
                </div>
            </li>
        )
    }

    const renderNumberItems = (item: PageItemType): JSX.Element[] => {
        return pageNumbers.map((item) => (
            <li key={item}>
                <div
                    className={` ml-[8px] flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-md border border-transparent text-center text-xs leading-tight  hover:border-primary-red  ${
                        item === currentPage
                            ? 'bg-primary-red text-white'
                            : 'text-neutral-500 hover:text-primary-red'
                    } `}
                    onClick={() => {
                        setPage(item)
                    }}
                >
                    {item}
                </div>
            </li>
        ))
    }

    const renderEllipsisItem = (item: PageItemType): JSX.Element => {
        return (
            <li>
                <div
                    className={`${
                        !item.isShown
                            ? 'hidden'
                            : 'ml-[8px] flex h-[24px] w-[24px] items-center justify-center rounded-md border border-transparent leading-tight'
                    } `}
                >
                    {item.icon}
                </div>
            </li>
        )
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="flex justify-center text-lg font-semibold">
                {paginationItems.map((item, index) => (
                    <Fragment key={index}>
                        {item.type === 'icon'
                            ? renderIconItem(item)
                            : item.type === 'number'
                            ? renderNumberItems(item)
                            : renderEllipsisItem(item)}
                    </Fragment>
                ))}
            </ul>
        </nav>
    )
}

export default Paginate
