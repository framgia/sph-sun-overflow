import React, { useState } from 'react'
import RichTextEditor from '../../molecules/RichTextEditor'
import Button from '../../atoms/Button'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useBoundStore } from '@/helpers/store'
import CREATE_ANSWER from '../../../helpers/graphql/mutations/create_answer'

export type FormValues = {
    content: string
    user_id: number
}

type AnswerComponentProps = {
    question_id: number
    refetchHandler: () => void
}

const AnswerComponent = ({ question_id, refetchHandler }: AnswerComponentProps): JSX.Element => {
    const user_id = useBoundStore.getState().user_id
    const [addAnswerError, setAddAnswerError] = useState('')

    const [isDisableSubmit, setIsDisableSubmit] = useState(false)

    const [createAnswer] = useMutation(CREATE_ANSWER)

    const { setValue, handleSubmit } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    const onSubmit = (data: FormValues) => {
        setIsDisableSubmit(true)
        const errorElement = document.querySelector('.ql-container') as HTMLDivElement

        if (data.content !== undefined) {
            const pattern = /<img[^>]+>/
            const check_image = pattern.test(data.content)
            if (
                data.content.replace(/<(.|\n)*?>/g, '').trim().length === 0 &&
                check_image === false
            ) {
                errorElement.classList.add('error-form-element')
                setAddAnswerError('No answer Input')
                setTimeout(() => {
                    setIsDisableSubmit(false)
                }, 2000)
            } else {
                const newAnswer = createAnswer({
                    variables: {
                        content: data.content,
                        user_id,
                        question_id,
                    },
                })
                    .then(() => {
                        const qlEditor = document.querySelector(
                            '.quill .ql-editor'
                        ) as HTMLDivElement
                        qlEditor.innerHTML = ''
                        successNotify('Answer Successfully Added!')
                    })
                    .catch(() => {
                        errorNotify('There was an Error!')
                    })

                setAddAnswerError('')
                errorElement.classList.remove('error-form-element')

                refetchHandler()

                setTimeout(() => {
                    setIsDisableSubmit(false)
                }, 3000)
            }
        } else {
            setAddAnswerError('No answer Input')
            errorElement.classList.add('error-form-element')
            setTimeout(() => {
                setIsDisableSubmit(false)
            }, 2000)
        }
    }

    return (
        <div className="w-full py-3">
            <div className="flex flex-col space-y-2">
                <span className="text-lg">Your Answer</span>
                <form className="flex flex-col">
                    <RichTextEditor setValue={setValue} usage="content" id={undefined} />
                    {addAnswerError.length > 0 && (
                        <div className="px-3 text-sm text-primary-red">{addAnswerError}</div>
                    )}
                    <div className="mt-4 flex flex-row-reverse">
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            additionalClass={
                                isDisableSubmit ? 'bg-light-red hover:bg-light-red' : 'bg-white'
                            }
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
