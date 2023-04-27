import { useState } from 'react'
import CommentForm from '../CommentForm'

type Props = {
    id?: number
    commentableId?: number
    commentableType?: string
    refetchHandler: () => void
}

const AddComment = ({ id, commentableId, commentableType, refetchHandler }: Props): JSX.Element => {
    const [comment, setComment] = useState(false)

    return (
        <div className="flex w-full flex-col gap-2 border-t border-neutral-200 py-2">
            <div
                className="w-fit cursor-pointer text-xs font-medium text-primary-blue hover:text-blue-400"
                onClick={() => {
                    setComment(!comment)
                }}
            >
                Add a comment
            </div>
            {comment && (
                <CommentForm
                    id={id}
                    commentableId={commentableId}
                    commentableType={commentableType}
                    refetchHandler={refetchHandler}
                    setComment={setComment}
                />
            )}
        </div>
    )
}

export default AddComment
