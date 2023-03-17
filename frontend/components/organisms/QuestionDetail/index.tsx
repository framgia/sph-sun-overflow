import Icons from '@/components/atoms/Icons'
import Avatar from '@/components/molecules/Avatar'
import Bookmark from '@/components/molecules/Bookmark'
import Tags from '@/components/molecules/Tags'
import Votes from '@/components/molecules/Votes'
import UPSERT_VOTE from '@/helpers/graphql/mutations/upsert_vote'
import { parseHTML } from '@/helpers/htmlParsing'
import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { Fragment } from 'react'
import 'react-quill/dist/quill.snow.css'
import { errorNotify } from '../../../helpers/toast'
import type { UserType } from '../../../pages/questions/[slug]'

type QuestionDetailProps = {
    id: number
    title: string
    content: string
    slug?: string
    created_at: string
    humanized_created_at: string
    views_count: number
    vote_count?: number
    tags: Array<{ id: number; name: string; is_watched_by_user: boolean }>
    user?: UserType
    is_bookmarked: boolean
    is_from_user: boolean
    user_vote: number
    team_slug?: null | string
    refetchHandler: () => void
    is_public: boolean
    team_name?: string
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
}: QuestionDetailProps): JSX.Element => {
    const [upsertVote] = useMutation(UPSERT_VOTE)

    const voteHandler = async (value: number): Promise<void> => {
        if (is_from_user) {
            errorNotify("You can't vote for your own post!")
            return
        }
        await upsertVote({ variables: { value, voteable_id: id, voteable_type: 'Question' } })
        refetchHandler()
    }

    const editLink = team_slug ? `/teams/${team_slug}/question/${slug}/edit` : `${slug}/edit`

    return (
        <Fragment>
            <div className="flex w-full flex-col">
                <div className="relative flex w-full flex-col gap-3">
                    {is_from_user && (
                        <Link href={editLink} className="absolute top-0 right-0 cursor-pointer">
                            <Icons name="square_edit" />
                        </Link>
                    )}
                    <div className="w-full text-2xl font-bold">{title}</div>
                    <div className="flex w-full flex-row gap-3 text-xs font-semibold">
                        <div className="flex gap-1">
                            <span>Asked</span>
                            <span className="text-gray-500">{humanized_created_at}</span>
                        </div>
                        <div className="flex gap-1">
                            <span>Viewed</span>
                            <span className="text-gray-500">
                                {views_count} {views_count > 1 ? 'times' : 'time'}
                            </span>
                        </div>

                        {team_name && (
                            <div className="flex gap-1">
                                <span>From Team </span>
                                <span className="text-gray-500">{team_name}</span>
                            </div>
                        )}

                        <Icons name={is_public ? 'public' : 'private'} />
                    </div>
                    <div className="relative flex w-full flex-row justify-between">
                        <div className="absolute flex w-14 flex-col items-start">
                            <div className="flex flex-col items-center gap-2">
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
                        </div>
                        <div className="flex w-full flex-col justify-between gap-3 pl-14">
                            <div className="ql-snow flex w-full flex-col gap-3">
                                <div className="ql-editor w-full">{parseHTML(content)}</div>
                                <div className="w-full px-4">
                                    <Tags values={tags} />
                                </div>
                            </div>
                            <div className="flex w-full flex-row justify-between">
                                <div className="flex items-end justify-start">
                                    <div className="flex items-center gap-3 px-4">
                                        <Link
                                            href="#"
                                            className="text-xs text-blue-600 hover:underline"
                                        >
                                            Share
                                        </Link>
                                        <Link
                                            href="#"
                                            className="text-xs text-blue-600 hover:underline"
                                        >
                                            Close
                                        </Link>
                                        <Link
                                            href="#"
                                            className="text-xs text-blue-600 hover:underline"
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex min-w-fit flex-row">
                                    <Avatar
                                        first_name={user?.first_name}
                                        last_name={user?.last_name}
                                        avatar={user?.avatar ?? ''}
                                        slug={user?.slug}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default QuestionDetail
