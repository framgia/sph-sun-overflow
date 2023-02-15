import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'

type Props = {
    dateAscending?: boolean
    isAnswered: boolean
    onClickDate: React.MouseEventHandler
    onClickAnswered: React.MouseEventHandler
}

const Filters = ({
    dateAscending,
    isAnswered,
    onClickDate,
    onClickAnswered,
}: Props): JSX.Element => {
    return (
        <div className="flex h-10 flex-row">
            <Button usage="date_filter" onClick={onClickDate} isDisabled={false}>
                <div className="flex flex-row items-center gap-2">
                    <span>Date</span>
                    <Icons name={dateAscending ? 'filter_date_up' : 'filter_date_down'} />
                </div>
            </Button>
            <Button
                usage="answered_filter"
                additionalClass={isAnswered ? 'bg-red-300' : 'bg-white'}
                onClick={onClickAnswered}
                isDisabled={false}
            >
                Unanswered
            </Button>
        </div>
    )
}

export default Filters
