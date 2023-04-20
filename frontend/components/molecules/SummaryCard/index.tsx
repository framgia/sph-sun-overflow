import { stripHtmlTags } from '@/utils'
import { Chip } from '@material-tailwind/react'
import Link from 'next/link'
import { HiBookmark, HiEye } from 'react-icons/hi'
import { HiOutlineHandThumbUp } from 'react-icons/hi2'
import 'react-quill/dist/quill.bubble.css'
import { type ITag } from '../TagsInput'

type MITag = ITag & { is_watched_by_user: boolean }
type Metadata = {
    votes: number
    answers: number
    views: number
    author: string
}
type TProps = {
    title?: string
    content?: string
    tags?: MITag[]
    date: string
    isBookmarked?: boolean
    metadata?: Metadata
    upvote_percentage: number
    slug: string
}

const SummaryCard = ({
    title,
    content,
    tags,
    date,
    isBookmarked = false,
    metadata,
    upvote_percentage,
    slug,
}: TProps): JSX.Element => {
    const renderHeader = (title: string | undefined): JSX.Element => {
        if (title) {
            return <div className="Title text-sm font-semibold line-clamp-3">{title}</div>
        }
        return <></>
    }
    const renderContent = (content: string | undefined): JSX.Element => {
        if (content) {
            return (
                <div className="Content min-h-[32px] text-xs leading-[120%] line-clamp-3">
                    {stripHtmlTags(content)}
                </div>
            )
        }
        return <></>
    }
    const renderBookmark = (isBookmarked: boolean): JSX.Element => {
        if (isBookmarked) {
            return (
                <div className="Bookmark flex justify-end">
                    <HiBookmark size={24} color="red" />
                </div>
            )
        }
        return <></>
    }
    const renderTags = (tags: MITag[] | undefined): JSX.Element => {
        if (tags) {
            return (
                <div className="Tags flex flex-wrap gap-1.5 ">
                    {tags.map((tag, index): JSX.Element => {
                        return (
                            <Chip
                                key={index}
                                value={tag.name}
                                icon={
                                    tag.is_watched_by_user ? (
                                        <div className="relative top-0.5 left-0.5">
                                            <HiEye size={16} />
                                        </div>
                                    ) : undefined
                                }
                                className="bg-primary-200 p-1 pl-2 text-[10px] text-primary-black"
                            />
                        )
                    })}
                </div>
            )
        }
        return <></>
    }
    const renderRating = (metadata: Metadata | undefined, rating: number): JSX.Element => {
        if (metadata) {
            return (
                <div className="Rating flex ">
                    <div className="flex items-center justify-center rounded-md border border-primary-red  px-1 text-[10px] font-bold leading-5 text-primary-red">
                        {rating}
                    </div>
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
    const renderFooter = (
        metadata: Metadata | undefined,
        upvote_percentage: number,
        date: string
    ): JSX.Element => {
        if (metadata) {
            return (
                <div className="Footer flex justify-between ">
                    <div className="text-[10px] leading-6">Author: {metadata.author}</div>
                    <div className="text-[10px] leading-6">{date}</div>
                </div>
            )
        }
        return (
            <div className="Footer flex justify-between ">
                <div className="flex items-center justify-center gap-1 rounded-md border border-primary-red  px-1 text-[10px] font-bold leading-5 text-primary-red">
                    <div className="flex h-full items-center justify-center">
                        <HiOutlineHandThumbUp />
                    </div>
                    <div>{upvote_percentage.toFixed(0) ?? 0}</div>
                </div>
                <div className="text-[10px] leading-6">{date?.split(' ')[0] ?? ''}</div>
            </div>
        )
    }

    return (
        <Link href={slug ? `/questions/${slug}` : '/404'}>
            <div className="flex flex-col gap-2 rounded-md border border-primary-gray bg-white p-2 hover:cursor-pointer ">
                <div className="flex-grow">
                    <div className="flex flex-shrink flex-row space-x-3">
                        <div className="flex-grow">
                            {renderHeader(title)}
                            {renderContent(content)}
                        </div>
                        <div className="">
                            {renderBookmark(isBookmarked)}
                            {renderMetaData(metadata)}
                        </div>
                    </div>
                    {renderRating(metadata, upvote_percentage)}
                    {renderTags(tags)}
                </div>
                {renderFooter(metadata, upvote_percentage, date)}
            </div>
        </Link>
    )
}
export default SummaryCard
