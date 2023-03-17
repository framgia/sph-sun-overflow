import React, { Fragment, useState } from 'react'
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
    refetchHandler: () => void
}

const AcceptAnswer = ({
    is_correct,
    answer_id,
    question_id,
    is_from_user,
    is_answered,
    refetchHandler,
}: AcceptAnswerProps): JSX.Element => {
    const [acceptAnswer] = useMutation(ACCEPT_ANSWER)

    const [isCorrectAnswer, setIsCorrectAnswer] = useState(is_correct)
    const [isHovered, setIsHovered] = useState(false)
    const handleClick = (): void => {
        const newAcceptAnswer = acceptAnswer({
            variables: {
                answer_id,
                question_id,
            },
        })

        newAcceptAnswer
            .then((data: any) => {
                const message = data.data.toggleAcceptAnswer
                setIsCorrectAnswer(!isCorrectAnswer)
                successNotify(`${message as string}`)
            })
            .catch(() => {})

        refetchHandler()
    }

    return (
        <Fragment>
            {is_from_user ? (
                !is_answered ? (
                    <div className={`flex cursor-pointer justify-center`} onClick={handleClick}>
                        <Icons name={isCorrectAnswer ? 'check_fill' : 'check_outline'} />
                    </div>
                ) : (
                    <div
                        className="flex cursor-pointer justify-center"
                        onClick={isCorrectAnswer ? handleClick : undefined}
                        onMouseOver={() => {
                            setIsHovered(true)
                        }}
                        onMouseOut={() => {
                            setIsHovered(false)
                        }}
                    >
                        <Icons
                            name={isCorrectAnswer ? (isHovered ? 'cross_fill' : 'check_fill') : ''}
                        />
                    </div>
                )
            ) : (
                <div className="flex cursor-auto justify-center ">
                    {isCorrectAnswer ? <Icons name="check_fill" /> : ''}
                </div>
            )}
        </Fragment>
    )
}

export default AcceptAnswer
