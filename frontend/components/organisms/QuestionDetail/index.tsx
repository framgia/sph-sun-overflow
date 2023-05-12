import ClickAction from '@/components/atoms/ClickAction'
import LinkAction from '@/components/atoms/LinkAction'
import Bookmark from '@/components/molecules/Bookmark'
import Privacy from '@/components/molecules/Privacy'
import QuestionAuthor from '@/components/molecules/QuestionAuthor'
import Tags from '@/components/molecules/Tags'
import UserActions from '@/components/molecules/UserActions'
import Votes from '@/components/molecules/Votes'
import ContentCard from '@/components/templates/ContentCard'
import copyLink from '@/helpers/copyLink'
import UPSERT_VOTE from '@/helpers/graphql/mutations/upsert_vote'
import { parseHTML } from '@/helpers/htmlParsing'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { errorNotify } from '../../../helpers/toast'
import type { CommentType, TagType, UserType } from '../../../pages/questions/[slug]'
import Comments from '../Comments'
import DeleteQuestion from '../DeleteQuestion'

type QuestionDetailProps = {
    id: number
    title: string
    content: string
    slug?: string
    created_at: string
    humanized_created_at: string
    views_count: number
    vote_count?: number
    tags: TagType[]
    user?: UserType
    is_bookmarked: boolean
    is_from_user: boolean
    user_vote: number
    team_slug?: null | string
    refetchHandler: () => void
    is_public: boolean
    team_name?: string
    comments: CommentType[]
}

const QuestionDetail = ({
    id,
    title,
    content,
    slug = '',
    created_at,
    humanized_created_at,
    views_count,
    vote_count,
    tags,
    user,
    is_bookmarked,
    is_from_user,
    user_vote,
    team_slug,
    refetchHandler,
    is_public,
    team_name,
    comments,
}: QuestionDetailProps): JSX.Element => {
    const [upsertVote] = useMutation(UPSERT_VOTE)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const router = useRouter()

    const voteHandler = async (value: number): Promise<void> => {
        if (is_from_user) {
            errorNotify("You can't vote for your own post!")
            return
        }
        await upsertVote({ variables: { value, voteable_id: id, voteable_type: 'Question' } })
        refetchHandler()
    }

    const closeDelete = (): void => {
        setConfirmDelete(false)
    }

    const editLink = team_slug ? `/teams/${team_slug}/question/${slug}/edit` : `${slug}/edit`
    const shareLink = location.href
    const redirectLink =
        router.asPath.split('/')[1] === 'teams'
            ? `/teams/${String(router.query.slug)}`
            : `/questions`

    return (
        <ContentCard header="Question" closeRedirect={redirectLink}>
            <div className="flex w-full flex-row gap-4 p-4">
                <div className="flex flex-col items-center gap-1">
                    <Votes
                        count={vote_count ?? 0}
                        user_vote={user_vote}
                        voteHandler={voteHandler}
                    />
                    <Bookmark
                        is_bookmarked={is_bookmarked}
                        bookmarkable_id={id}
                        bookmarkable_type={'Question'}
                        refetchHandler={refetchHandler}
                    />
                </div>
                <div className="flex grow flex-col gap-4">
                    <div className="ql-snow flex w-full flex-col gap-2">
                        <div className="flex w-full flex-row justify-between gap-2">
                            <span className="text-sm font-semibold text-neutral-900">{title}</span>
                            <div className="flex flex-row items-center gap-2">
                                {is_from_user && (
                                    <Fragment>
                                        <UserActions>
                                            <ClickAction
                                                icon="share"
                                                title="Share"
                                                onClick={async (): Promise<void> => {
                                                    await copyLink(shareLink)
                                                }}
                                            />
                                            <LinkAction
                                                href={editLink}
                                                icon="pencil"
                                                title="Edit"
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
                                        <DeleteQuestion
                                            id={id}
                                            isOpen={confirmDelete}
                                            closeDelete={closeDelete}
                                            redirectLink={redirectLink}
                                        />
                                    </Fragment>
                                )}
                                <Privacy name={is_public ? 'Public' : 'Private'} />
                            </div>
                        </div>
                        <div className="ql-editor remove-padding break-words text-xs text-neutral-900">
                            {parseHTML(content)}
                        </div>
                        <div className="w-full">
                            <Tags values={tags} />
                        </div>
                        <div>
                            <QuestionAuthor
                                slug={user?.slug}
                                author={`${user?.first_name ?? ''} ${user?.last_name ?? ''}`}
                                moment={humanized_created_at}
                                views_count={views_count}
                            />
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-4 pl-9">
                        <Comments
                            id={id}
                            comments={comments}
                            commentableType="Question"
                            refetchHandler={refetchHandler}
                        />
                    </div>
                </div>
            </div>
        </ContentCard>
    )
}

export default QuestionDetail
