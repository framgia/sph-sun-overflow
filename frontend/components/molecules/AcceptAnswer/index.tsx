import React, { Fragment } from 'react'
import Icons from '@/components/atoms/Icons'
import { useMutation, useQuery } from '@apollo/client'
import ACCEPT_ANSWER from '@/helpers/graphql/mutations/accept_answer'
import { successNotify } from '@/helpers/toast'
import GET_QUESTION from '@/helpers/graphql/queries/get_question'
import { useRouter } from 'next/router'

type AcceptAnswerProps = {
    is_correct: boolean
    answer_id: number
    question_id: number
    is_from_user: boolean
}

const AcceptAnswer = ({
    is_correct,
    answer_id,
    question_id,
    is_from_user
}: AcceptAnswerProps): JSX.Element => {
    const [acceptAnswer] = useMutation(ACCEPT_ANSWER)
    const router = useRouter()

    const query = router.query
    const { data, loading, error } = useQuery(GET_QUESTION, {
        variables: {
            slug: String(query.slug),
        },
    })
    console.log(is_correct)
    const handleClick = () => {
        console.log(is_correct)
        const newAcceptAnswer = acceptAnswer({
            variables: {
                answer_id,
                question_id,
            }, refetchQueries: [{ query: GET_QUESTION }]
        })

        newAcceptAnswer.then((data: any) => {
            const message = data.data.acceptAnswer
            successNotify(`${message}`)
        })
    }

    return (
        <Fragment>
            {is_from_user ? (
                <div className="flex cursor-pointer justify-center" onClick={handleClick}>
                    {is_correct ? <Icons name="check_fill" /> : <Icons name="check_outline" />}
                </div>
            ) : (
                is_correct ?? <Icons name="check_fill" />
            )}
        </Fragment>
    )
}

export default AcceptAnswer
