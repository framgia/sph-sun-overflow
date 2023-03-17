import React, { useEffect, useState } from 'react'
import RichTextEditor from '../../molecules/RichTextEditor'
import Button from '../../atoms/Button'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useBoundStore } from '@/helpers/store'
import CREATE_ANSWER from '../../../helpers/graphql/mutations/create_answer'
import type { AnswerEditType } from '@/pages/questions/[slug]'
import UPDATE_ANSWER from '@/helpers/graphql/mutations/update_answer'
import { useRouter } from 'next/router'

export type FormValues = {
    content: string
    user_id: number
}

type AnswerFormProps = {
    question_id: number
    refetchHandler: () => void
    answer: AnswerEditType
    onEdit: React.Dispatch<React.SetStateAction<AnswerEditType>>
    slug: string
}

const AnswerForm = ({
    question_id,
    refetchHandler,
    answer,
    onEdit,
    slug,
}: AnswerFormProps): JSX.Element => {
    const user_id = useBoundStore.getState().user_id
    const [addAnswerError, setAddAnswerError] = useState('')

    const [isDisableSubmit, setIsDisableSubmit] = useState(false)

    const router = useRouter()

    const [createAnswer] = useMutation(CREATE_ANSWER)
    const [updateAnswer] = useMutation(UPDATE_ANSWER)

    const { setValue, handleSubmit, control } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    useEffect(() => {
        if (answer.content) {
            setValue('content', answer.content)
        }
    }, [answer.content])

    const onSubmit = (data: FormValues): void => {
        setIsDisableSubmit(true)
        const errorElement = document.querySelector('.ql-container') as HTMLDivElement

        if (data.content !== undefined) {
            const pattern = /<img[^>]+>/
            const check_image = pattern.test(data.content)
            if (data.content.replace(/<(.|\n)*?>/g, '').trim().length === 0 && !check_image) {
                errorElement.classList.add('error-form-element')
                setAddAnswerError('No answer Input')
                setTimeout(() => {
                    setIsDisableSubmit(false)
                }, 2000)
            } else {
                createAnswer({
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

    const onEditSubmit = (data: FormValues): void => {
        setIsDisableSubmit(true)
        const errorElement = document.querySelector('.ql-container') as HTMLDivElement

        const pattern = /<img[^>]+>/
        const check_image = pattern.test(data.content)
        if (
            data.content.replace(/<(.|\n)*?>/g, '').trim().length === 0 &&
            !check_image &&
            answer.content === null
        ) {
            errorElement.classList.add('error-form-element')
            setAddAnswerError('No answer Input')
            setTimeout(() => {
                setIsDisableSubmit(false)
            }, 2000)
        } else {
            updateAnswer({
                variables: {
                    id: answer.id,
                    content:
                        data.content.replace(/<(.|\n)*?>/g, '').trim().length === 0
                            ? answer.content
                            : data.content,
                },
            })
                .then(() => {
                    const qlEditor = document.querySelector('.quill .ql-editor') as HTMLDivElement
                    qlEditor.innerHTML = ''
                    const check = data.content.replace(/<(.|\n)*?>/g, '').trim().length === 0
                    if (check) errorNotify('Answer Not Updated!')
                    else successNotify('Answer Successfully Updated!')
                })
                .catch(() => {
                    errorNotify('There was an Error!')
                })

            setAddAnswerError('')
            errorElement.classList.remove('error-form-element')

            refetchHandler()

            onEdit({ id: null, content: null })
            void router.push(`/questions/${slug}`)

            setTimeout(() => {
                setIsDisableSubmit(false)
            }, 3000)
        }
    }

    return (
        <div className="w-full py-3" id="answer-form">
            <div className="flex flex-col space-y-2">
                <div>
                    <span className="text-lg">
                        {answer.id === null ? 'Your Answer' : 'Edit Your Answer'}
                    </span>
                    <form className="flex flex-col">
                        <Controller
                            control={control}
                            name="content"
                            defaultValue={answer.id === null ? '' : answer.content ?? ''}
                            render={({ field: { onChange, value } }) => (
                                <RichTextEditor
                                    onChange={onChange}
                                    value={value}
                                    usage="content"
                                    id={undefined}
                                />
                            )}
                        />
                        {addAnswerError.length > 0 && (
                            <div className="px-3 text-sm text-primary-red">{addAnswerError}</div>
                        )}
                        <div className="mt-4 flex flex-row-reverse">
                            <Button
                                onClick={
                                    answer.id === null
                                        ? handleSubmit(onSubmit)
                                        : handleSubmit(onEditSubmit)
                                }
                                additionalClass={
                                    isDisableSubmit ? 'bg-light-red hover:bg-light-red' : 'bg-white'
                                }
                                usage="primary"
                                type="submit"
                                isDisabled={isDisableSubmit}
                            >
                                {answer.id === null ? 'Submit Answer' : 'Save Edits'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AnswerForm
