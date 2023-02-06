import Icons from '@/components/atoms/Icons'

type AcceptAnswerProps = {
    is_correct: boolean
}

const AcceptAnswer = ({ is_correct }: AcceptAnswerProps): JSX.Element => {
    return (
        <div className={is_correct ? `flex justify-center` : `hidden`}>
            <Icons name="accepted" />
        </div>
    )
}

export default AcceptAnswer
