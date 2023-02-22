import 'react-quill/dist/quill.snow.css'
import Icons from '@/components/atoms/Icons'
import Avatar from '@/components/molecules/Avatar'
import Bookmark from '@/components/molecules/Bookmark'
import Votes from '@/components/molecules/Votes'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import AcceptAnswer from '@/components/molecules/AcceptAnswer'
import { parseHTML } from '@/helpers/htmlParsing'
import { UserType, CommentType, AnswerEditType } from '../../../pages/questions/[slug]'
import Comment from '@/components/organisms/Comment'
import UPSERT_VOTE from '@/helpers/graphql/mutations/upsert_vote'
import { useMutation } from '@apollo/client'
import { errorNotify } from '../../../helpers/toast'
import CommentForm from '../CommentForm'
import React from 'react'

type AnswerDetailProps = {
    id: number
    onEdit: React.Dispatch<React.SetStateAction<AnswerEditType>>
    content: string
    created_at: string
    vote_count: number
    is_bookmarked: boolean
    is_correct: boolean
    user: UserType
    is_created_by_user: boolean
    user_vote: number
    comments: CommentType[]
    question_id: number
    question_is_from_user: boolean
    answer_is_from_user: boolean
    is_answered: boolean
    refetchHandler: () => void
}

const Answer = ({
    id,
    onEdit,
    content,
    created_at,
    vote_count,
    is_bookmarked,
    is_correct,
    user,
    is_created_by_user,
    comments,
    question_id,
    question_is_from_user,
    answer_is_from_user,
    is_answered,
    user_vote,
    refetchHandler,
}: AnswerDetailProps): JSX.Element => {
    const [upsertVote] = useMutation(UPSERT_VOTE)
    const [comment, setComment] = useState(false)

    const voteHandler = (value: number) => {
        if (answer_is_from_user) {
            errorNotify("You can't vote for your own post!")
            return
        }
        upsertVote({ variables: { value: value, voteable_id: id, voteable_type: 'Answer' } })
        refetchHandler()
    }

    return (
        <Fragment>
            <div className="flex w-full flex-col gap-2 divide-y-2 divide-primary-gray pt-3">
                <div className="flex w-full flex-row">
                    <div className="flex w-14 flex-col items-start gap-2">
                        <Votes
                            count={vote_count ?? 0}
                            user_vote={user_vote}
                            voteHandler={voteHandler}
                        />
                        <Bookmark
                            is_bookmarked={is_bookmarked}
                            bookmarkable_id={id}
                            bookmarkable_type={'Answer'}
                            refetchHandler={refetchHandler}
                        />
                        <AcceptAnswer
                            is_correct={is_correct}
                            answer_id={id}
                            question_id={question_id}
                            is_from_user={question_is_from_user}
                            is_answered={is_answered}
                            refetchHandler={refetchHandler}
                        />
                    </div>
                    <div className="ql-snow flex w-full flex-col justify-between">
                        <div className="ql-editor mt-2 w-full pr-2 text-justify">
                            {parseHTML(content)}
                        </div>
                        <div className="flex w-full flex-row justify-between">
                            <div className="flex justify-start">
                                <div className="mt-2 flex items-start">
                                    {is_created_by_user && (
                                        <Link
                                            href="#answer-form"
                                            className="flex gap-1 decoration-red-500 underline-offset-2 hover:underline"
                                            onClick={() => onEdit({ id, content })}
                                        >
                                            <Icons name={'edit'} />
                                            <span className="text-xs text-primary-red">
                                                Edit Answer
                                            </span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className="flex min-w-fit flex-col">
                                <div className="mb-0.5 ml-1 flex w-full flex-row text-xs">
                                    <div className="flex justify-start gap-1">
                                        <span>answered</span>
                                        <span className="text-gray-500"> {created_at}</span>
                                    </div>
                                </div>
                                <Avatar
                                    first_name={user.first_name}
                                    last_name={user.last_name}
                                    avatar={user.avatar ?? ''}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col divide-y divide-primary-gray">
                        {comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                id={comment.id}
                                text={comment.content}
                                author={`${comment.user.first_name} ${comment.user.last_name}`}
                                time={comment.updated_at}
                                userId={comment.user.id}
                                refetchHandler={refetchHandler}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col gap-3 divide-y divide-primary-gray pt-5">
                        <div
                            className="w-full cursor-pointer px-2 text-blue-500 hover:text-blue-400"
                            onClick={() => setComment(!comment)}
                        >
                            Add comment
                        </div>
                        {comment && (
                            <CommentForm
                                commentableId={id}
                                commentableType="Answer"
                                refetchHandler={refetchHandler}
                                setComment={setComment}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Answer
