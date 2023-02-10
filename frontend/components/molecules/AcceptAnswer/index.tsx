import React, { Fragment } from 'react'
import Icons from '@/components/atoms/Icons'
import { useMutation } from '@apollo/client'
import ACCEPT_ANSWER from '@/helpers/graphql/mutations/accept_answer'
import { successNotify } from '@/helpers/toast'

type AcceptAnswerProps = {
    is_correct: boolean
    answer_id: number
    question_id: number
    is_from_user: boolean
    is_answered: boolean
    refetch: () => void
}

const AcceptAnswer = ({
    is_correct,
    answer_id,
    question_id,
    is_from_user,
    is_answered,
    refetch,
}: AcceptAnswerProps): JSX.Element => {
    const [acceptAnswer] = useMutation(ACCEPT_ANSWER)

    const handleClick = () => {
        const newAcceptAnswer = acceptAnswer({
            variables: {
                answer_id,
                question_id,
            },
        })

        newAcceptAnswer.then((data: any) => {
            const message = data.data.acceptAnswer
            successNotify(`${message}`)
        })

        refetch()
    }

    return (
        <Fragment>
            {is_from_user ? (
                is_answered === false ? (
                    <div className="flex cursor-pointer justify-center" onClick={handleClick}>
                        {is_correct ? <Icons name="check_fill" /> : <Icons name="check_outline" />}
                    </div>
                ) : (
                    <div className="flex cursor-auto justify-center">
                        {is_correct ? <Icons name="check_fill" /> : ''}
                    </div>
                )
            ) : (
                <div className="flex cursor-auto justify-center">
                    {is_correct ? <Icons name="check_fill" /> : ''}
                </div>
            )}
        </Fragment>
    )
}

export default AcceptAnswer
