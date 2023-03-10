import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { useBoundStore } from '../../../helpers/store'
import CommentForm from '../CommentForm'
import { useState } from 'react'

dayjs().format()

type Props = {
    id: number
    text: string
    author: string
    time: string
    action: string
    userId?: number
    slug?: string
    refetchHandler: () => void
}

const Comment = ({ id, text, author, time, action, userId, slug, refetchHandler }: Props) => {
    const [comment, setComment] = useState(false)
    dayjs.extend(relativeTime)

    const currentUserId = useBoundStore.getState().user_id

    return (
        <div className="group flex flex-wrap gap-2 px-2 py-4">
            <span className="mr-4">{text}</span>
            <span>
                <Link href={`/users/${slug}`} className="text-blue-500 hover:text-blue-400">
                    {author}
                </Link>
            </span>
            <span className="text-primary-gray">
                {action} comment {dayjs(time).fromNow()}
            </span>
            {currentUserId === userId && (
                <div className="invisible ml-2 flex gap-2 group-hover:visible">
                    <span>
                        <div
                            onClick={() => setComment(!comment)}
                            className="cursor-pointer text-blue-500 hover:text-blue-400"
                        >
                            Edit
                        </div>
                    </span>
                    <span>
                        <Link href="#" className="text-primary-red hover:text-secondary-red">
                            Delete
                        </Link>
                    </span>
                </div>
            )}
            {comment && (
                <CommentForm
                    id={id}
                    content={text}
                    refetchHandler={refetchHandler}
                    setComment={setComment}
                >
                    Update Comment
                </CommentForm>
            )}
        </div>
    )
}

export default Comment
