import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'

type Props = {
    onClickDate: React.MouseEventHandler
    onClickAnswered: React.MouseEventHandler
}

const Filters = ({ onClickDate, onClickAnswered }: Props): JSX.Element => {
    return (
        <div className="flex h-10 flex-row">
            <Button usage="date_filter" onClick={onClickDate} isDisabled={false}>
                <div className="flex flex-row items-center gap-2">
                    <span>Date</span>
                    <Icons name="filter_date_down" />
                </div>
            </Button>
            <Button usage="answered_filter" onClick={onClickAnswered} isDisabled={false}>
                Answered
            </Button>
        </div>
    )
}

export default Filters
