import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import ClickAction from '@/components/atoms/ClickAction'
import Icons from '@/components/atoms/Icons'
import Author from '@/components/molecules/Author'
import UserActions from '@/components/molecules/UserActions'
import { useState } from 'react'
import { useBoundStore } from '../../../helpers/store'
import CommentForm from '../CommentForm'

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

const Comment = ({
    id,
    text,
    author,
    time,
    action,
    userId,
    slug,
    refetchHandler,
}: Props): JSX.Element => {
    const [comment, setComment] = useState(false)
    dayjs.extend(relativeTime)

    const currentUserId = useBoundStore.getState().user_id

    return (
        <div className="group flex w-full flex-col flex-wrap gap-1">
            <div className="flex w-full items-center">
                <span className="break-all text-xs font-light text-neutral-900">{text}</span>
                {currentUserId === userId && (
                    <div className="invisible group-hover:visible">
                        <UserActions>
                            <ClickAction
                                icon="pencil"
                                title="Edit"
                                onClick={(): void => {
                                    setComment(!comment)
                                }}
                            />
                            {/* <LinkAction href="#" icon="trash" title="Delete" /> */}
                        </UserActions>
                    </div>
                )}
            </div>
            <Author slug={slug} author={author} moment={dayjs(time).fromNow()} />
            {comment && (
                <CommentForm
                    id={id}
                    content={text}
                    refetchHandler={refetchHandler}
                    setComment={setComment}
                >
                    <Icons name="send" size="16" />
                </CommentForm>
            )}
        </div>
    )
}

export default Comment
