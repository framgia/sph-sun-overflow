import TOGGLE_BOOKMARK from '@/helpers/graphql/mutations/toggle_bookmark'
import GET_USER from '@/helpers/graphql/queries/get_user'
import { parseHTML } from '@/helpers/htmlParsing'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
import { HiBookmark } from 'react-icons/hi'
import { HiOutlineHandThumbUp } from 'react-icons/hi2'
import 'react-quill/dist/quill.bubble.css'
import Tags from '../Tags'
import { type ITag } from '../TagsInput'

type MITag = ITag & { is_watched_by_user: boolean }
type Metadata = {
    votes: number
    answers: number
    views: number
    author: string
}
type TProps = {
    id: number
    title?: string
    content?: string
    tags?: MITag[]
    date: string
    isBookmarked?: boolean
    metadata?: Metadata
    upvote_percentage: number
    slug: string
    bookmarkType?: 'Question' | 'Answer'
}

const SummaryCard = ({
    id,
    title,
    content,
    tags,
    date,
    isBookmarked = false,
    metadata,
    upvote_percentage,
    slug,
    bookmarkType = undefined,
}: TProps): JSX.Element => {
    const router = useRouter()
    const [toggleBookmark] = useMutation(TOGGLE_BOOKMARK, {
        refetchQueries: [{ query: GET_USER, variables: { slug: router.query.slug } }],
    })

    const handleBookmark = async (): Promise<void> => {
        if (bookmarkType) {
            void toggleBookmark({
                variables: {
                    bookmarkable_id: id,
                    bookmarkable_type: bookmarkType,
                },
            })
                .then((e) => {
                    successNotify('Removed Bookmark Successfully')
                })
                .catch((e) => {
                    errorNotify('Something went wrong. Please try again later.')
                })
        }
    }

    const renderHeader = (title: string | undefined): JSX.Element => {
        const fontStyle = isBookmarked ? '' : 'font-semibold'
        const lineClamp =
            bookmarkType && bookmarkType === 'Answer' ? 'line-clamp-1' : 'line-clamp-2'
        if (title) {
            return (
                <div className={`Title break-all text-sm ${fontStyle} ${lineClamp}`}>{title}</div>
            )
        }
        return <></>
    }
    const renderContent = (content: string | undefined, isBookmarked: boolean): JSX.Element => {
        const lineClamp = isBookmarked ? 'line-clamp-1' : 'line-clamp-3'
        if (content) {
            return (
                <div className="">
                    <p
                        className={`overflow-hidden break-words text-xs leading-[125%] ${lineClamp} `}
                    >
                        {parseHTML(content)}
                    </p>
                </div>
            )
        }
        return <></>
    }
    const renderBookmark = (isBookmarked: boolean): JSX.Element => {
        if (isBookmarked) {
            return (
                <div
                    className=""
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                >
                    <div className="Bookmark flex justify-end" onClick={handleBookmark}>
                        <HiBookmark size={16} className="fill-green-500 hover:fill-red-500" />
                    </div>
                </div>
            )
        }
        return <></>
    }
    const renderTags = (tags: MITag[] | undefined): JSX.Element => {
        if (tags) {
            return (
                <div className="Tags gap-1.5">
                    <Tags values={tags} />
                </div>
            )
        }
        return <></>
    }

    const renderRating = (
        metadata: Metadata | undefined,
        upvote_percentage: number
    ): JSX.Element => {
        if (metadata) {
            return (
                <div className="flex max-w-[50px] flex-row items-center justify-center gap-1 rounded-md  border border-primary-red px-1 text-[10px] font-bold leading-5 text-primary-red">
                    <div className="flex h-full items-center justify-center">
                        <HiOutlineHandThumbUp size={13} />
                    </div>
                    <div>{`${upvote_percentage.toFixed(0) ?? 0}%`}</div>
                </div>
            )
        }
        return <></>
    }

    const renderMetaData = (metadata: Metadata | undefined): JSX.Element => {
        if (metadata) {
            return (
                <div className="Metadata flex flex-col space-y-1 text-[10px] font-light">
                    <span className="whitespace-nowrap">{metadata.votes} votes</span>
                    <span className="whitespace-nowrap">{metadata.answers} answers</span>
                    <span className="whitespace-nowrap">{metadata.views} views</span>
                </div>
            )
        }
        return <></>
    }
    const renderFooter = (metadata: Metadata | undefined, date: string): JSX.Element => {
        if (metadata) {
            return (
                <div className="Footer flex h-5 justify-between">
                    <div className="text-[10px] leading-6">Author: {metadata.author}</div>
                    <div className="text-[10px] leading-6">{date?.split(' ')[0] ?? ''}</div>
                </div>
            )
        }
        return (
            <div className={`Footer flex h-5 justify-between`}>
                <div className="flex h-5 max-w-[50px] flex-row items-center justify-center gap-1  rounded-md border border-primary-red px-1 text-[10px] font-bold leading-5 text-primary-red">
                    <div className="flex h-full items-center justify-center">
                        <HiOutlineHandThumbUp size={13} />
                    </div>
                    <div>{`${upvote_percentage.toFixed(0) ?? 0}%`}</div>
                </div>
                <div className="text-[10px] leading-6">{date?.split(' ')[0] ?? ''}</div>
            </div>
        )
    }

    const handleRedirect = async (e: React.MouseEvent): Promise<void> => {
        e.stopPropagation()
        void router.push(slug ? `/questions/${slug}` : '/404')
    }

    return (
        <div
            className={`flex h-full w-full flex-col  rounded-[5px] border border-primary-gray bg-white p-2 hover:cursor-pointer ${
                isBookmarked ? 'gap-2' : 'gap-4'
            }`}
            onClick={async (e) => {
                await handleRedirect(e)
            }}
        >
            {title && (
                <div className="flex flex-row align-middle">
                    <div className="flex flex-grow">{renderHeader(title)}</div>

                    <div className="">
                        {renderBookmark(isBookmarked)}
                        {renderMetaData(metadata)}
                    </div>
                </div>
            )}

            {renderContent(content, isBookmarked)}
            {renderRating(metadata, upvote_percentage)}
            <div className={`${tags && tags.length > 0 ? 'space-y-1' : ''} mt-auto`}>
                {renderTags(tags)}
                {renderFooter(metadata, date)}
            </div>
        </div>
    )
}
export default SummaryCard
