import { useForm } from 'react-hook-form'
import { isObjectEmpty } from '@/utils'
import CommentFormSchema from './schema'
import { useEffect, useState } from 'react'
import FormAlert from '../../molecules/FormAlert'
import Button from '../../atoms/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { errorNotify, successNotify } from '@/helpers/toast'
import CREATE_COMMENT from '@/helpers/graphql/mutations/create_comment'
import UPDATE_COMMENT from '@/helpers/graphql/mutations/update_comment'
import { useMutation } from '@apollo/client'

export type FormValues = {
    comment: string
}

type CommentFormProps = {
    id?: number | null
    commentableId?: number
    commentableType?: string
    refetchHandler: () => void
    children?: string
    content?: string
    setComment: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentForm = ({
    id,
    commentableId,
    commentableType,
    children = 'Submit Comment',
    content,
    refetchHandler,
    setComment,
}: CommentFormProps): JSX.Element => {
    const [isDisableSubmit, setIsDisableSubmit] = useState(false)
    const [commentError, setCommentError] = useState('')
    const [createComment] = useMutation(CREATE_COMMENT)
    const [updateComment] = useMutation(UPDATE_COMMENT)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: { comment: content },
    })

    const onSubmit = (data: FormValues) => {
        setIsDisableSubmit(true)

        if (data.comment !== undefined) {
            if (data.comment.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
                setCommentError('No comment Input')
                setIsDisableSubmit(false)
                return
            }

            //Update
            if (id) {
                updateComment({
                    variables: {
                        id: id,
                        content: data.comment,
                    },
                })
                    .then(() => {
                        successNotify('Comment Successfully Updated!')
                        setCommentError('')
                        setIsDisableSubmit(false)
                        reset({ comment: '' })
                        setComment(false)
                        refetchHandler()
                    })
                    .catch(() => {
                        errorNotify('There was an Error!')
                        setIsDisableSubmit(false)
                    })

                return
            }

            //create
            createComment({
                variables: {
                    content: data.comment,
                    commentable_id: commentableId,
                    commentable_type: commentableType,
                },
            })
                .then(() => {
                    successNotify('Comment Successfully Added!')
                    setCommentError('')
                    setIsDisableSubmit(false)
                    reset({ comment: '' })
                    setComment(false)
                    refetchHandler()
                })
                .catch(() => {
                    errorNotify('There was an Error!')
                    setIsDisableSubmit(false)
                })

            return
        }
        setCommentError('No comment Input')
        setIsDisableSubmit(false)
    }

    return (
        <div className="w-full">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full self-center pt-3 pb-2 ">
                    <textarea
                        className={`${
                            commentError.length > 0 && 'error-form-element'
                        } h-32 w-full border-2 border-gray-400 bg-white`}
                        {...register('comment', {})}
                    />
                    {commentError.length > 0 && (
                        <div className="text-sm text-primary-red">{commentError}</div>
                    )}
                </div>
                {!isObjectEmpty(errors) && <FormAlert errors={errors} />}
                <div className="Submit w-full self-center ">
                    <div className="float-right">
                        <Button
                            usage="primary"
                            type="submit"
                            additionalClass={`px-10 ${
                                isDisableSubmit ? 'bg-light-red hover:bg-light-red' : 'bg-white'
                            }`}
                            isDisabled={isDisableSubmit}
                        >
                            {children}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CommentForm
