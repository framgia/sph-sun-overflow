import Icons from '@/components/atoms/Icons'

type VotesProps = {
    count: number
}

const Votes = ({ count }: VotesProps): JSX.Element => {
    return (
        <div className="flex flex-col items-center">
            <Icons name="vote_up" />
            <span className="text-lg">{count}</span>
            <Icons name="vote_down" />
        </div>
    )
}

export default Votes
