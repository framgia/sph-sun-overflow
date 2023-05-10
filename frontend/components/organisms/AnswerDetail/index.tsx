import ClickAction from '@/components/atoms/ClickAction'
import AcceptAnswer from '@/components/molecules/AcceptAnswer'
import AnswerAuthor from '@/components/molecules/AnswerAuthor'
import Bookmark from '@/components/molecules/Bookmark'
import UserActions from '@/components/molecules/UserActions'
import Votes from '@/components/molecules/Votes'
import copyLink from '@/helpers/copyLink'
import UPSERT_VOTE from '@/helpers/graphql/mutations/upsert_vote'
import { parseHTML } from '@/helpers/htmlParsing'
import { useMutation } from '@apollo/client'
import { Fragment, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { errorNotify } from '../../../helpers/toast'
import type { CommentType, UserType } from '../../../pages/questions/[slug]'
import AnswerForm from '../AnswerForm'
import Comments from '../Comments'
import DeleteAnswer from '../DeleteAnswer'

type AnswerDetailProps = {
    id: number
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

const AnswerDetail = ({
    id,
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
    const [isEdit, setIsEdit] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const voteHandler = async (value: number): Promise<void> => {
        if (answer_is_from_user) {
            errorNotify("You can't vote for your own post!")
            return
        }
        await upsertVote({ variables: { value, voteable_id: id, voteable_type: 'Answer' } })
        refetchHandler()
    }

    const closeDelete = (): void => {
        setConfirmDelete(false)
    }

    const shareLink = `${location.href.split('#')[0]}#answer-${id}`

    return (
        <div id={`answer-${id}`} className={`flex w-full flex-row gap-4 p-4`}>
            <div id="left-vote" className="flex flex-col items-center gap-1">
                <Votes count={vote_count ?? 0} user_vote={user_vote} voteHandler={voteHandler} />
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
            <div className={`flex grow flex-col gap-4`}>
                <div className={`${!isEdit ? 'ql-snow' : ''}} flex w-full flex-col gap-1`}>
                    <div className="flex w-full flex-row justify-between gap-2">
                        <AnswerAuthor
                            slug={user?.slug}
                            author={`${user?.first_name ?? ''} ${user?.last_name ?? ''}`}
                            moment={created_at}
                        />
                        <div className="flex flex-row items-center gap-2">
                            {answer_is_from_user && (
                                <Fragment>
                                    <UserActions>
                                        <ClickAction
                                            icon="share"
                                            title="Share"
                                            onClick={async (): Promise<void> => {
                                                await copyLink(shareLink)
                                            }}
                                        />
                                        <ClickAction
                                            icon="pencil"
                                            title="Edit"
                                            onClick={() => {
                                                setIsEdit(!isEdit)
                                            }}
                                        />
                                        <ClickAction
                                            icon="trash"
                                            title="Delete"
                                            hoverColor="group-hover/action:text-primary-base"
                                            onClick={() => {
                                                setConfirmDelete(true)
                                            }}
                                        />
                                    </UserActions>
                                    <DeleteAnswer
                                        id={id}
                                        isOpen={confirmDelete}
                                        closeDelete={closeDelete}
                                        refetchHandler={refetchHandler}
                                    />
                                </Fragment>
                            )}
                        </div>
                    </div>
                    <div
                        className={`${
                            !isEdit ? 'ql-editor' : ''
                        } remove-padding break-all text-xs text-neutral-900`}
                    >
                        {isEdit ? (
                            <AnswerForm
                                question_id={question_id}
                                id={id}
                                onEdit={setIsEdit}
                                content={content}
                                refetchHandler={refetchHandler}
                            />
                        ) : (
                            parseHTML(content)
                        )}
                    </div>
                </div>
                <div className="flex w-full flex-col gap-4 pl-9">
                    <Comments
                        id={id}
                        comments={comments}
                        commentableType="Answer"
                        refetchHandler={refetchHandler}
                    />
                </div>
            </div>
        </div>
    )
}

export default AnswerDetail
