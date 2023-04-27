import errorMessages from '@/helpers/errorMessages'
import UPDATE_ANSWER from '@/helpers/graphql/mutations/update_answer'
import { useBoundStore } from '@/helpers/store'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CREATE_ANSWER from '../../../helpers/graphql/mutations/create_answer'
import Button from '../../atoms/Button'
import RichTextEditor from '../../molecules/RichTextEditor'

export type FormValues = {
    content: string
    user_id: number
}

type AnswerFormProps = {
    question_id?: number
    refetchHandler: () => void
    id?: number
    content?: string
    onEdit?: React.Dispatch<React.SetStateAction<boolean>>
    slug?: string
}

const AnswerForm = ({
    question_id,
    slug,
    id,
    content,
    onEdit,
    refetchHandler,
}: AnswerFormProps): JSX.Element => {
    const user_id = useBoundStore.getState().user_id
    const [addAnswerError, setAddAnswerError] = useState('')

    const [isDisableSubmit, setIsDisableSubmit] = useState(false)

    const [createAnswer] = useMutation(CREATE_ANSWER)
    const [updateAnswer] = useMutation(UPDATE_ANSWER)

    const { handleSubmit, control, reset } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    const getErrorElement = (id?: number | number | null): HTMLDivElement => {
        if (id) {
            return document.querySelector(`#answer-form-${id} .ql-container`) as HTMLDivElement
        }

        return document.querySelector('#answer-form .ql-container') as HTMLDivElement
    }

    const onSubmit = (data: FormValues): void => {
        setIsDisableSubmit(true)

        if (data.content !== undefined) {
            const pattern = /<img[^>]+>/
            const check_image = pattern.test(data.content)
            if (data.content.replace(/<(.|\n)*?>/g, '').trim().length === 0 && !check_image) {
                getErrorElement().classList.add('error-form-element')
                setAddAnswerError(errorMessages('answer-empty'))
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
                        reset({ content: '' })
                        successNotify('Answer Successfully Added!')
                    })
                    .catch(() => {
                        errorNotify(errorMessages())
                    })

                setAddAnswerError('')
                getErrorElement().classList.remove('error-form-element')

                refetchHandler()

                setTimeout(() => {
                    setIsDisableSubmit(false)
                }, 3000)
            }
        } else {
            setAddAnswerError(errorMessages('answer-empty'))
            getErrorElement().classList.add('error-form-element')
            setTimeout(() => {
                setIsDisableSubmit(false)
            }, 2000)
        }
    }

    const onEditSubmit = (data: FormValues): void => {
        setIsDisableSubmit(true)
        if (String(data.content) === String(content)) {
            errorNotify(errorMessages('no-change'))
            onEdit?.(false)
            setIsDisableSubmit(false)
            return
        }

        const pattern = /<img[^>]+>/
        const check_image = pattern.test(data.content)
        if (data.content.replace(/<(.|\n)*?>/g, '').trim().length === 0 && !check_image) {
            getErrorElement(id).classList.add('error-form-element')
            setAddAnswerError(errorMessages('answer-empty'))
            setTimeout(() => {
                setIsDisableSubmit(false)
            }, 2000)
        } else {
            updateAnswer({
                variables: {
                    id,
                    content:
                        data.content.replace(/<(.|\n)*?>/g, '').trim().length === 0
                            ? content
                            : data.content,
                },
            })
                .then(() => {
                    reset({ content: '' })
                    const check = data.content.replace(/<(.|\n)*?>/g, '').trim().length === 0
                    if (check) errorNotify(errorMessages('answer-not-update'))
                    else successNotify('Answer Successfully Updated!')
                })
                .catch(() => {
                    errorNotify(errorMessages())
                })

            setAddAnswerError('')
            getErrorElement(id).classList.remove('error-form-element')

            refetchHandler()

            onEdit?.(false)

            setTimeout(() => {
                setIsDisableSubmit(false)
            }, 3000)
        }
    }

    return (
        <div className={`w-full ${!onEdit ? 'p-4' : ''}`} id={`answer-form${id ? `-${id}` : ''}`}>
            <div className="flex flex-col gap-2">
                {!onEdit && (
                    <span className="flex w-fit items-center text-xs font-medium text-primary-blue">
                        Add Answer
                    </span>
                )}
                <form className="flex w-full flex-col gap-2">
                    <div className="flex w-full flex-col">
                        <Controller
                            control={control}
                            name="content"
                            defaultValue={id === null ? '' : content ?? ''}
                            render={({ field: { onChange, value } }) => (
                                <RichTextEditor
                                    onChange={onChange}
                                    value={value}
                                    usage="content"
                                    id={undefined}
                                    placeholder="Write an answer..."
                                />
                            )}
                        />
                        {addAnswerError.length > 0 && (
                            <div className="px-2 text-xs font-light text-primary-red">
                                {addAnswerError}
                            </div>
                        )}
                    </div>
                    <div className="flex">
                        <Button
                            onClick={!onEdit ? handleSubmit(onSubmit) : handleSubmit(onEditSubmit)}
                            additionalClass={
                                isDisableSubmit
                                    ? 'bg-primary-100 hover:bg-primary-100 hover:text-neutral-white'
                                    : 'bg-neutral-white'
                            }
                            usage="primary-regular"
                            type="submit"
                            isDisabled={isDisableSubmit}
                        >
                            {!onEdit ? 'Submit Answer' : 'Save Edits'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AnswerForm
