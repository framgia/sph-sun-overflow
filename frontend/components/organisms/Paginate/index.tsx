import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import React from 'react'

type Props = {
    currentPage: number
    lastPage: number
    hasMorePages: boolean
    onPageChange: (first: number, page: number) => void
}

const Paginate = ({ currentPage, lastPage, hasMorePages, onPageChange }: Props): JSX.Element => {
    const getDisabledStyle = (shouldApply: boolean) => {
        return {
            isDisabled: shouldApply,
            additionalClass: shouldApply
                ? 'bg-light-red'
                : 'hover:text-white hover:bg-primary-red active:outline active:outline-primary-red active:bg-primary-red active:text-white',
        }
    }

    const onClickStart = (event: React.MouseEvent) => {
        event.preventDefault()
        onPageChange(10, 1)
    }

    const onClickPrevious = (event: React.MouseEvent) => {
        event.preventDefault()
        onPageChange(10, currentPage - 1)
    }

    const onClickNext = (event: React.MouseEvent) => {
        event.preventDefault()
        onPageChange(10, currentPage + 1)
    }

    const onClickEnd = (event: React.MouseEvent) => {
        event.preventDefault()
        onPageChange(10, lastPage)
    }

    return (
        <div className="flex flex-row justify-center gap-1 py-5">
            <Button
                usage="paginate"
                {...getDisabledStyle(currentPage === 1)}
                onClick={onClickStart}
            >
                <Icons name="chevron_left_double" />
            </Button>
            <Button
                usage="paginate"
                {...getDisabledStyle(currentPage === 1)}
                onClick={onClickPrevious}
            >
                <Icons name="chevron_left" />
            </Button>
            <span className="flex h-7 min-w-[50px] flex-row items-center justify-center rounded-full border border-primary-red px-3 font-semibold text-primary-red">
                {currentPage}
            </span>
            <Button usage="paginate" {...getDisabledStyle(!hasMorePages)} onClick={onClickNext}>
                <Icons name="chevron_right" />
            </Button>
            <Button usage="paginate" {...getDisabledStyle(!hasMorePages)} onClick={onClickEnd}>
                <Icons name="chevron_right_double" />
            </Button>
        </div>
    )
}

export default Paginate
