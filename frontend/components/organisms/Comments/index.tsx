import { type CommentType } from '@/pages/questions/[slug]'
import AddComment from '../AddComment'
import Comment from '../Comment'

type Props = {
    id: number
    comments: CommentType[]
    commentableType: string
    refetchHandler: () => void
}

const Comments = ({ id, comments, commentableType, refetchHandler }: Props): JSX.Element => {
    return (
        <div className="flex w-full flex-col gap-4">
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    id={comment.id}
                    text={comment.content}
                    author={`${comment.user.first_name ?? ''} ${comment.user.last_name ?? ''}`}
                    time={comment.updated_at}
                    action={
                        comment.updated_at === comment.created_at ? 'added a' : 'updated his/her'
                    }
                    userId={comment.user.id}
                    slug={comment.user.slug}
                    refetchHandler={refetchHandler}
                />
            ))}
            <AddComment
                commentableId={id}
                commentableType={commentableType}
                refetchHandler={refetchHandler}
            />
        </div>
    )
}

export default Comments
