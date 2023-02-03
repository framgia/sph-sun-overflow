import React, { useState } from 'react'
import RichTextEditor from '../../molecules/RichTextEditor'
import Button from '../../atoms/Button'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { errorNotify, formProcessToast } from '@/helpers/toast'
import { useBoundStore } from '@/helpers/store'
import CREATE_ANSWER from '../../../helpers/graphql/mutations/create_answer'

export type FormValues = {
    content: string
    user_id: number
    question_id: number
}

const AnswerComponent = () => {
    const user_id = useBoundStore.getState().user_id
    const question_id = 1

    const [isDisableSubmit, setIsDisableSubmit] = useState(false)

    const [createAnswer] = useMutation(CREATE_ANSWER)

    const { setValue, handleSubmit } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

<<<<<<< HEAD
    const onSubmit = (data: FormValues) => {
        setIsDisableSubmit(true)
=======
    useEffect(() => {}, [isDisableSubmit])

    const onSubmit = (data: FormValues) => {
        setIsDisable()

>>>>>>> [Overflow-14] Implement API to sidebars
        if (data.content !== undefined) {
            if (data.content.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
                errorNotify('No answer Input')
                setTimeout(() => {
<<<<<<< HEAD
                    setIsDisableSubmit(false)
=======
                    setIsDisable()
>>>>>>> [Overflow-14] Implement API to sidebars
                }, 2000)
            } else {
                const newAnswer = createAnswer({
                    variables: {
                        content: data.content,
                        user_id,
                        question_id,
                    },
                })

                const resolveNewAnswer = new Promise((resolve) => resolve(newAnswer))
                formProcessToast(
                    resolveNewAnswer,
                    'Adding Answer...',
                    'Answer Successfully Added!',
                    'There was an Error!'
                )

                setTimeout(() => {
<<<<<<< HEAD
                    setIsDisableSubmit(false)
=======
                    setIsDisable()
>>>>>>> [Overflow-14] Implement API to sidebars
                }, 3000)
            }
        } else {
            errorNotify('No answer Input')
            setTimeout(() => {
<<<<<<< HEAD
                setIsDisableSubmit(false)
=======
                setIsDisable()
>>>>>>> [Overflow-14] Implement API to sidebars
            }, 2000)
        }
    }

    return (
        <div className="w-full p-2">
            <div className="flex flex-col space-y-2">
                <text className="text-lg">Your Answer</text>
                <form className="flex flex-col">
                    <RichTextEditor setValue={setValue} usage="content" id={undefined} />
                    <div className="mt-4 flex flex-row-reverse">
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            additionalClass=""
                            usage="primary"
                            type="submit"
                            isDisabled={isDisableSubmit}
                        >
                            Submit Answer
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AnswerComponent
