import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import React from 'react'

type Props = {
    current: number
}

const Paginate = ({ current }: Props): JSX.Element => {
    const onClickStart = (event: React.MouseEvent) => {
        event.preventDefault()
    }

    const onClickPrevious = (event: React.MouseEvent) => {
        event.preventDefault()
    }

    const onClickNext = (event: React.MouseEvent) => {
        event.preventDefault()
    }

    const onClickEnd = (event: React.MouseEvent) => {
        event.preventDefault()
    }
    return (
        <div className="flex flex-row justify-center gap-1 py-5">
            <Button usage="paginate" isDisabled={false} onClick={onClickStart}>
                <Icons name="chevron_left_double" />
            </Button>
            <Button usage="paginate" isDisabled={false} onClick={onClickPrevious}>
                <Icons name="chevron_left" />
            </Button>
            <span className="flex h-7 min-w-[50px] flex-row items-center justify-center rounded-full border border-primary-red px-3 font-semibold text-primary-red">
                {current}
            </span>
            <Button usage="paginate" isDisabled={false} onClick={onClickNext}>
                <Icons name="chevron_right" />
            </Button>
            <Button usage="paginate" isDisabled={false} onClick={onClickEnd}>
                <Icons name="chevron_right_double" />
            </Button>
        </div>
    )
}

export default Paginate
