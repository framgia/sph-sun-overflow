import { CustomIcons } from '@/components/atoms/Icons'
import Tags from '@/components/molecules/Tags'
import { parseHTML } from '@/helpers/htmlParsing'
import type { TagType, UserType } from '@/pages/questions/[slug]'
import Link from 'next/link'

const { LockIcon, ThumbUpIcon, UnlockIcon } = CustomIcons

type QuestionGridItemProps = {
    slug: string
    title: string
    content: string
    voteCount: number
    upvotePercentage: number
    answerCount?: number
    viewCount?: number
    isPublic: boolean
    tags: TagType[]
    author: UserType
    createdAt: string
}

const QuestionGridItem = ({
    slug,
    title,
    content,
    voteCount,
    upvotePercentage,
    answerCount,
    viewCount,
    isPublic,
    tags,
    author,
    createdAt,
}: QuestionGridItemProps): JSX.Element => {
    return (
        <div className="flex min-h-[166px] flex-col gap-4 rounded-[5px] border border-neutral-200 p-2 text-neutral-900">
            <div className="flex justify-between">
                <span
                    className="w-fit truncate text-sm font-semibold hover:text-primary-base"
                    title={title}
                >
                    <Link href={`/questions/${slug}`}>{title}</Link>
                </span>

                <div className="flex items-center">{isPublic ? <UnlockIcon /> : <LockIcon />}</div>
            </div>
            <div className="flex flex-1 gap-3">
                <div className="flex flex-1 flex-col gap-2">
                    <p className="break-all text-[12px] leading-4 line-clamp-3">
                        {parseHTML(content)}
                    </p>
                    <div className="mt-auto flex h-5 w-fit gap-[1px] rounded-[4px] border border-primary-base px-1 text-primary-base">
                        <div className="m-auto">
                            <ThumbUpIcon />
                        </div>
                        <span className="text-[10px] font-bold">{upvotePercentage.toFixed()}%</span>
                    </div>
                </div>
                <div className="flex min-w-fit flex-col items-end gap-1 text-xs font-light">
                    <span>
                        {voteCount} {voteCount === 1 ? 'Vote' : 'Votes'}
                    </span>
                    {answerCount !== undefined && (
                        <span>
                            {answerCount} {answerCount === 1 ? 'Answer' : 'Answers'}
                        </span>
                    )}
                    {viewCount !== undefined && (
                        <span>
                            {viewCount} {viewCount === 1 ? 'View' : 'Views'}
                        </span>
                    )}
                </div>
            </div>
            <div className="mt-auto flex flex-col gap-1">
                <Tags values={tags} />
                <div className="flex justify-between text-[10px]">
                    <span>
                        {`Author: `}
                        <Link href={`/users/${String(author.slug)}`} className="text-primary-blue">
                            {author.first_name} {author.last_name}
                        </Link>
                    </span>
                    <time>{new Date(createdAt).toISOString().substring(0, 10)}</time>
                </div>
            </div>
        </div>
    )
}

export default QuestionGridItem
