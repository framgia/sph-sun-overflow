import Icons from '@/components/atoms/Icons'
import ACCEPT_ANSWER from '@/helpers/graphql/mutations/accept_answer'
import { successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import { Fragment, useState } from 'react'

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
                successNotify(`${message as string}`)
            })
            .catch(() => {})

        refetchHandler()
    }

    return (
        <Fragment>
            {is_from_user ? (
                !is_answered ? (
                    <div
                        className={`flex cursor-pointer items-center justify-center`}
                        onClick={handleClick}
                    >
                        <Icons
                            size="20"
                            name="check_circle_fill"
                            additionalClass={`hover:fill-primary-base fill-neutral-disabled`}
                        />
                    </div>
                ) : (
                    <Fragment>
                        {is_correct ? (
                            <div
                                className="flex cursor-pointer items-center justify-center"
                                onMouseOver={() => {
                                    setIsHovered(true)
                                }}
                                onMouseOut={() => {
                                    setIsHovered(false)
                                }}
                                onClick={handleClick}
                            >
                                <Icons
                                    name={isHovered ? 'x_circle_fill' : 'check_circle_fill'}
                                    size="20"
                                    additionalClass={`hover:fill-primary-base fill-primary-success`}
                                />
                            </div>
                        ) : (
                            ''
                        )}
                    </Fragment>
                )
            ) : (
                <div className="flex cursor-default items-center justify-center">
                    {is_correct ? (
                        <Icons
                            size="20"
                            name="check_circle_fill"
                            additionalClass="cursor-default fill-primary-success"
                        />
                    ) : (
                        ''
                    )}
                </div>
            )}
        </Fragment>
    )
}

export default AcceptAnswer
