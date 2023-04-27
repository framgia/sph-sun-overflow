import Icons from '@/components/atoms/Icons'
import errorMessages from '@/helpers/errorMessages'
import CREATE_COMMENT from '@/helpers/graphql/mutations/create_comment'
import UPDATE_COMMENT from '@/helpers/graphql/mutations/update_comment'
import { errorNotify, successNotify } from '@/helpers/toast'
import { isObjectEmpty } from '@/utils'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../atoms/Button'
import FormAlert from '../../molecules/FormAlert'

export type FormValues = {
    comment: string
}

type CommentFormProps = {
    id?: number | null
    commentableId?: number
    commentableType?: string
    refetchHandler: () => void
    children?: string | JSX.Element
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
        reset,
        formState: { errors, isDirty },
    } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: { comment: content },
    })

    const onSubmit = (data: FormValues): void => {
        setIsDisableSubmit(true)

        if (data.comment !== undefined) {
            if (data.comment.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
                setCommentError(errorMessages('comment-empty'))
                setIsDisableSubmit(false)
                return
            }

            if (!isDirty) {
                errorNotify(errorMessages('no-change'))
                setComment(false)
                return
            }

            if (id) {
                updateComment({
                    variables: {
                        id,
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
                        errorNotify(errorMessages())
                        setIsDisableSubmit(false)
                    })

                return
            }

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
                    errorNotify(errorMessages())
                    setIsDisableSubmit(false)
                })

            return
        }
        setCommentError(errorMessages('comment-empty'))
        setIsDisableSubmit(false)
    }

    return (
        <div className="w-full">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative flex w-full items-center">
                    <textarea
                        className={`hide-scrollbar h-[52px] w-full resize-none overflow-y-scroll rounded-smd border border-neutral-disabled bg-white p-2 pr-8 text-xs placeholder:text-xs placeholder:text-neutral-disabled ${
                            commentError.length > 0 ? 'error-form-element' : ''
                        }`}
                        {...register('comment', {})}
                        placeholder="Write a comment..."
                    />
                    <Button usage="send" type="submit" isDisabled={isDisableSubmit}>
                        <Icons name="send" size="16" />
                    </Button>
                </div>
                {commentError.length > 0 && (
                    <div className="px-1 text-xs font-light text-primary-red">{commentError}</div>
                )}
                {!isObjectEmpty(errors) && <FormAlert errors={errors} />}
            </form>
        </div>
    )
}

export default CommentForm
