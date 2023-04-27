import Icons from '@/components/atoms/Icons'

type VotesProps = {
    count: number
    user_vote: number
    voteHandler: (value: number) => void
}

const Votes = ({ count, user_vote, voteHandler }: VotesProps): JSX.Element => {
    return (
        <div className="flex flex-col items-center">
            <div
                onClick={() => {
                    voteHandler(1)
                }}
            >
                <Icons
                    name="vote_up"
                    additionalClass={
                        user_vote === 1 ? 'text-primary-base' : 'text-neutral-disabled'
                    }
                />
            </div>
            <span className="flex h-5 items-center font-semibold text-primary-base">{count}</span>
            <div
                onClick={() => {
                    voteHandler(-1)
                }}
            >
                <Icons
                    name="vote_down"
                    additionalClass={
                        user_vote === -1 ? 'text-primary-base' : 'text-neutral-disabled'
                    }
                />
            </div>
        </div>
    )
}

export default Votes
